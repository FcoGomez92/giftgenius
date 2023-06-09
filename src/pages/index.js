import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Michroma, Inter } from 'next/font/google'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Search from '@/components/search'
import Footer from '@/components/footer'

const michroma = Michroma({ subsets: ['latin'], weight: '400' })
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>
          GiftGenius || Ai-powered app to find the perfect gift for your loved
          ones based on their twitter profile
        </title>
        <meta
          name='description'
          content="GiftGenius web app, the perfect gifts for your loved one. Don't you know again what to gift to your father, mother, partner or friend? GiftGenius uses AI to analyze their twitter profile for you, and suggest the ideal gifts based on their interests. Save time and look like a genius."
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={`${inter.className} ${styles.container}`}>
        <Navbar />
        <div className={styles.bkg} />
        <main className={styles.main}>
          <section id='hero' className={`${styles.section} ${styles.hero}`}>
            <h1 className={`${michroma.className} ${styles.title}`}>
              Never give a bad gift again. <br />
              Finding the perfect one,
              <br />
              now, it&apos;s like Magic ✨
            </h1>
            <p className={styles.desc}>
              Our AI-powered engine analyze your loved ones twitter profile and suggest
              the ideal gifts based on their interests. <br />
              Save time and impress them with your gift-giving skills!
            </p>
            <Link href='#search'>
              <p className={styles.cta}>Try it now!</p>
            </Link>
          </section>
          <section id='search' className={`${styles.section} ${styles.app}`}>
            <Search />
          </section>
        </main>
        <Footer font={inter} />
      </div>
    </>
  )
}
