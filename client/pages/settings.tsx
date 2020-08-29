import { NextSeo } from 'next-seo'
import Header from '@components/Header'

export default () => (
  <>
    <NextSeo title="Settings" noindex={true} />
    <Header />
    <h1>Settings</h1>
  </>
)
