import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Providers } from '@/lib/providers'

import { SpeedInsights } from "@vercel/speed-insights/next"

export default function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <Providers>
      <SessionProvider session={pageProps.session}>
        <SpeedInsights/>
        <Component {...pageProps} />
      </SessionProvider>
    </Providers>
  )
}
