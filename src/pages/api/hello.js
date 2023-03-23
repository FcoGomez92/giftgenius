import { getUserTwitterInfo } from '@/lib/twitter'
import { getUserTweets } from '@/controllers/getUserTweets'
import { talkToChatGPT } from '@/lib/openai'
import { encode } from 'gpt-3-encoder'
import { i18n } from '@/mocks/i18n'
import { clean } from '@/helpers/functions'
import { errorMessages } from '@/helpers/errors'

const createPrompt = (lang, userData) =>
  `${i18n.prefix[lang]}${userData.join(', ')} ${i18n.suffix[lang]}`

const lang = 'es'

export default async function handler(req, res) {
  const { userHandler } = req.query
  const excludeArray = ['replies', 'retweets']
  const userDataToChatGPT = []

  if (!userHandler)
    return res
      .status(400)
      .json({ ok: false, message: errorMessages.app.emptyParam })

  // GET USER TWITTER INFO
  const userInfoResponse = await getUserTwitterInfo(userHandler)
  const userInfo = userInfoResponse?.data

  // ERROR HANDLER GETTING USER TWITTER INFO
  if (!userInfo) {
    const status = userInfoResponse?.status
    const message =
      status === 404
        ? errorMessages.twitter.user404
        : errorMessages.twitter[status] ?? errorMessages.generic

    return res.status(status).json({
      ok: false,
      message
    })
  }

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
  const prompt = createPrompt(lang, userDataToChatGPT)
  const chatGPTResponse = await talkToChatGPT(prompt)

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

  // SEND THE CHATGPT RESPONSE TO THE APP
  console.log({ usage: chatGPTResponse.data.usage })
  const gifts = chatGPTResponse?.data?.choices[0]?.message?.content

  return res.status(200).json({
    ok: true,
    data: gifts
  })
}
