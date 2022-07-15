import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import { connect } from 'react-redux';
import successTick from '/public/images/success_tick.svg'
import { useRouter } from 'next/router'
import { clearCart, fetchBackendCart, } from '../../actions';
import ReviewTracker from '../../components/ReviewTracker'
import Head from 'next/head';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const Index = ({ storeSettings, clearCart, storeDetails, fetchBackendCart ,paymentAdded}) => {
    const [order, setOrder] = useState()
    const router = useRouter();


    const [rgbaBackground, setRgbaBackground] = useState('')
    const [primaryBackground, setPrimaryBackground] = useState('')
    
    const [rgbaColor, setRgbaColor] = useState()
    

    const orderInfo = router.query;
    console.log(orderInfo)

    useEffect(() => {
        clearCart()
        fetchBackendCart()
    }, [])


    if (Object.keys(orderInfo).length === 0) {
        router.push('/')
    }

    const continueShopping = {

    }

    useEffect(() => {

        setRgbaBackground(hex2rgba(storeSettings.data ? storeSettings.data.primary_color : '#ffffff', 0.25))
        setPrimaryBackground(hex2rgba(storeSettings.data ? storeSettings.data.primary_color : '#000000', 1))

    }, [rgbaBackground == ''])

    const hex2rgba = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgba(${r},${g},${b},${alpha})`;
    };


    return (
        <>
            {/* <Head>
                <title>{storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
            </Head> */}

<div className='hidden lg:block lg:mt-32'>
                    <ReviewTracker storeSettings={storeSettings} addPaymentMethod={false} reviewOrder={false} orderPlaced={true} paymentAdded={true}  />
                </div>


            <div className='hidden h-[70vh] lg:h-full  lg:flex lg:flex-col items-center justify-center p-2 lg:py-16'>

         




                <div className=' w-full  flex flex-col justify-center items-center pb-10 h-[50vh]' style={{
                    backgroundColor: storeSettings?.data?.primary_color ? rgbaBackground : ''
                }}>
                    {/*
                <div className='w-24 h-24 mt-10'>
                    <img src="/images/success_tick.svg" alt="" />
                </div> */}
                    <p className='text-4xl pt-20 font-montSemiBold' style={{
                        color: storeSettings?.data?.primary_color ? storeSettings.data.primary_color : ''
                    }}>Thank You !</p>

                    <p className="mt-1 w-full text-lg  text-black font-montMedium text-center" style={{
                        color: !storeSettings?.data?.navbar_color ? storeSettings.data.navbar_color : 'black'
                    }}> Your order has been placed successfully, an order confirmation mail has been sent to you</p>
                    {orderInfo.totalSavings != 0 ? <p className="text-sm  font-montMedium" style={{
                        color: !storeSettings?.data?.navbar_color ? storeSettings.data.navbar_color : 'black'
                    }}>Congratulations! You saved {storeDetails?.currency_symbol} {orderInfo.totalSavings} on this order.</p> : ""}
                    {typeof (orderInfo.orderIds) != 'string' ? <p className=' font-montBold' style={{
                        color: !storeSettings?.data?.navbar_color ? storeSettings.data.navbar_color : 'black'
                    }}>Order Id - {orderInfo?.orderIds?.map(item => `#${item}, `)}</p>
                        :
                        <p className='font-montBold text-lg' style={{
                            color: !storeSettings?.data?.navbar_color ? storeSettings.data.navbar_color : 'black'
                        }}>Order Id - #{orderInfo.orderIds}</p>
                    }

                    <div className='flex flex-col justify-center items-center mt-4 '>
                        <button onClick={() => 
                          window.location.replace(`/account/orderDetails/${orderInfo.orderIds}`)}
                    
                        // router.push(`/account/orderDetails/${orderInfo.orderIds}`)}
                         className={`border border-black text-black text-[18px]
                 py-2  hover:bg-white hover:text-black transition w-48`} style={{border:`1px solid ${storeSettings?.data?.primary_color ? storeSettings.data.primary_color :'black'}`}}>
                            Track Order
                        </button>
                        <p onClick={() => 
                            // router.push('/shop')}
                            window.location.replace('/shop')}
                    
                            className=" text-lg font-montRegular text-black rounded px-2 py-2 cursor-pointer">
                            Continue Shopping
                        </p>

                    </div>


                </div>
                {/* <div className='space-x-14 mt-4'>
                        <button onClick={() => router.push('/shop')} className={`border border-black rounded px-2 py-2 hover:text-white transition continue-shopping`}  style={{
                        color: storeSettings?.data?.primary_color ? storeSettings.data.secondary_color : '',border:`1px solid ${storeSettings?.data?.primary_color ? storeSettings.data.secondary_color : ''}`
                    }}>
                            Continue Shopping
                        </button>
                        <button onClick={() => 
                        // router.push(`/account/orderDetails/${orderInfo.orderIds}`)
                        window.location.replace(`/account/orderDetails/${orderInfo.orderIds}`)
                    
                    
                    } style={{
                        color: storeSettings?.data?.primary_color ? storeSettings.data.navbar_color : 'white',backgroundColor: storeSettings?.data?.primary_color ? storeSettings.data.secondary_color : 'black',
                    }} className="text-white px-2 py-2 rounded hover:bg-white hover:text-black transition">
                            View Order Details
                        </button>
                    </div> */}
            </div>

            <div className='lg:hidden md:hidden h-[70vh] lg:h-full  flex flex-col items-center justify-center w-full lg:py-32'>

                <div style={{ width: '100vw', marginTop: '-20px' }}>
                    <ReviewTracker storeSettings={storeSettings} addPaymentMethod={true} reviewOrder={true} orderPlaced={true} />

                </div>

                <div className=' w-full  flex flex-col justify-center items-center pb-10' style={{
                    backgroundColor: 'white'
                }}>


                    <div className='w-24 h-10 mt-28 lg:mt-0'>
                        <img src="/images/success_tick.svg" alt="" />
                    </div>


                    <p className="mt-20 w-full text-lg text-green-500 font-montMedium text-center"> Order Placed Successfully</p>
                    {orderInfo.totalSavings != 0 ? <p className="text-sm text-black font-montRegular">Congratulations! You saved {storeDetails?.currency_symbol} {orderInfo.totalSavings} on this order.</p> : ""}
                    {typeof (orderInfo.orderIds) != 'string' ? <p className='text-black font-montBold'>Order Id - {orderInfo?.orderIds?.map(item => `#${item}, `)}</p>
                        :
                        <p className='text-black font-montSemiBold'>ORDER ID - #{orderInfo.orderIds}</p>
                    }
                    <div className='flex flex-col justify-center items-center '>
                        <button onClick={() =>
                        //  router.push(`/account/orderDetails/${orderInfo.orderIds}`)} 
                         window.location.replace(`/account/orderDetails/${orderInfo.orderIds}`)}
                    
                         className="border border-black text-black 
                 py-2  hover:bg-white hover:text-black transition w-24">
                            Track Order
                        </button>
                        <p onClick={() => 
                            // router.push('/shop')} 
                            window.location.replace('/shop')}
                            className=" text-lg font-montRegular text-black rounded px-2 py-2 hover:bg-black hover:text-white transition">
                            Continue Shopping
                        </p>

                    </div>
                </div>
            </div>
        </>
    );
};


const mapStateToProps = state => {
    return {
        storeSettings: state.storeSettingsReducer,
        orderDetails: state.fetchOrdersReducer,
        storeDetails: state.storeDetailsReducer?.data
    }
}
const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => dispatch(clearCart()),
        fetchBackendCart: () => dispatch(fetchBackendCart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index));