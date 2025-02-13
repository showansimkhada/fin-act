import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Providers } from '@/lib/providers'
import "@/styles/globals.css"

// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faEdit)

export default function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <Providers>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Providers>
  )
}
