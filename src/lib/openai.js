import { Configuration, OpenAIApi } from 'openai'

const { OPENAI_API_KEY } = process.env

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
})

export const openai = new OpenAIApi(configuration)

