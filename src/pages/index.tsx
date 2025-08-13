import type { NextPage } from 'next'

import SignIn from '@/components/sign-in'
import Head from 'next/head'

export const IndexPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Fin Act</title>
				<meta charSet='UTF-8'/>
				<meta name='description' content='WebApp buil with react redux typescript'/>
				<meta name='author' content='Showan'/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			</Head>
			<SignIn/>
		</>
	)
}

export default IndexPage