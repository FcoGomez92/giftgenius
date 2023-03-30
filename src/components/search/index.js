import styles from '@/components/search/Search.module.css'
import { useRef } from 'react'

export default function Search() {
  const inputRef = useRef()

  async function handleSubmit(event) {
    event.preventDefault()
    const url = `api/hello?userHandler=${inputRef.current.value}`

    const res = await fetch(url)
    const { ok, message, data } = await res.json()

    if (!ok) {
      console.log(message)
    }
    console.log(data)
    return
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor=''>Twitter @:</label>
      <input ref={inputRef} type='text' className={styles.input} />
      <button>Enviar</button>
    </form>
  )
}
