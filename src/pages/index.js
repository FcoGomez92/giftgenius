import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>GiftGenius</title>
        <meta name="description" content="GiftGenius web app, the perfect gifts for your loved one. Don't to know again what to gift to your father, to your mother, to your couple or to your friend? GiftGenius studies their social media profile with AI for you, and based on it recommends you the best gifts. Save time and look like a genius." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <div className={styles.thirteen}>
            <h1 className={inter.className}>GG</h1>
          </div>
        </div>
      </main>
    </>
  )
}
