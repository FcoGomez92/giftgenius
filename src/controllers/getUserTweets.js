import { encode } from 'gpt-3-encoder'
import { getTweetsPaginated } from '@/lib/twitter'
import { clean } from '@/helpers/functions'

const MAX_OPENAI_TOKENS = 3800
const TWEETS_PER_PAGE = 100

const cleanTweetsList = (tweets) => tweets.map((t) => clean(t.text))

export async function getUserTweets(
  userTwitterId,
  excludeArray,
  initialOpenAITokens
) {
  let cumulativeOpenAITokens = initialOpenAITokens
  let userTweets = []
  let hasNextPage = true
  let nextToken
  const params = {
    max_results: TWEETS_PER_PAGE
  }
  if (excludeArray) {
    params.exclude = excludeArray
  }
  while (hasNextPage) {
    const resp = await getTweetsPaginated(userTwitterId, params, nextToken)

    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      if (resp.data) {
        const cleanList = cleanTweetsList(resp.data)
        for (let i = 0; i < cleanList.length; i++) {
          const encodedTweetLength = encode(cleanList[i]).length

          if (cumulativeOpenAITokens + encodedTweetLength < MAX_OPENAI_TOKENS) {
            userTweets.push(cleanList[i])
            cumulativeOpenAITokens += encodedTweetLength
          } else {
            hasNextPage = false
            break
          }
        }
      }
      if (hasNextPage && resp.meta.next_token) {
        nextToken = resp.meta.next_token
      }
    } else {
      hasNextPage = false
      return { data: resp?.data ?? null, status: resp?.status ?? 404 }
    }
  }
  console.log({ cumulativeOpenAITokens }, { initialOpenAITokens })
  return { data: userTweets }
}
