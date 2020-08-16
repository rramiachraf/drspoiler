import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'
import '../styles/style.css'
import '../styles/nprogress.css'
import configureStore from '../store/configureStore'

const store = configureStore()

NProgress.configure({
  showSpinner: false
})

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// MyApp.getInitialProps = async appContext => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)
//   return { ...appProps }
// }

export default MyApp
