import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { couponApplyAction, couponApplyActions, fetchPurchaseDetails, forgotPasswordAction, removeCouponAction } from '../actions'
import { useRouter } from 'next/router'
import { useFieldArray } from 'react-hook-form'
import { SyncOutlined } from '@ant-design/icons'

function Coupon({ stateCustomerId, stateStoreDetails, statePurchaseDetails, dispatchCouponCode, stateStoreSettings, validCoupon, setValidCoupon, orderId,dispatchRemoveCoupon,billingDetails }) {

  const [coupon, setCoupon] = useState('')

  const [msg, setMsg] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (msg == 'Invalid Coupon Code') {
      // message.error(msg)
      // console.log('invalidddd cp')
      // setLoading(false)
    }
    
   else if (msg == undefined || msg) {

      // message.success('Coupon Applied Successfully')
      // setValidCoupon(true)
      // setLoading(false)
    }
  }, [msg])




  const handleChange = (e) => {
    setCoupon(e.target.value)
  }


  const applyCoupon = () => {
    console.log('coupon', coupon)
    const orderId = Object?.keys(statePurchaseDetails?.data?.orders)[0]
    setLoading(true)
    const payload = { customerId: stateCustomerId, orderId, storeId: stateStoreDetails?.store_id, coupon, msg, setMsg, message, setValidCoupon,purchaseId:statePurchaseDetails.data.purchaseId ,setLoading}

    dispatchCouponCode({ payload })

    setCoupon('')

  }

  const changeCoupon = () => {
    setValidCoupon(false)
    const orderId = Object?.keys(statePurchaseDetails?.data?.orders)[0]
    console.log('hellow')
    dispatchRemoveCoupon(orderId,statePurchaseDetails.data.purchaseId)
    setMsg('')
  }


  return (<>
    {stateCustomerId ?
      <div className='hidden lg:block bg-white p-4 -mt-20 lg:mt-0 md:mt-0'>
        <p className='font-montSemiBold text-lg'>Have a Coupon?</p>
        <div className='flex items-center'>
          {!billingDetails?.totalCouponSavingsAmount !=0 ?
            <>
              <input type="text" placeholder="Enter Coupon/Promo Code Here" name='coupon' value={coupon} onChange={handleChange} className='p-2 border-2 w-96 border-dashed border-[#00BAC8]' disabled={!loading ?false:true} />
              {!loading ? <button className='p-2 px-5 ml-3' style={{
                backgroundColor: stateStoreSettings ? stateStoreSettings.secondary_color : 'black', color: stateStoreSettings ? stateStoreSettings.navbar_color : 'white'
              }} onClick={applyCoupon}>Apply</button> : <SyncOutlined className='p-2 px-5 ml-3' style={{ fontSize: 22 }} spin />}
            </>

            :
            <>
              <p style={{
                color: stateStoreSettings ? stateStoreSettings.primary_color : 'white'
              }} >Coupon Applied Successfully</p>
              <p onClick={changeCoupon} className='cursor-pointer p-2 text-white ml-8' style={{
                backgroundColor: stateStoreSettings ? stateStoreSettings.secondary_color : 'black', color: stateStoreSettings ? stateStoreSettings.navbar_color : 'white'
              }} >Change Coupon</p>
            </>
          }


        </div>

      </div> : ''}


    {stateCustomerId && router.pathname == '/review-mobile' ?
      <div className='lg:hidden md:hidden flex items-center p-2'>
        {!validCoupon ?
          <div className='flex items-center'>
            <input type="text" placeholder="Enter your Coupon" className=' w-full outline-none' value={coupon} onChange={handleChange} />
            {!loading ? <button className=' text-sm px-4 py-2 text-blue-400 ml-28  ' style={{
              backgroundColor: stateStoreSettings ? stateStoreSettings.secondary_color : 'black', color: stateStoreSettings ? stateStoreSettings.navbar_color : 'white'
            }} onClick={applyCoupon}>Apply</button> : <SyncOutlined />}
          </div>
          :
          <>
            <p className='text-green-600' >Coupon Applied Successfully</p>
            <p onClick={changeCoupon} className='cursor-pointer p-2 text-white ml-16' style={{
              backgroundColor: stateStoreSettings ? stateStoreSettings.secondary_color : 'black', color: stateStoreSettings ? stateStoreSettings.navbar_color : 'white'
            }}>Change Coupon</p>
          </>}
      </div>

      : ''}

  </>
  )
}


const mapStateToProps = (state) => {
  return {
    stateCustomerId: state.customerDetailsReducer?.data,
    stateStoreDetails: state.storeDetailsReducer?.data,
    stateStoreSettings: state.storeSettingsReducer?.data,
    statePurchaseDetails: state.checkoutReducer?.purchaseDetails,
    stateCustomerId: state.customerDetailsReducer?.data?.customer_id
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    dispatchCouponCode: (payload) => dispatch(couponApplyAction(payload)),
    dispatchRemoveCoupon: (payload,purchaseId) => dispatch(removeCouponAction(payload,purchaseId)),
    fetchPurchaseDetails: (purchaseid) => dispatch(fetchPurchaseDetails(purchaseid)),

  }
}





export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coupon)