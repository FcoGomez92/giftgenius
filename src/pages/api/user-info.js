import { getUserTwitterInfo } from '@/controllers/twitterControllers'
import { errorMessages } from '@/helpers/errors'


export default async function handler(req, res) {
  const { userHandler } = req.query

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

  return res.status(200).json({
    ok:true,
    data:userInfo
  })
}
