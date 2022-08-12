

import Head from 'next/head'
// import Image from 'next/image'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getBannerImagesAction, getFeaturedProductsAction, getNewArrivalsAction, getSocialProfileAction, getStoreDetails, getStoreDisplaySettings } from '../actions'
import CustomCarousel from '../components/CustomCarousel'
import styles from '../styles/Home.module.css'
import { getBannerImages, getFeaturedProducts, getNewArrivals } from '../services/apiServices'
import { Carousel, Spin } from 'antd'
import ECarousel, { consts } from 'react-elastic-carousel'
import { CiCircleOutlined, LeftCircleFilled, LeftOutlined, LeftSquareFilled, MinusOutlined, RightCircleFilled, RightCircleOutlined, RightOutlined, RightSquareFilled, UpSquareOutlined } from '@ant-design/icons'
import { Skeleton } from 'antd';
import { FaCircle } from 'react-icons/fa'
import { useRouter } from "next/router";
import { ConfigProvider } from 'antd';
import PageWrapper from '../components/PageWrapper/PageWrapper'
import Categories from '../components/Categories'
import EasyToOrder from '../components/svgComponents/EasyToOrder'
import CompletedSteps from '../components/svgComponents/CompletedSteps'
import InNoTime from '../components/svgComponents/InNoTime'




function Home({ getStoreDetails, storeSettingsReducer, dispatchSocialProfile, storeDetails, dispatchBannerImages, dispatchNewArrivals, dispatchFeaturedProducts, dispatchStoreDisplaySettings }) {

  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [newArrivals, setNewArrivals] = useState([])
  const [featured, setFeatured] = useState([])
  const router = useRouter()

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  useEffect(() => {
    getData()
  }, [storeDetails?.store_id])



  const getData = async () => {

    if (storeDetails?.store_id) {
      const payload = {
        storeId: storeDetails?.store_id
      }
      console.log('loadding acv', loading)

      dispatchBannerImages('storeId', setBanners, setLoading, loading)
      dispatchNewArrivals('storeId', setNewArrivals)
      dispatchFeaturedProducts('storeId', setFeatured)
      dispatchSocialProfile({ payload })
    }
  }




  const recommended = [
    '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png', '/images/Image 6.png',
  ]

  useEffect(() => {

    dispatchStoreDisplaySettings(storeDetails?.store_id)
  }, [])

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? <LeftOutlined style={{ fontSize: '14px', fontWeight: 800 }} /> : <RightOutlined style={{ fontSize: '14px', fontWeight: 800 }} />
    return (
      <button onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    )
  }

  const myArrowMobile = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? '' : ''
    return (
      <button onClick={onClick} disabled={isEdge} style={{ display: 'none' }}>
        {pointer}
      </button>
    )
  }

  const myArrowBanner = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? <LeftOutlined  style={{position:'absolute',marginLeft:'40px',fontSize:'16px',fontWeight:500}} className='bg-black bg-opacity-40 backdrop-blur-xl rounded drop-shadow-lg p-4 px-2'/> : <RightOutlined style={{position:'absolute' ,marginLeft:'-60px',fontSize:'16px',fontWeight:500}} className='bg-black bg-opacity-40 backdrop-blur-lg rounded drop-shadow-2xl p-4 px-2'/>
    return (
      <button onClick={onClick} disabled={isEdge} style={{ display: '',position:'',zIndex:20000 }}>
        {pointer}
      </button>
    )
  }

  const props = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  ConfigProvider.config({
    theme: {
      primaryColor: storeSettingsReducer.data ? storeSettingsReducer.data.secondary_color : 'black',
    },
  });



  return (
    <div className=''>
      {/* <Head>
        {storeSettingsReducer.widgets ?
          storeSettingsReducer.widgets?.GOOGLE_MERCHANT_CENTER ?
          storeSettingsReducer.widgets?.GOOGLE_MERCHANT_CENTER?.record_status == "ACTIVE" ?
              <meta name="google-site-verification" content={storeSettingsReducer.widgets && storeSettingsReducer.widgets?.GOOGLE_MERCHANT_CENTER?.integration_attributes?.verificationCode} />
              : ""
            : ""
          : ""
        }
        <title>{storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
      </Head> */}
      !{loading ?
        <div className='p-4 mt-12'>


          {/* <div className="border border-blue-100 shadow rounded-md lg:h-[75vh]  lg:mb-16   md:max-w-[24vw] lg:mt-12  p-3 min-w-[95vw]" > */}
            <div className="animate-pulse mt-8 flex space-x-4 ">
              <div className="flex-1 space-y-6 py-5">
                <div className="rounded bg-slate-300 lg:h-56 lg:h-[70vh]"></div>
        
           
              </div>
            </div>
          {/* </div> */}

          <Skeleton active paragraph={{ rows: 7 }} title='hello' />
          <Skeleton active paragraph={{ rows: 7 }} title='hello' />
          <Skeleton active paragraph={{ rows: 7 }} title='hello' />

        </div>
        :
        <>
          {/* Web View Banner */}
          <div className='hidden lg:block'>

            <Categories />

            <div className=''>
              <div className='mt-36  w-full '>


                <ECarousel itemPosition={consts.START} autoPlaySpeed={1500} enableAutoPlay itemsToShow={1} itemPadding={[0, 0]} renderArrow={myArrowBanner} renderPagination={({ pages, activePage, onClick }) => {
                  return (
                    <div direction="row" style={{ display: 'flex' }}>
                      {pages.map(page => {
                        const isActivePage = activePage === page
                        return (
                          <>
                          <MinusOutlined
                            key={page}
                            onClick={() => onClick(page)}
                            active={isActivePage}
                            style={page === activePage ? { color: `${storeSettingsReducer.data ? storeSettingsReducer.data.secondary_color : 'black'}`, fontSize: '29px', margin: '6px', cursor: 'pointer' } : { border: 'none', fontSize: '29px', color: 'gray', margin: '6px', cursor: 'pointer', }}
                          />
                          </>
                        )
                      })}
                    </div>
                  )
                }}>
                  {banners.map((a, index) =>
                    <div maxWidth="100%" className='flex flex-col ' key={index}>
                      <img src={a.banner_img_url ? a.banner_img_url : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className='w-[100vw] h-[75vh] bg-white' />

                    </div>
                  )}
                </ECarousel>

              </div>
              <div className='absolute -mt-40 w-full' >
                <button className=' align-center ml-[43vw] p-3 text-lg rounded font-montMedium border-[#959595] text-[#FFFFFF] g-white bg-opacity-40 backdrop-blur-lg rounded drop-shadow-lg px-12' onClick={() => { router.push('/shop') }}
                >Explore Now </button>
              </div>
            </div>
          </div>

          <div className='hidden lg:flex justify-around  mt-8 '>
            <div className='absolute pl-32 pr-32' >

              <img src="/Path 1.svg" />
            </div>

            <div className=''>
              <CompletedSteps />
              <p className='font-montSemiBold text-sm text-[#0000007F]  text-center'>Easy to Order</p>
            </div>
            <div className=''>
              <InNoTime />
              <p className='font-montSemiBold text-sm text-[#0000007F]  text-center'>Faster Delivery</p>
            </div>
            <div className=''>
              <EasyToOrder />
              <p className='font-montSemiBold text-sm text-[#0000007F]  text-center'>Best Quality</p>

            </div>
          </div>


          {/* Web View New Arrivals and Featured Products */}


          {newArrivals.length != 0 ?
            <div className='hidden lg:flex md:flex flex-col mt-9 lg:pr-28 lg:pl-28 md:pr-28 md:pl-28 mb-8'>
              <p className='font-montBold text-[#000000BF] text-lg ml-2'>Special menus</p>
              <div className='bg-white p-2 flex items-center justify-between w-full '>
                <ECarousel itemPosition={consts.START} itemsToShow={4} itemPadding={[0, 0]} renderArrow={myArrow} renderPagination={({ pages, activePage, onClick }) => {
                  return (
                    <div direction="row ">
                      {pages.map(page => {
                        const isActivePage = activePage === page
                        return (
                          null
                        )
                      })}
                    </div>
                  )
                }}>

                  {newArrivals.map((a, index) => {
                    return (<>
                      {a.item_status == 'AVAILABLE' ?
                        <div maxWidth="45%" className='flex flex-col ml-2  p-2 rounded border border-blue-100 shadow-xl bg-white max-h-[55vh]' key={index}>

                          <img src={a.primary_img ? a.primary_img : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className=' h-72 lg:h-[35vh] md:72 md:h-[25vh] bg-white cursor-pointer' onClick={() => { router.push(`/product/${a.item_id}`) }} />
                          {/* <p className='font-montSemiBold mt-2 text-[16px] lg:text-sm  item-name item-description text-[#000000BF] h-4 ' onClick={() => { router.push(`/product/${a.item_id}`) }} >{a.item_name}<span></span></p>

                          <p className='font-montSemiBold mt-2 text-[16px] lg:text-lg  item-name item-description text-[#000000BF]' style={{color: `${storeSettingsReducer.data ? storeSettingsReducer.data.secondary_color : 'black'}`}}  onClick={() => { router.push(`/product/${a.item_id}`) }} >Starting At Just <br/>₹ {a.sale_price}<span></span></p> */}

                        </div> :
                        <div maxWidth="45%" className='flex flex-col ml-2 p-2 rounded border border-blue-100 shadow-xl bg-white max-h-[55vh]' key={index}>
                          <p className='absolute font-montSemiBold lg:mt-56 text-red-600 lg:text-xl md:text-lg md:px-4 md:py-2 bg-white lg:px-6 lg:py-2 bottom-0'>OUT OF STOCK</p>
                          <img src={a.primary_img ? a.primary_img : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className='h-72 lg:h-[35vh] md:72 md:h-[25vh] bg-white cursor-pointer' />
                          {/* <p className='font-montSemiBold mt-2 text-[16px] lg:text-sm  item-name item-description text-[#000000BF] h-4' onClick={() => { router.push(`/product/${a.item_id}`) }} >{a.item_name}<span></span></p>

                          <p className='font-montSemiBold mt-2 text-[16px] lg:text-lg  item-name item-description text-[#000000BF]' style={{color: `${storeSettingsReducer.data ? storeSettingsReducer.data.secondary_color : 'black'}`}} onClick={() => { router.push(`/product/${a.item_id}`) }} >Starting At Just <br/>₹ {a.sale_price}<span></span></p>
           */}
                        </div>
                      }
                    </>
                    )
                  }
                  )}
                </ECarousel>


              </div>
            </div>
            : ''}



          {featured.length != 0 ?
            <div className='hidden lg:flex md:flex flex-col mt-9 lg:pr-28 lg:pl-28 md:pr-28 md:pl-28 mb-8'>
              <p className='font-montBold text-[#000000BF] text-lg ml-2'>Special Menus</p>
              <div className='bg-white p-2 flex items-center justify-between w-full '>
                <ECarousel itemPosition={consts.START} itemsToShow={4} itemPadding={[0, 0]} renderArrow={myArrow} renderPagination={({ pages, activePage, onClick }) => {
                  return (
                    <div direction="row ">
                      {pages.map(page => {
                        const isActivePage = activePage === page
                        return (
                          null
                        )
                      })}
                    </div>
                  )
                }}>

                  {featured.map((a, index) => {
                    return (<>
                      {a.item_status == 'AVAILABLE' ?
                        <div maxWidth="45%" className='flex flex-col ml-2  p-2 rounded border border-blue-100 shadow bg-white max-h-[55vh]' key={index}>

                          <img src={a.primary_img ? a.primary_img : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className=' h-72 lg:h-[35vh] md:72 md:h-[25vh] bg-white cursor-pointer' onClick={() => { router.push(`/product/${a.item_id}`) }} />
                          {/* <p className='font-montSemiBold mt-2 text-[16px] lg:text-sm  item-name item-description text-[#000000BF] h-4 ' onClick={() => { router.push(`/product/${a.item_id}`) }} >{a.item_name}<span></span></p>

                          <p className='font-montSemiBold mt-2 text-[16px] lg:text-lg  item-name item-description text-[#000000BF]' style={{color: `${storeSettingsReducer.data ? storeSettingsReducer.data.secondary_color : 'black'}`}}  onClick={() => { router.push(`/product/${a.item_id}`) }} >Starting At Just <br/>₹ {a.sale_price}<span></span></p> */}

                        </div> :
                        <div maxWidth="45%" className='flex flex-col ml-2 p-2 rounded border border-blue-100 shadow bg-white max-h-[55vh]' key={index}>
                          <p className='absolute font-montSemiBold lg:mt-56 text-red-600 lg:text-xl md:text-lg md:px-4 md:py-2 bg-white lg:px-6 lg:py-2 bottom-0'>OUT OF STOCK</p>
                          <img src={a.primary_img ? a.primary_img : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className='h-72 lg:h-[35vh] md:72 md:h-[25vh] bg-white cursor-pointer' />
                          {/* <p className='font-montSemiBold mt-2 text-[16px] lg:text-sm  item-name item-description text-[#000000BF] h-4' onClick={() => { router.push(`/product/${a.item_id}`) }} >{a.item_name}<span></span></p>

                          <p className='font-montSemiBold mt-2 text-[16px] lg:text-lg  item-name item-description text-[#000000BF]' style={{color: `${storeSettingsReducer.data ? storeSettingsReducer.data.secondary_color : 'black'}`}} onClick={() => { router.push(`/product/${a.item_id}`) }} >Starting At Just <br/>₹ {a.sale_price}<span></span></p>
           */}
                        </div>
                      }
                    </>
                    )
                  }
                  )}
                </ECarousel>


              </div>
            </div>
            : ''}
          {/* End OF Web View */}




          {/* Mobile View Banner */}
          <div className='lg:hidden md:hidden h-72  ' >
            <div className=' h-72 w-[100vw]  mt-[60px]'>
              
              <ECarousel itemPosition={consts.START} enableAutoPlay autoPlaySpeed={1500} itemsToShow={1} itemPadding={[0, 0]} showArrows={false} renderPagination={({ pages, activePage, onClick }) => {
                return (
                  <div direction="row" style={{ display: 'flex', }}>
                    {pages.map(page => {
                      const isActivePage = activePage === page
                      return (
                        // <FaCircle
                        //   key={page}
                        //   onClick={() => onClick(page)}
                        //   active={isActivePage}
                        //   style={page === activePage ? { color: `${storeSettingsReducer.data ? storeSettingsReducer.data.navbar_color : 'black'}`, padding: '3px', fontSize: '15px', margin: '5px 5px', cursor: 'pointer', border: `2px solid ${storeSettingsReducer.data ? storeSettingsReducer.data.navbar_color : 'black'}`, borderRadius: '100%' } : { border: 'none', fontSize: '5px', color: `${storeSettingsReducer.data ? storeSettingsReducer.data.navbar_color : 'black'}`, margin: '11px 5px', cursor: 'pointer', }}
                        // />


                        <MinusOutlined
                        key={page}
                        onClick={() => onClick(page)}
                        active={isActivePage}
                        style={page === activePage ? { color: `${storeSettingsReducer.data ? storeSettingsReducer.data.secondary_color : 'black'}`, fontSize: '29px', margin: '6px', cursor: 'pointer' } : { border: 'none', fontSize: '29px', color: 'gray', margin: '6px', cursor: 'pointer', }}
                      />

                        )
                    })}
                  </div>
                )
              }}>
                {banners.map((a, index) =>
                  <div className='flex flex-col bg-red-700 w-[150vw]' key={index}>
                    <img src={a.banner_img_url ? a.banner_img_url : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className='w-[120vw] h-52 bg-white' />

                  </div>
                )}
              </ECarousel>
            </div>
            {/* <div className=' h-[32px] w-[70vw] -mt-12 ml-[11px]' style={{
              backgroundColor: `${storeSettingsReducer.data ? storeSettingsReducer.data.primary_color : 'black'}`
            }}></div> */}
          </div>




          <p className='font-montSemiBold text-[16px] ml-2 -mt-3 lg:hidden md:hidden'>New Arrivals</p>
          <div className='bg-[#F1F1F1] p-2 flex items-center justify-between w-full lg:hidden md:hidden'>
            <ECarousel itemPosition={consts.START} itemsToShow={2} itemPadding={[0, 0]} renderArrow={myArrowMobile} renderPagination={({ pages, activePage, onClick }) => {
              return (
                <div direction="row">
                  {pages.map(page => {
                    const isActivePage = activePage === page
                    return (
                      null
                    )
                  })}
                </div>
              )
            }}>
              {newArrivals.map((a, index) => {
                return (<>
                  {a.item_status == 'AVAILABLE' ?
                    <div maxWidth="10%" className='flex flex-col ml-2' key={index}>
                      <img src={a.primary_img ? a.primary_img : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className='w-96 h-60 md:72 md:h-[55vh] bg-white' onClick={() => { router.push(`/product/${a.item_id}`) }} />

                    </div>
                    :
                    <div maxWidth="10%" className='flex flex-col ml-2' key={index}>
                      <p className='absolute font-montSemiBold lg:mt-56 text-red-600 lg:text-xl md:text-lg md:px-4 md:py-2 bg-white lg:px-6 lg:py-2 bottom-0'>OUT OF STOCK</p>
                      <img src={a.primary_img ? a.primary_img : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className='w-96 h-60 md:72 md:h-[55vh] bg-white' />

                    </div>
                  }
                </>
                )
              }
              )}
            </ECarousel>
          </div>

          <div className='lg:hidden md:hidden pb-24'>
            <p className='font-montSemiBold text-[16px] text- ml-2 mt-3 '>Featured Products</p>
            <div className='bg-[#F1F1F1] p-2 flex items-center justify-between w-full' >
              <ECarousel itemPosition={consts.START} itemsToShow={2} itemPadding={[0, 0]} renderArrow={myArrowMobile} renderPagination={({ pages, activePage, onClick }) => {
                return (
                  <div direction="row">
                    {pages.map(page => {
                      const isActivePage = activePage === page
                      return (
                        null
                      )
                    })}
                  </div>
                )
              }}>
                {featured.map((a, index) => {
                  return (<>
                    {a.item_status == 'AVAILABLE' ?
                      <div maxWidth="10%" className='flex flex-col ml-2' key={index}>
                        <img src={a.primary_img ? a.primary_img : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className='w-96 h-60 md:72 md:h-[55vh] bg-white' onClick={() => { router.push(`/product/${a.item_id}`) }} />

                      </div>
                      :
                      <div maxWidth="10%" className='flex flex-col ml-2' key={index}>
                        <p className='absolute font-montSemiBold lg:mt-56 text-red-600 lg:text-xl md:text-lg md:px-4 md:py-2 bg-white lg:px-6 lg:py-2 bottom-0'>OUT OF STOCK</p>
                        <img src={a.primary_img ? a.primary_img : 'https://wabisabiproject.com/wp-content/uploads/woocommerce-placeholder.png'} className='w-96 h-60 md:72 md:h-[55vh] bg-white' />

                      </div>
                    }
                  </>
                  )
                }
                )}
              </ECarousel>
            </div>
          </div>




          {/* <div className='flex flex-col mt-9 lg:mt-3 md:mt-3 lg:pr-28 lg:pl-28 md:pr-28 md:pl-28'>
        <p className='font-montBold text-sm ml-2'>Recommended</p>
        <div className=' p-2 flex flex-wrap items-center justify-between w-full'>
          {recommended.map((r, index) =>
            <div className='flex flex-col w-1/2 justify-between lg:w-1/4 md:w-11/4  p-2' key={index}>
              <img src="/images/Image 6.png" width={280} className='' />
              <p className='font-montSemiBold text-lg mt-2'>Duke T-Shirt<span></span></p>
              <p className='font-montRegular text-sm -mt-5'>Polo Neck Men&apos;s wear</p>
              <p className='font-montBold -mt-3'>₹ 499</p>
            </div>
          )}
        </div>

      </div> */}
        </>}
    </div>
  )
}


const mapStateToProps = state => {
  return {
    storeSettingsReducer: state.storeSettingsReducer,
    storeDetails: state.storeDetailsReducer?.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {

    getStoreDetails: (storeId) => dispatch(getStoreDetails(storeId)),
    dispatchSocialProfile: (storeId) => dispatch(getSocialProfileAction(storeId)),
    dispatchBannerImages: (storeId, setData, setLoading, loading) => dispatch(getBannerImagesAction(storeId, setData, setLoading, loading)),
    dispatchNewArrivals: (storeId, setData) => dispatch(getNewArrivalsAction(storeId, setData)),
    dispatchFeaturedProducts: (storeId, setData) => dispatch(getFeaturedProductsAction(storeId, setData)),
    dispatchStoreDisplaySettings: (storeId) => dispatch(getStoreDisplaySettings(storeId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageWrapper(Home))