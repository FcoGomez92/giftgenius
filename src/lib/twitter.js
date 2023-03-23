import { Client } from 'twitter-api-sdk'

const { TWITTER_TOKEN } = process.env
const twitterClient = new Client(TWITTER_TOKEN)

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

export async function getTweetsPaginated(userTwitterId, params, nextToken) {
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
