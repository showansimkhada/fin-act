import type { NextPage } from 'next'

import SignIn from '@/components/signIn'
import Head from 'next/head'

export const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>FinAct</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <SignIn/>
    </>
  )
}

export default IndexPage
