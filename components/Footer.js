import { HeartFilled, HomeFilled, ShopFilled, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MdAccountCircle } from 'react-icons/md'
import { connect } from 'react-redux'
import HomeIcon from '../components/svgComponents/HomeIcon'
import ShopIcon from '../components/svgComponents/ShopIcon'

import UserAltIcon from '../components/svgComponents/UserAltIcon'

import call from "../public/footer/Call.svg"
import location from '../public/footer/Location.svg';
import profile from '../public/footer/Profile.svg'
import home from '../public/footer/Home.svg'
import cart from '../public/footer/Cart.svg'
import contact from '../public/footer/Contact.svg'
import absoluteUrl from 'next-absolute-url'
import { getSocialProfile } from '../services/apiServices'
import ContactUs from './ContactUs'
import LoginModal from './LoginModal/LoginModal'
import { customerDetails, getShopWidgets, getStoreDetails, getStoreDisplaySettings, getStoreSettings } from '../actions'
import { ConfigProvider } from 'antd'
import MenuIcon from './svgComponents/MenuIcon'

function Footer({ getShopWidgets, stateStoreSettings, storeDetails, stateSocialProfile, customerDetails, storeSettings,
  dispatchStoreDisplaySettings, getStoreDetails
}) {

  const router = useRouter()

  const [active, setActive] = useState('/')

  const otherLinksName = ['refund-policy', 'privacy-policy']
  const otherLinksTitle = ['Return & Refunds', 'Privacy Policy']
  const [otherLinks, setOtherLinks] = useState([])
  const [socialLinks, setSocialLinks] = useState([])
  const [contactUsVisible, setContactUsVisible] = useState(false)
  const [visible, setVisible] = useState(false)



  const showModal = () => {
    setVisible(true);
  }

  const { origin } = absoluteUrl()
  // console.log("origin",origin)
  // const origin="https://dev.robinhoodstyle.com"
  var count = origin.match(new RegExp("\\.", 'g'));
  console.log("count", count);

  // console.log("originalDomain", extractDomain(origin))
  if (count) {
    if (count.length >= 2) {
      const firstDotIndex = origin.indexOf('.');
      console.log("firstDotIndex", firstDotIndex)
      var domain = origin.substring(firstDotIndex + 1);
    }
    else {
      var domain = origin
    }
  }
  else {
    var domain = origin
  }

  console.log("originalDomain", domain)
  useEffect(() => {
    var myDynamicManifest = {
      "name": `${storeDetails?.store_name}`,
      "short_name": `${storeDetails?.store_name}`,
      "description": `${storeDetails?.store_name}`,
      "display": "standalone",
      "scope": `${origin}`,
      "start_url": `${origin}`,
      "background_color": "#ffffff",
      "theme_color": "#ffffff",
      "icons": [{
        "src": `${storeDetails?.logo_img_url}`,
        "sizes": "512x512",
        "type": "image/png"
      }]
    }
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(blob);
    document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);

  }, [storeDetails])

  useEffect(() => {
    let other = []
    for (let i = 0; i < 2; i++) {
      const name = otherLinksTitle[i];
      // const url = `${domain}/${otherLinksName[i]}`
      if (domain.includes('http')) {
        // var url = `${domain}/${otherLinksName[i]}`
        var url = `https://www.goplinto.com/${otherLinksName[i]}`
      }
      else {
        var url = `https://www.goplinto.com/${otherLinksName[i]}`
      }
      const nameUrl = { name, url }
      other.push(nameUrl)
    }
    setOtherLinks(other)
  }, [])

  useEffect(() => {
    storeSettings()
    dispatchStoreDisplaySettings(storeDetails?.store_id)
    getStoreDetails(storeDetails?.store_id)
    getShopWidgets(storeDetails?.store_id)
  }, [])

  ConfigProvider.config({
    theme: {
      primaryColor: stateStoreSettings.data ? stateStoreSettings.data.secondary_color : 'black',
    },
  });





  return (
    <div>
      {/* footer for mobile */}
      <div className='lg:hidden md:hidden flex items-center justify-between pt-6  px-4 bg-white w-full h-16 bottom-0 fixed border-y-2 border-slate-400' style={{ zIndex: 10000 }}>

        <div className={`flex flex-col items-center`} onClick={() => { router.push('/') }}>
          <div>

            <HomeIcon secondaryColor={router.pathname == '/' ? stateStoreSettings.data ? stateStoreSettings.data.primary_color : '#B4B4B4' : '#B4B4B4'} />
          </div>

          {/* // style={router.pathname == '/' ? */}
          {/* //   { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : 'black'}`, transition: 'all .5 linear' } : { transition: 'all .5s linear' }} /> */}

          <p className={`text-[12px] font-montMedium`} style={router.pathname == '/' ? { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : '#B4B4B4'}` } : { color: '#B4B4B4' }} >Home</p>
        </div>

        <div className={`flex flex-col items-center`}
          onClick={() => { router.push('/shop') }}
        >
          {/* <ShopFilled className='text-2xl' */}
          <ShopIcon secondaryColor={router.pathname == '/shop' || router.pathname?.includes('/product') ? stateStoreSettings.data ? stateStoreSettings.data.primary_color : 'B4B4B4' : '#B4B4B4'} />



          {/* style={router.pathname == '/shop' || router.pathname?.includes('/product') ?
              { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : 'black'}`, transition: 'all .5 ease-in' } : { transition: 'all .5s ease-out' }} /> */}
          <p className={`text-[12px] font-montMedium`} style={router.pathname?.includes('/shop') || router.pathname?.includes('/product') ? { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : '#B4B4B4'}` } : { color: '#B4B4B4' }} >Shop</p>
        </div>
        <div className='flex flex-col items-center'
          // onClick={() => {
          //   customerDetails.data?.customer_id ? router.push('/account/wishlist') : router.push('/account/user/login')
          // }}
          onClick={() => { router.push('/menu') }}

        >
          {/* <LoginModal visible={visible} setVisible={setVisible} showModal={showModal} /> */}
          {/* <HeartFilled className='text-[#212B36] text-2xl' style={router.pathname == '/account/wishlist' ?
            { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : '#B4B4B4'}`, transition: 'all .5 linear' } : { transition: 'all .5s linear' }} /> */}
          {/* <p className='text-[16px] ' style={router.pathname?.includes('/account/wishlist') ? { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : '#B4B4B4'}` } : { color: '#B4B4B4' }}>Wishlist</p> */}

          <MenuIcon secondaryColor={router.pathname == '/menu' ? stateStoreSettings.data ? stateStoreSettings.data.primary_color : '#B4B4B4' : '#B4B4B4'} />

          {/* <MdAccountCircle className='text-[#212B36] text-3xl' style={router.pathname?.includes('/account/user') ?
  { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : 'black'}`, transition: 'all .5 linear' } : { transition: 'all .5s linear' }} /> */}
          <p className='text-[12px] font-montMedium ' style={router.pathname == '/menu' ? { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : '#B4B4B4'}` } : { color: '#B4B4B4' }}>Menu</p>

        </div>
        <div className={`flex flex-col items-center`} onClick={() => { router.push('/account/user') }}>

          <UserAltIcon secondaryColor={router.pathname?.includes('/account/user') ? stateStoreSettings.data ? stateStoreSettings.data.primary_color : '#B4B4B4' : '#B4B4B4'} />

          {/* <MdAccountCircle className='text-[#212B36] text-3xl' style={router.pathname?.includes('/account/user') ?
            { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : 'black'}`, transition: 'all .5 linear' } : { transition: 'all .5s linear' }} /> */}
          <p className='text-[12px] font-montMedium ' style={router.pathname?.includes('/account/user') ? { color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : '#B4B4B4'}` } : { color: '#B4B4B4' }}>User</p>
        </div>


      </div>

      {/* footer for web */}

      <div className='hidden lg:block md:block  w-full' style={{ backgroundColor: stateStoreSettings.data ? stateStoreSettings.data.primary_color : 'black' }}>

        <div className='px-20 py-2 ' style={{
          backgroundColor: 'rgba(0,0,0,0.7)'
          //  `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : 'black'}`
          , bottom: '0px !important'
        }}>
          <div className='grid grid-cols-6 py-12 '>
            {/* store info */}
            <div className='col-span-1 text-white'>
              <div>
                <img className="h-48 w-48 max-h-48" src={storeDetails?.logo_img_url} />
              </div>
              <p className='mt-2 font-montSemiBold'>{storeDetails?.store_name}</p>
              <p className='mt-2 font-montSemiBold text-white'>© 2022. All rights reserved</p>
              {/* <p className='mt-2 font-montSemiBold'>{storeDetails?.store_desc}</p> */}
              <div className='space-y-2'>
                {/* {storeDetails?.city? <div>
                  <span><img className='inline mr-2' src={location.src} alt="" />{storeDetails?.city}, {storeDetails?.country}</span>
                </div>:''}
                <div>
                  <span><img className='inline mr-2' src={call.src} alt="" />+{storeDetails?.primary_phone}</span>
                </div> */}
              </div>

            </div>
            {/* links */}
            <div className='col-span-5 ml-12'>
              <div className={`grid ${stateSocialProfile?.length ? "grid-cols-5" : "grid-cols-4"}`}>
                <div>
                  <h3 className='text-xl font-montMedium text-white'>Menu</h3>
                  <p className='text-gray-200 font-montRegular text-base cursor-pointer' onClick={() => router.push('/')}>Home</p>
                  <p className='text-gray-200 font-montRegular text-base cursor-pointer' onClick={() => router.push('/shop')}>Shop</p>
                  {/* <p className='text-gray-200 font-montRegular text-base cursor-pointer'>About Us</p> */}
                  <p onClick={() => setContactUsVisible(true)} className='text-gray-200 font-montRegular text-base cursor-pointer'>Contact Us</p>
                </div>
                <div>
                  <h3 className='text-xl font-montMedium text-white'>Account</h3>

                  <p className='text-gray-200 font-montRegular text-base cursor-pointer'
                    onClick={() => customerDetails.data?.customer_id ? router.push("/account/profile") : showModal()}
                  >Profile</p>


                  <p className='text-gray-200 font-montRegular text-base cursor-pointer'
                    onClick={() => customerDetails.data?.customer_id ? router.push("/account/wishlist") : showModal()}
                  >Wishlist</p>

                  <p className='text-gray-200 font-montRegular text-base cursor-pointer'
                    onClick={() => customerDetails.data?.customer_id ? router.push("/account/myOrders") : showModal()}
                  >My Orders</p>


                  <p className='text-gray-200 font-montRegular text-base cursor-pointer'
                    onClick={() => customerDetails.data?.customer_id ? router.push("/account/savedPlaces") : showModal()}
                  >Saved Address</p>


                  <p className='text-gray-200 font-montRegular text-base cursor-pointer'
                    onClick={() => customerDetails.data?.customer_id ? router.push("/account/wallet") : showModal()}
                  >Wallet</p>
                </div>




                {
                  stateSocialProfile?.length ? <div>
                    <h3 className='text-xl font-montMedium text-white'>Social</h3>
                    {
                      stateSocialProfile.map(function (item, idx) {
                        if (item.social_account_link) {
                          return <p key={idx} onClick={() => window.open(`https://${item.social_account_link}`)} className='text-gray-200 font-montRegular text-base cursor-pointer capitalize'>{(item.social_account_name).toLowerCase()}</p>
                        }
                      })
                    }
                    {/* <p onClick={()=>window.location.href = "https://web.facebook.com/goplinto?_rdc=1&_rdr"} className='text-gray-200 font-montRegular text-base cursor-pointer'>Facebook</p>
                                <p onClick={()=>window.location.href = "https://www.instagram.com/goplinto/"} className='text-gray-200 font-montRegular text-base cursor-pointer'>Instagram</p>
                                <p className='text-gray-200 font-montRegular text-base cursor-pointer'>Twitter</p>
                                <p className='text-gray-200 font-montRegular text-base cursor-pointer'>Youtube</p> */}
                  </div> : ""
                }
                <div>
                  <h3 className='text-xl font-montMedium text-white'>Other Links</h3>
                  {
                    otherLinks.map((item, idx) => <p onClick={() => window.open(`${item.url}`)} key={idx} className='text-gray-200 font-montRegular text-base cursor-pointer'>{item.name}</p>)
                  }
                  {/* <p className='text-gray-200 font-montRegular text-base cursor-pointer'>Return & Refunds</p>
                                <p className='text-gray-200 font-montRegular text-base cursor-pointer'>Term & Conditions</p>
                                <p className='text-gray-200 font-montRegular text-base cursor-pointer'>Privacy Policy</p> */}
                </div>

                <div className='w-52'>
                  <h3 className='text-xl font-montMedium text-white'>Contact Us</h3>

                  {storeDetails?.city ? <div className='flex items-start mb-2'>
                    <img className='inline mr-2 py-2 text-white -mt-2' src={location.src} alt="" />
                    <div className='text-white'>{storeDetails?.address},{storeDetails?.city}, {storeDetails?.state}, {storeDetails?.country}</div>
                  </div> : ''}
                  <div>
                    <span className='text-white'><img className='inline mr-2 text-white' src={call.src} alt="" />+91 {storeDetails?.primary_phone}</span>
                  </div>
                  {/* {
                    otherLinks.map((item, idx) => <p onClick={() => window.location.href = `${item.url}`} key={idx} className='text-gray-200 font-montRegular text-base cursor-pointer'>{item.name}</p>)
                  } */}
                  {/* <p className='text-gray-200 font-montRegular text-base cursor-pointer'>Return & Refunds</p>
                                <p className='text-gray-200 font-montRegular text-base cursor-pointer'>Term & Conditions</p>
                                <p className='text-gray-200 font-montRegular text-base cursor-pointer'>Privacy Policy</p> */}
                </div>



              </div>

            </div>
          </div>
          {/* contact us */}
          <>
            <ContactUs contactUsVisible={contactUsVisible} setContactUsVisible={setContactUsVisible} />
          </>

          <div className='w-full mt-9 flex items-center justify-center '>
            <img src={'https://devo2.goplinto.com/profileLogos/goplinto_logo.png'} className='h-6  object-contain' />
          </div>

          <div className='px-2 md:px-6 w-full flex flex-row items-start justify-between mt-9  md:pb-0 space-x-1 md:space-x-4 '>
            <div className={`w-full basis-2/12 flex-grow flex flex-col flex-auto justify-center space-y-3 items-center`} >
              <p className='inline-block w-full text-[#FFFFFFB3] text-center  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Cloud Hosted on'}</p>
              <div className={`w-full flex flex-row justify-between items-start max-h-8 `}>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/aws dark mode copy@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/Azure web services copy@2x.png'} className='w-full h-full object-contain' />
                </div>
              </div>
            </div>
            <div className={`w-full basis-3/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3 divide-x-2`} >
              <p className='w-full text-center text-[#FFFFFFB3]  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Secured Payments with'}</p>
              <div className={`w-full flex flex-row justify-between items-start px-2 border-[#212B3680]`}>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/pci-compliant.f0aea468@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/ssl-final@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/https (1)@2x.png'} className='w-full h-full object-contain' />
                </div>
              </div>
            </div>
            <div className={`w-full basis-7/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3 divide-x-2`} >
              <p className='w-full text-center text-[#FFFFFFB3] mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Payments accepted via'}</p>
              <div className={`w-full flex flex-row justify-between items-baseline px-2 border-[#212B3680]`}>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/amex@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/master card@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/visa copy@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/upi@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/paytm@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/pe copy 2@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/google pay copy@2x.png'} className='w-full h-full object-contain' />
                </div>
                <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                  <img src={'/static/images/& more.svg'} className='w-full h-full object-contain' />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <LoginModal visible={visible} setVisible={setVisible} showModal={showModal} />

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    stateStoreSettings: state.storeSettingsReducer,
    storeDetails: state.storeDetailsReducer.data,
    stateSocialProfile: state.socialProfileReducer.data,
    customerDetails: state.customerDetailsReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {

    storeSettings: (storeId) => dispatch(getStoreSettings(storeId)),
    getStoreDetails: (storeId) => dispatch(getStoreDetails(storeId)),
    dispatchStoreDisplaySettings: (storeId) => dispatch(getStoreDisplaySettings(storeId)),
    getShopWidgets: (storeId) => dispatch(getShopWidgets(storeId)),


  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Footer)