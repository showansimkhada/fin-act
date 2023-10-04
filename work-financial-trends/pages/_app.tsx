import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

export default function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    // <Provider store={makeStore}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    // </Provider>
  )
}
