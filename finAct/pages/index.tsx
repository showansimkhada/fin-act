import type { NextPage } from 'next'
import Head from 'next/head'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import SignIn from './components/signIn'

export const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Work & Finance</title>
        <link rel="icon" href="/public/logo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <header style={{height: '100vh', background: 'blueviolet'}}>
        <SignIn/>
      </header>
    </>
  )
}

export default IndexPage
