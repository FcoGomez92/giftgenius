import styles from '@/components/search/Search.module.css'
import { useRef } from 'react'
import { useGifts } from '@/hooks/useGifts'

export default function Search() {
  const inputRef = useRef()
  const { target, loading, error, searchTargetInfo, searchGifts, resetTarget } =
    useGifts()

  const handleSubmit = (e) => {
    e.preventDefault()
    !target?.userInfo ? searchTargetInfo(inputRef.current.value) : searchGifts
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {!target?.userInfo ? (
          <label>
            Twitter Handle:
            <div className={styles.inputContainer}>
              <span className={styles.handle}>@</span>
              <input ref={inputRef} type='text' className={styles.input} />
            </div>
          </label>
        ) : (
          <div>
            <img src={target.userInfo.profileImage} alt='' />
            <h5>{target.userInfo.name}</h5>
            <span>{target.userInfo.username}</span>
            <p>{target.userInfo.bio}</p>
            <button onClick={resetTarget}>❌</button>
            <button onClick={searchGifts}>✅</button>
          </div>
        )}
        {/* <button>Enviar</button> */}
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {target?.gifts && (
        <div className={styles.result}>
          <p>{target?.gifts}</p>
        </div>
      )}
    </main>
  )
}
