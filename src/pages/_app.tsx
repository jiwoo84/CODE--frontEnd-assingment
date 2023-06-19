import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>곽지우 | FrontEnd</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
