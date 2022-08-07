import '../styles/globals.css'
// import 'antd/dist/antd.css';
import 'antd/dist/antd.variable.min.css'
import { Provider } from 'react-redux'
import store, { persistor } from '../config/store'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router';
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from 'react';
import GoogleAnalytics from '../components/GoogleAnalytics/GoogleAnalytics'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function MyApp({ Component, pageProps }) {
  
  // You can remove all consoles at once

  // console.log = function() {}

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 })
  const isTabletOrMobile = useMediaQuery({ query: ' (max-width: 992px)' })
  const router = useRouter();
  const path = router.asPath;
  // const isException = path.includes('itemDetails') || path.includes('cart') || path.includes('checkout')
  // if (isDesktopOrLaptop) {


  useEffect(() => {

    if (path != '/' && router.isReady && !path.includes('[')) {
      router.push(router.asPath)
    }

  }, [router.isReady])




  return (
  <>
    <Provider store={store}>
      <GoogleAnalytics></GoogleAnalytics>
      <PersistGate persistor={persistor}>
        {router.pathname != '/review-mobile' && router.pathname != '/review-mobile/final' && router.pathname != '/menu' && router.pathname != '/account/user/login' && !router.pathname.includes('/success-mobile') && <Header />}
        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  </>
  )

}

export default MyApp
