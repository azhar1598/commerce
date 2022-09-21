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

  console.log = function() {}

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

  // Warn if overriding existing method
  if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
  // attach the .equals method to Array's prototype to call it on any array
  Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
      return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
      return false;


    for (var i = 0; i < this.length; i++) {
      // Check if we have nested arrays
      if (!array.includes(this[i]))
        return false



      // if (this[i] instanceof Array && array[i] instanceof Array) {
      //   // recurse into the nested arrays
      //   if (!this[i].equals(array[i]))
      //     return false;
      // }
      // else if (this[i] != array[i]) {
      //   // Warning - two different object instances will never be equal: {x:20} != {x:20}
      //   return false;
      // }
    }
    return true;
  }
  // Hide method from for-in loops
  Object.defineProperty(Array.prototype, "equals", { enumerable: false });





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
