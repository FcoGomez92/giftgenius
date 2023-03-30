import styles from '@/components/navbar/Navbar.module.css'

export default function Navbar() {
  return (
    <nav>
      <h1 className={styles.logo}>
        Gift<span className={styles.genius}>Genius</span>
      </h1>
    </nav>
  )
}
