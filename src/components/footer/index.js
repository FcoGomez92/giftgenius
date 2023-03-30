import styles from '@/components/footer/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.container}>
      <p>
        Made with ♥︎ by{' '}
        <a
          href='https://twitter.com/fcogomez92_'
          target={'_blank'}
          rel='noopener noreferrer'
        >
          @FcoGomez92_
        </a>
      </p>
    </footer>
  )
}
