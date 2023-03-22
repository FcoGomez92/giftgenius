import { Client } from 'twitter-api-sdk'

const { TWITTER_TOKEN } = process.env
const twitterClient = new Client(TWITTER_TOKEN)

const MAX_RESULTS = 20

const cleanTweets = (tweets) =>
  tweets.map(
    (t) =>
      `"${t.text.replace(/[\n"]/g, (match) => (match === '\n' ? ' ' : "'"))}".`
  )

export async function getUserTwitterInfo(userTwitterHandle) {
  try {
    const usernameLookup = await twitterClient.users.findUserByUsername(
      userTwitterHandle,
      {
        'user.fields': ['description', 'profile_image_url'],
        expansions: ['pinned_tweet_id']
      }
    )

    if (usernameLookup?.data) {
      const {
        name,
        description: bio,
        id,
        profile_image_url: profileImage,
        username
      } = usernameLookup.data

      const pinnedTweet = usernameLookup?.includes?.tweets[0]?.text

      return {
        data: {
          id,
          name,
          username,
          bio,
          profileImage,
          pinnedTweet
        }
      }
    } else {
      return { data: null, status: 404 }
    }
  } catch (error) {
    console.log(error)
    return { data: null, status: error.status ?? 400 }
  }
}

async function getTweetsPaginated(userTwitterId, params, nextToken) {
  if (nextToken) {
    params.pagination_token = nextToken
  }
  try {
    return await twitterClient.tweets.usersIdTweets(userTwitterId, params)
  } catch (error) {
    console.log(error)
    return { data: null, status: error.status ?? 400 }
  }
}

export async function getUserTweets(userTwitterId, excludeArray) {
  let userTweets = []
  let pagesCount = 2
  let nextToken
  const params = {
    max_results: MAX_RESULTS
  }
  if (excludeArray) {
    params.exclude = excludeArray
  }

  while (pagesCount > 0) {
    const resp = await getTweetsPaginated(userTwitterId, params, nextToken)

    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      if (resp.data) {
        userTweets.push.apply(userTweets, resp.data)
        pagesCount--
      }
      if (pagesCount > 0 && resp.meta.next_token) {
        nextToken = resp.meta.next_token
      }
    } else {
      pagesCount = 0
      return { data: resp?.data ?? null, status: resp?.status ?? 404 }
    }
  }

  return { data: cleanTweets(userTweets) }
}
