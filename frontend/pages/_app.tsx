import Head from 'next/head'
import '../styles/app.css'
import type { AppProps } from 'next/app'
import SiteLayout from '../src/components/Layout/SiteLayout'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ReactQueryConfigProvider } from 'react-query'
import { UserContextProvider } from 'src/context/UserContext/UserContext'
import { useEffect } from 'react'

const queryConfig = { queries: { refetchOnWindowFocus: false } }

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <UserContextProvider>
      <SiteLayout>
        <Head>
          <title>Computer Store</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"></link>
        </Head>
        <ReactQueryConfigProvider config={queryConfig}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </ReactQueryConfigProvider>
      </SiteLayout>
    </UserContextProvider>
  )
}
