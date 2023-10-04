import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/layout.module.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import { Login } from './login'

export const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trends</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login/>
    </div>
  )
}

export default IndexPage
