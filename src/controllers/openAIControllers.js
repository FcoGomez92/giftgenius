import { openai } from "@/lib/openai"

const { GPT_4 } = process.env

const model = GPT_4 ? 'gpt-4' : 'gpt-3.5-turbo'

export async function talkToChatGPT(systemMessage, prompt) {
  try {
    return await openai.createChatCompletion({
      model,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ]
    })
  } catch (error) {
    console.log(error)
    return { data: error.response.data, status: error.response.status }
  }
}