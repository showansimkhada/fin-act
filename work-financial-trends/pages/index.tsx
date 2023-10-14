import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '@/styles/layout.module.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import SignIn from './components/signIn'

export const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trends</title>
        <link rel="icon" href="/public/logo.ico" />
      </Head>
      <header className={styles.header}>
        <img src="/logo.svg" className={styles.logo} alt="logo" />
        <SignIn/>
      </header>
    </div>
  )
}

export default IndexPage
