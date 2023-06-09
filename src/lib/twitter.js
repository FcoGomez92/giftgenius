import { Client } from 'twitter-api-sdk'

const { TWITTER_TOKEN } = process.env

export const twitterClient = new Client(TWITTER_TOKEN)
