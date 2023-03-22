import { Configuration, OpenAIApi } from 'openai'

const { OPENAI_API_KEY } = process.env

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function talkToChatGPT(prompt) {
  try {
    return await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
  } catch (error) {
    console.log(error)
    return { data: error.response.data, status: error.response.status }
  }
}
