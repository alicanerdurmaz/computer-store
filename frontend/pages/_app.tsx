import '../styles/app.css'
import type {AppProps} from 'next/app'
import SiteLayout from '../src/components/layout/SiteLayout'

export default function App({Component, pageProps}: AppProps) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  )
}
