import { useState } from 'react'
import { getTargetInfo, getGifts } from '@/services/getData'

export function useGifts() {
  const [target, setTarget] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const searchTargetInfo = async (userHandler) => {
    setLoading(true)
    const { ok, message, data } = await getTargetInfo(userHandler)

    if (!ok) {
      setError(message)
      setLoading(false)
      return
    }
    setTarget({ userInfo: data, gifts: '' })
    setLoading(false)
    return
  }

  const searchGifts = async () => {
    setLoading(true)
    if (!target?.userInfo) {
      setError("User doesn't exist")
      setLoading(false)
      return
    }

    const { ok, message, data } = await getGifts({ userInfo: target.userInfo })

    if (!ok) {
      setError(message)
      setLoading(false)
      return
    }
    setTarget((prev) => ({ ...prev, gifts: data }))
    setLoading(false)
    return
  }

  const resetTarget = () => {
    setTarget(null)
  }

  return { target, loading, error, searchTargetInfo, searchGifts, resetTarget }
}
