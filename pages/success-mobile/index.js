import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import { connect } from 'react-redux';
import successTick from '/public/images/success_tick.svg'
import { useRouter } from 'next/router'
import { clearCart } from '../../actions';
import ReviewTracker from '../../components/ReviewTracker'
import Head from 'next/head';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

const Index = ({ storeSettings, clearCart }) => {
    const [order, setOrder] = useState()
    const router = useRouter();
    const orderInfo = router.query;
    console.log(orderInfo)

    useEffect(() => {
        clearCart()
    }, [])


    if (Object.keys(orderInfo).length === 0) {
        // router.push('/')
    }


    return (
        <>
      {/* <Head>
        <title>{storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
      </Head> */}

        <div className='lg:hidden md:hidden h-[70vh] lg:h-full  flex flex-col items-center justify-center w-full lg:py-32'>

<div style={{width:'100vw',marginTop:'-20px'}}>
<ReviewTracker storeSettings={storeSettings} addPaymentMethod={true} reviewOrder={true} orderPlaced={true}/>
   
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
                <button onClick={() => router.push('/account/myOrders')} className="border border-black text-black 
                 py-2  hover:bg-white hover:text-black transition w-24">
                        Track Order
                    </button>
                    <p onClick={() => router.push('/shop')} className=" text-lg font-montRegular text-black rounded px-2 py-2 hover:bg-black hover:text-white transition">
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
        storeDetails:state.storeDetailsReducer?.data
    }
}
const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => dispatch(clearCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index));