import { getUserTweets } from '@/controllers/twitterControllers'
import { talkToChatGPT } from '@/controllers/openAIControllers'
import { encode } from 'gpt-3-encoder'
import { clean } from '@/helpers/functions'
import { errorMessages } from '@/helpers/errors'
import { i18n } from '@/mocks/i18n'

const lang = 'es'

const createPrompt = (userData) => userData.join(', ')

export default async function handler(req, res) {
  const { userInfo } = JSON.parse(req.body)
  const excludeArray = ['replies', 'retweets']
  const userDataToChatGPT = []

  // ERROR HANDLER GETTING USER TWITTER INFO
  if (!userInfo)
    return res.status(404).json({
      ok: false,
      message: errorMessages.twitter.user404
    })

  if (userInfo.bio) userDataToChatGPT.push(clean(userInfo.bio, 'Bio: '))
  if (userInfo.pinnedTweet)
    userDataToChatGPT.push(clean(userInfo.pinnedTweet, 'Pinned tweet: '))

  const initialOpenAITokens =
    userDataToChatGPT.length > 0
      ? encode(userDataToChatGPT.join(', ')).length
      : 0

  // GET TWEETS
  const userTweetsResponse = await getUserTweets(
    userInfo.id,
    excludeArray,
    initialOpenAITokens
  )
  const userTweets = userTweetsResponse?.data

  // ERROR HANDLER GETTING TWEETS
  if (!userTweets) {
    const status = userTweetsResponse?.status
    const message =
      status === 404
        ? errorMessages.twitter.tweets404
        : errorMessages.twitter[status] ?? errorMessages.generic

    return res.status(status).json({
      ok: false,
      message
    })
  }
  userDataToChatGPT.push(...userTweets.reverse())

  // GET LIST OF GIFTS FROM CHATGPT
  const systemMessage = i18n.prefix[lang]
  const prompt = createPrompt(userDataToChatGPT)
  const chatGPTResponse = await talkToChatGPT(systemMessage, prompt)

  // EXAMPLE OF ERROR RESPONSE DUE TO A LONG PROMPT
  // response:{
  // ...,
  //   data: {
  //    error: {
  //     message: "This model's maximum context length is 4097 tokens. However, your messages resulted in 5137 tokens. Please reduce the length of the messages.",
  //     type: 'invalid_request_error',
  //     param: 'messages',
  //     code: 'context_length_exceeded'
  //   }
  //  }
  // }

  // ERROR HANDLER GETTING LIST OF GIFTS
  if (chatGPTResponse.status !== 200) {
    const status = chatGPTResponse?.status ?? 400
    const message = errorMessages.openAI[status] ?? errorMessages.generic
    if (chatGPTResponse?.data?.error?.code === 'context_length_exceeded') {
      return res
        .status(400)
        .json({ ok: false, message: errorMessages.openAI.prompt })
    }

    return res.status(status).json({
      ok: false,
      message
    })
  }
  console.log({
    chatGPTResponse: chatGPTResponse?.data?.choices[0]?.message?.content
  })
  // SEND THE CHATGPT RESPONSE TO THE APP
  console.log({ usage: chatGPTResponse.data.usage })
  const gifts = chatGPTResponse?.data?.choices[0]?.message?.content

  return res.status(200).json({
    ok: true,
    data: gifts
  })
}
