import Head from 'next/head'
import '../styles/app.css'
import type { AppProps } from 'next/app'
import SiteLayout from '../src/components/Layout/SiteLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SiteLayout>
      <Head>
        <title>Computer Store</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"></link>
      </Head>
      <Component {...pageProps} />
    </SiteLayout>
  )
}
