import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '@/styles/layout.module.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import { Login } from './components/login'

export const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trends</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <img src="/logo.svg" className={styles.logo} alt="logo" />
        <Login/>
      </header>
    </div>
  )
}

export default IndexPage
