import type { NextPage } from 'next'
import Head from 'next/head'

// import styles from '@/styles/layout.module.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import SignIn from './components/signIn'

export const IndexPage: NextPage = () => {
  return (
    <>
      <div className="container">
        <Head>
          <title>Trends</title>
          <link rel="icon" href="/public/logo.ico" />
        </Head>
        <header className='container'>
          <SignIn/>
        </header>
    </div>
    </>
  )
}

export default IndexPage
