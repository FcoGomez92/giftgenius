// import { userResponse, giftResponse } from '@/mocks/giftsResponse'

export const getTargetInfo = async (userHandler) => {
  const url = `api/user-info?userHandler=${userHandler}`

  try {
    // use mocked result to improve the design
    // const { ok, message, data } = userResponse

    const res = await fetch(url)
    const { ok, message, data } = await res.json()

    if (!ok) {
      throw new Error(message)
    }
    return { ok: true, data }
  } catch (e) {
    return { ok: false, message: e.message }
  }
}

export const getGifts = async ({ userInfo }) => {
  const url = `api/gifts`

  try {
    // use mocked result to improve the design
    // const { ok, message, data } = giftResponse

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ userInfo })
    })

    const { ok, message, data } = await res.json()

    if (!ok) {
      throw new Error(message)
    }
    return { ok: true, data }
  } catch (e) {
    return { ok: false, message: e.message }
  }
}
