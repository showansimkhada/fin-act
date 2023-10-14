import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Providers } from '@/lib/providers'

export default function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <Providers>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Providers>
  )
}
