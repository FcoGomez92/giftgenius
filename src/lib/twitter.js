import { Client } from 'twitter-api-sdk'

const { TWITTER_TOKEN } = process.env
const twitterClient = new Client(TWITTER_TOKEN)

const MAX_RESULTS = 20

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
        id,
        name,
        username,
        bio,
        profileImage,
        pinnedTweet
      }
    }
  } catch (error) {
    console.log(error)
  }
}

function getTweetsPaginated(userTwitterId, params, nextToken) {
  if (nextToken) {
    params.pagination_token = nextToken
  }
  try {
    return twitterClient.tweets.usersIdTweets(userTwitterId, params)
  } catch (err) {
    throw new Error(`Request failed: ${err}`)
  }
}

export async function getUserTweets(userTwitterId, excludeArray) {
  const params = {
    max_results: MAX_RESULTS
    // exclude: ["replies", "retweets"],
  }
  if (excludeArray) {
    params.exclude = excludeArray
  }
  try {
    return await getTweetsPaginated(userTwitterId, params, null)
  } catch (error) {
    console.log(error)
  }
}
