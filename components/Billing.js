import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { message, Modal, Spin } from 'antd'
import { useRouter } from 'next/router'
import { initiateCashOnDelivery, initiatePayment, initiateRazorPayOrder, setDeliveryAddress, setDeliveryAddressFlag, editAddressAPI, razorPayOrderSuccess } from '../services/apiServices'
import { addAddressAction, clearCart, defaultAddress, paymentMethodAction } from '../actions'
import OnlinePayment from './OnlinePayment'
import LoginModal from './LoginModal/LoginModal'
import { EditFilled, LoadingOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'
//crypto-js
import encHex from "crypto-js/enc-hex";
import cryptoJs from "crypto-js/core";
import pbkdf2 from "crypto-js/pbkdf2";
import encUtf8 from "crypto-js/enc-utf8";
import aes from "crypto-js/aes";
import StoreStatus from './svgComponents/StoreStatus'
import { toast, ToastContainer } from 'react-toastify'
import { useMediaQuery } from 'react-responsive'

export const Billing = ({ customerDetails, billingDetails, checkout, address, review, paymentMethod, clearCart, storeSettings, addAddressAction, defaultAddressAction, shippingAdded, wallet, walletAmount, final, dispatchPaymentMethod, showAddressMobile, stateStoreDetails, purchaseLoading, purchaseInvalid, minQtyMsg, minProduct, deliveryMethod }) => {

  const router = useRouter()
  const [paymentData, setPaymentData] = useState({})
  const [loader, setloader] = useState(false)
  const [visible, setVisible] = useState(false)

  const [editVisible, setEditVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState()
  const [codModalVisible, setCodModalVisible] = useState(false)
  const [razorpayKey, setRazorPayKey] = useState(null)

  const isTabletOrMobile = useMediaQuery({ query: ' (max-width: 992px)' })

  const [storeClosed, setStoreClosed] = useState(false)

  const [transparentLoader, setTransparentLoader] = useState(false)

  const decryptRazorPayKey = (RZPAccessKey) => {
    // console.log("widgets from", RZPAccessKey)
    var passphrase = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ENCRYPTION_PASSWORD;
    var encrypted = RZPAccessKey.ciphertext;
    var salt = encHex.parse(RZPAccessKey.salt);
    var iv = encHex.parse(RZPAccessKey.iv);
    var key = pbkdf2(passphrase, salt, {
      hasher: cryptoJs.algo.SHA1,
      keySize: 64 / 8,
      iterations: 999,
    });
    var decrypted = aes.decrypt(encrypted, key, { iv: iv });
    var decryptedString = decrypted.toString(encUtf8);
    // console.log("widgets from dec",decryptedString)
    setRazorPayKey(decryptedString)
  }

  useEffect(() => {
    // console.log("widgets from payment",storeSettings.widgets)
    if (storeSettings.widgets) {
      if (storeSettings.widgets.RAZORPAY_INTEGRATION) {
        if (storeSettings.widgets.RAZORPAY_INTEGRATION.record_status == "ACTIVE") {
          decryptRazorPayKey(storeSettings.widgets?.RAZORPAY_INTEGRATION?.integration_attributes?.RZPAccessKey)
        }
      }
    }
  }, [storeSettings.widgets])



  const showModal = () => {
    setVisible(true);
  }

  const { register, setValue, handleSubmit, reset, formState: { errors } } =
    useForm({
      defaultValues: {
        full_name: "",
        phone: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        address_fields: {},
        address_tag: "HOME",
        country: "India",
        is_default: "",
        latitude: null,
        longitude: null,
        state: "",
        zip_code: ""
      }
    })


  const handleProceed = async (device) => {



    if (customerDetails.data?.customer_id) {
      // const response = await setDeliveryAddress(address.purchaseDetails.data.purchaseId, address?.defaultAddress?.address_id)
      // if (response) {
      // setloader(false)

      // we dont need choose Delivery
      // const chooseDelivery = await setDeliveryAddressFlag(address.purchaseDetails.data.purchaseId,'Y')




      if (!minQtyMsg || minQtyMsg == undefined) {
        setloader(true)
        if (device == 'mobile') {
          if (!shippingAdded) {
            if (purchaseInvalid == '') {
              router.push('/address')
            }
            else {
              // message.error(purchaseInvalid)
              toast.error(purchaseInvalid, {
                position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
                style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setloader(false)
            }
          }
          else {



            if (deliveryMethod == 'DELIVERY' || deliveryMethod == 'PARCEL') {

              if (deliveryMethod == 'DELIVERY') {
                if (address.defaultAddress && !address.defaultAddress.pickup_point_name) {
                  const response = await setDeliveryAddress(address.purchaseDetails.data.purchaseId, address?.defaultAddress?.address_id)
                  if (response) {
                    setloader(false)
                    router.push('/review-mobile')
                  }
                }
                else {
                  setloader(false)
                  // message.error('Please Add the Address')
                  toast.error('Please Add the Address', {
                    position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: { marginTop: isTabletOrMobile ? '80px' : '0px' }
                  });
                }
              }
              else if (deliveryMethod == 'PARCEL') {
                setloader(false)
                router.push('/review-mobile')
              }

            }
            else {
              setloader(false)
              // message.error('Please Choose Delivery Method')
              toast.error('Please Choose Delivery Method', {
                position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: { marginTop: isTabletOrMobile ? '80px' : '0px' }
              });
            }



            // if (address.defaultAddress) {
            //   const response = await setDeliveryAddress(address.purchaseDetails.data.purchaseId, address?.defaultAddress?.address_id)
            //   if (response) {
            //     setloader(false)
            //     router.push('/review-mobile')
            //   }
            // } else {
            //   setloader(false)
            //   // message.error('Please Add the Address')

            //   toast.error('Please Add the Address', {
            //     position: "bottom-right",
            //     autoClose: 1000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //   });

            // }
          }
        }
        else {
          if (!shippingAdded) {
            if (purchaseInvalid == '') {
              router.push('/address')
            }
            else {
              setloader(false)
              // message.error(purchaseInvalid)
              toast.error(purchaseInvalid, {
                position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
                style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }
          else if (deliveryMethod == 'DELIVERY' || deliveryMethod == 'PARCEL') {

            if (deliveryMethod == 'DELIVERY') {
              if (address.defaultAddress && !address.defaultAddress.pickup_point_name) {
                const response = await setDeliveryAddress(address.purchaseDetails.data.purchaseId, address?.defaultAddress?.address_id)
                if (response) {
                  setloader(false)
                  router.push('/review')
                }
              }
              else {
                setloader(false)
                // message.error('Please Add the Address')
                toast.error('Please Add the Address', {
                  position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
                  style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }
            else if (deliveryMethod == 'PARCEL') {
              setloader(false)
              router.push('/review')
            }

          }
          else {
            setloader(false)
            // message.error('Please Choose Delivery Method')
            toast.error('Please Choose Delivery Method', {
              position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
              style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: { zIndex: 500000 }
            });
          }
        }
      }
      else {
        // message.error(`Please Check Minimum Quantity of ${minProduct}`)
        toast.error(`Please Check Minimum Quantity of ${minProduct}`, {
          position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
          style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    else {
      setloader(false)
      // message.error('Something is wrong with address')
      toast.error('Something is wrong with address', {
        position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
        style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }


    // }
    // else {
    //   setloader(false)

    // }

  }




  const handleProceedMobile = async () => {

    if (paymentMethod) {
      // router.push(
      //   {
      //     pathname: '/review-mobile/final',
      //     query: { wallet }
      //   }
      // )

      handlePayment()

      dispatchPaymentMethod(paymentMethod)
    }
    else {
      // message.error('Please Add the payment Method')
      toast.error('Please Add the payment Method', {
        position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
        style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handlePayment = async () => {
    // setloader(true)





    if (paymentMethod) {
      // if(walletAmount>walletAmount>billingDetails?.calculatedPurchaseTotal){
      const response = await initiatePayment(address.purchaseDetails.data.purchaseId)
      // }

      if (response.data) {
        const { customerId, purchaseId, discountedPurchaseTotal, currencyCode, totalSavings, orders } = response.data;
        const orderIds = Object.keys(orders)
        const { calculatedPurchaseTotal } = billingDetails

        setloader(false)

        const successInfo = { totalSavings, orderIds }

        if (wallet) {

          if (walletAmount < billingDetails?.calculatedPurchaseTotal) {

            if (paymentMethod == 'COD') {
              setTransparentLoader(true)
              const response = await initiateCashOnDelivery(purchaseId, customerId, walletAmount > billingDetails?.calculatedPurchaseTotal ? 0.00 : billingDetails?.calculatedPurchaseTotal - walletAmount)
              if (response.data) {
                // clearCart()
                setloader(false)
                router.push({
                  pathname: `/success`,
                  query: successInfo
                })
       
              }
            }
            if (paymentMethod == 'ONL') {
              const response = await initiateRazorPayOrder(purchaseId, walletAmount > billingDetails?.calculatedPurchaseTotal ? 0.00 : billingDetails?.calculatedPurchaseTotal - walletAmount, currencyCode)
              if (response.data) {
           
                const paymentInfo = {
                  rzpOrderId: response.data.id,
                  orderAmount: walletAmount > billingDetails?.calculatedPurchaseTotal ? 0.00 : billingDetails?.calculatedPurchaseTotal - walletAmount,
                  customerId: customerId,
                  purchaseId: purchaseId,
                  username: customerDetails.data?.full_name,
                  phone: customerDetails.data?.phone,
                  successInfo: successInfo
                }
                setPaymentData(paymentInfo)
              }
            }

          }
          else {
            const { customerId, purchaseId, discountedPurchaseTotal, totalDeliveryCharge, totalParcelCharge, totalConvenienceCharge } = response.data;

           
            razorPayOrderSuccess(purchaseId, customerId, discountedPurchaseTotal + totalDeliveryCharge + totalConvenienceCharge + totalParcelCharge, wallet, '', paymentMethod)
            router.push({
              pathname: `/success`,
              query: successInfo
            })
        
          }
        }
        else {

          if (paymentMethod == 'COD') {
            const response = await initiateCashOnDelivery(purchaseId, customerId, calculatedPurchaseTotal)
            setTransparentLoader(true)
            if (response.data) {
              // clearCart()
              setloader(false)
              router.push({
                pathname: `/success`,
                query: successInfo
              })
              // setTransparentLoader(false)
            }
          }
          if (paymentMethod == 'ONL') {
            const response = await initiateRazorPayOrder(purchaseId, calculatedPurchaseTotal, currencyCode)
            if (response.data) {
              const paymentInfo = {
                rzpOrderId: response.data.id,
                orderAmount: calculatedPurchaseTotal,
                customerId: customerId,
                purchaseId: purchaseId,
                username: customerDetails.data?.full_name,
                phone: customerDetails.data?.phone,
                successInfo: successInfo
              }
              setPaymentData(paymentInfo)
            }
          }

        }

      }
    }
    else {
      // message.error('Please Add the Payment Method')
      toast.error('Please Add the Payment Method', {
        position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
        style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setloader(false)
    }


  }

  const handleModal = (address) => {
    setEditVisible(true)


    Object.entries(address.defaultAddress).forEach(
      ([name, value]) => setValue(name, value));
  }

  const handleCancel = () => {

    setEditVisible(false);
  };

  const onSubmit = async (address) => {

    setLoading(true)

    const response = await editAddressAPI(customerDetails.data.customer_id, address.address_id, address)

    if (response) {
      // message.success(`${edit ? `Address Updated Successfully` : `Address added Successfully`}`)
      toast.error(`${edit ? `Address Updated Successfully` : `Address added Successfully`}`, {
        position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
        style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });


      setLoading(false)
      setEditVisible(false)
      //  defaultAddressAction(edit)

      edit && Object.entries(edit).forEach(
        ([name, value]) => setValue(name, ''));
      setEdit()

      reset()


    }
    else {
      // message.error('Something is wrong')
      toast.error('Something is wrong', {
        position: `${isTabletOrMobile ? 'top-center' : 'bottom-right'}`,
        style: { marginTop: isTabletOrMobile ? '80px' : '0px' },
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
    }

  }

  const handleCodModal = () => {
    setCodModalVisible(true)
  }

 

  return (
    <>
      {customerDetails.data?.customer_id ?
        <>
          <div className='hidden lg:flex md:flex flex-col items-center w-[100vw] -mt-4  lg:bg-white  md:mt-0  lg:w-full md:w-full '>


            <div className='flex items-start w-full'>
              {review ? <p className='text-sm font-montSemiBold w-[3000px]   w-full  mt-12 lg:mt-4 text-xl lg:px-5'>{address?.defaultAddress.pickup_point_name ? 'Pickup Point ' : 'Delivery Address'} <p className='font-montMedium   text-[13px] mt-3'>{address?.defaultAddress?.full_name}{address?.defaultAddress.pickup_point_name}, {address?.defaultAddress?.address_line_1}{address?.defaultAddress.address}, {address?.defaultAddress?.address_line_2},{address?.defaultAddress?.city}, {address?.defaultAddress?.state}, {address?.defaultAddress?.country}-{address?.defaultAddress?.zip_code}
              </p> </p>
                : ''}
              <p className='font-montRegular w-1/2 text-sm'>

              </p>

            </div>


            <p className='bg-white font-montSemiBold placeholder p-2  w-full   mt-12 lg:mt-1 text-lg lg:px-5 mb-0'>Billing Details</p>
            <div className='bg-white p-2 w-full  h-84'>
              {checkout != undefined ?
                <div className='bg-white p-2 w-full  font-montMedium'>

                  {/* <p className='text-sm font-montSemiBold'>Get all items before:</p> */}
                  <div className='flex items-center justify-between px-2 p-1 '>
                    <p>items Total</p>
                    <p className='font-semibold text-black'>{stateStoreDetails?.currency_symbol} {billingDetails?.totalOrderAmount}</p>
                  </div>
                  {billingDetails?.totalDeliveryCharge ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Shipping Charge</p>
                    <p className={`font-semibold ${billingDetails?.totalDeliveryCharge ? `text-black` : 'text-green-400'}`}> {billingDetails?.totalDeliveryCharge != 0 ? `+ ${stateStoreDetails?.currency_symbol} ${billingDetails?.totalDeliveryCharge}` : 'Free'}</p>
                  </div> : ''}
                  {billingDetails?.totalSavings != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Discount</p>
                    <p className='font-semibold'>-{stateStoreDetails?.currency_symbol} {billingDetails?.totalSavings}</p>
                  </div> : ''}
                  {billingDetails?.totalCouponSavingsAmount != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Coupon Discount</p>
                    <p className='font-semibold'>-{stateStoreDetails?.currency_symbol} {billingDetails?.totalCouponSavingsAmount}</p>
                  </div> : ''}
                  {billingDetails?.totalParcelCharge != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Parcel</p>
                    <p className='font-semibold'>+{stateStoreDetails?.currency_symbol} {billingDetails?.totalParcelCharge}</p>
                  </div> : ''}
                  {wallet && walletAmount != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Deduction from Wallet</p>
                    <p className='font-semibold'>- {stateStoreDetails?.currency_symbol} {walletAmount > billingDetails?.calculatedPurchaseTotal ? billingDetails?.calculatedPurchaseTotal : walletAmount}</p>
                  </div> : ''}
                  {billingDetails?.totalConvenienceCharge != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Convenience Charge</p>
                    <p className='font-semibold'>+ {stateStoreDetails?.currency_symbol} {billingDetails?.totalConvenienceCharge}</p>
                  </div> : ''}
                  {billingDetails?.totalTaxAmount != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Tax Amount</p>
                    <p className='font-semibold'>+ {stateStoreDetails?.currency_symbol} {billingDetails?.totalTaxAmount}</p>
                  </div> : ''}
                  <div className='flex items-center justify-between border-dashed border-t-2 border-slate-100  px-2 p-1 font-montSemiBold text-lg'>
                    <p>Total Amount</p>
                    <p className='font-semibold'>{stateStoreDetails?.currency_symbol} {wallet ? walletAmount > billingDetails?.calculatedPurchaseTotal ? 0.00 : billingDetails?.calculatedPurchaseTotal - walletAmount : billingDetails?.calculatedPurchaseTotal}</p>
                  </div>
                </div> :
                <div className='flex items-center mt-28 lg:w-full lg:min-w-[400px] justify-center'>
                  <Spin />
                </div>}
            </div>


            {paymentData.rzpOrderId && <OnlinePayment paymentData={paymentData} store={'storeDetails'} setPaymentData={setPaymentData} purchaseId={address.purchaseDetails.data.purchaseId} customerId={customerDetails.data?.customer_id} wallet={wallet} walletAmount={walletAmount} razorpayKey={razorpayKey}></OnlinePayment>}



          </div>
          <div className='hidden lg:block'>
            <img src="/billing-wave.png" />

          </div>

          <div className='hidden lg:flex items-center justify-center w-full'>

            {checkout != undefined ? !loader ? <button className='p-2 w-72 mt-4  ' style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, background: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }} onClick={() => {
              !customerDetails.data?.customer_id ? showModal() :
                stateStoreDetails.is_open_today != "Y" ? setStoreClosed(true) :
                  !review ? handleProceed() : paymentMethod == 'COD' ? handleCodModal() : handlePayment()
            }} disabled={loader ? true : false}>{customerDetails.data?.customer_id ? 'Proceed To Checkout' : 'LOGIN TO CHECKOUT'}</button> : <Spin /> : ''}
          </div>


        </> :
        <button className='p-2 w-72 mt-4 hidden lg:block' style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, background: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }} onClick={!customerDetails.data?.customer_id ? showModal : !review ? handleProceed : paymentMethod == 'COD' ? handleCodModal : handlePayment}>LOGIN TO CHECKOUT</button>
      }


      {/* Mobile View Only for review-mobile/final page */}

      {customerDetails.data?.customer_id && final ?
        <>
          <div className=' lg:hidden md:hidden flex flex-col items-center w-[100vw] -mt-4 mb-32 lg:mt-0 lg:mb-20 md:mt-0 md:mb-20 lg:w-full md:w-full '>
            <p className='bg-white font-montSemiBold placeholder p-2 w-full border-b-2 border-slate-100 mt-12 mb-0'>Billings Details</p>
            <div className='bg-white p-2 w-full h-84'>
              {checkout != undefined ?
                <div className='bg-white p-2 w-full'>
                  <div className='flex items-start w-full'>
                    {review ? <p className='text-sm font-montSemiBold w-[3000px]'>Shipping to <span className='font-montRegular   text-[12px]'>{address?.defaultAddress?.full_name}, {address?.defaultAddress?.address_line_1}, {address?.defaultAddress?.address_line_2},{address?.defaultAddress?.city}, {address?.defaultAddress?.state}, {address?.defaultAddress?.country}-{address?.defaultAddress?.zip_code}
                    </span> </p>
                      : ''}
                    <p className='font-montRegular w-1/2 text-sm'>

                    </p>

                  </div>
                  {/* <p className='text-sm font-montSemiBold'>Get all items before:</p> */}
                  <div className='flex items-center justify-between px-2 p-1 '>
                    <p>items</p>
                    <p className='font-semibold text-black'>{stateStoreDetails?.currency_symbol} {billingDetails?.totalOrderAmount}</p>
                  </div>
                  {billingDetails?.totalDeliveryCharge ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Shipping Charge</p>
                    <p className={`font-semibold ${billingDetails?.totalDeliveryCharge ? `text-black` : 'text-green-400'}`}> {billingDetails?.totalDeliveryCharge != 0 ? `+ ${billingDetails?.totalDeliveryCharge}` : 'Free'}</p>
                  </div> : ''}
                  {billingDetails?.totalSavings != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Discount</p>
                    <p className='font-semibold'>-{stateStoreDetails?.currency_symbol} {billingDetails?.totalSavings}</p>
                  </div> : ''}
                  {billingDetails?.totalCouponSavingsAmount != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Coupon Discount</p>
                    <p className='font-semibold'>-{stateStoreDetails?.currency_symbol} {billingDetails?.totalCouponSavingsAmount}</p>
                  </div> : ''}
                  {billingDetails?.totalParcelCharge != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Parcel</p>
                    <p className='font-semibold'>+{stateStoreDetails?.currency_symbol} {billingDetails?.totalParcelCharge}</p>
                  </div> : ''}
                  {wallet && walletAmount != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Deduction from Wallet</p>
                    <p className='font-semibold'>- {stateStoreDetails?.currency_symbol} {walletAmount > billingDetails?.calculatedPurchaseTotal ? billingDetails?.calculatedPurchaseTotal : walletAmount}</p>
                  </div> : ''}
                  {billingDetails?.totalConvenienceCharge != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Convenience Charge</p>
                    <p className='font-semibold'>+ {stateStoreDetails?.currency_symbol} {billingDetails?.totalConvenienceCharge}</p>
                  </div> : ''}
                  {billingDetails?.totalTaxAmount != 0 ? <div className='flex items-center justify-between px-2 p-1'>
                    <p>Tax Amount</p>
                    <p className='font-semibold'>+ {stateStoreDetails?.currency_symbol} {billingDetails?.totalTaxAmount}</p>
                  </div> : ''}
                  <div className='flex items-center justify-between border-t-2 border-slate-100  px-2 p-1'>
                    <p>Total</p>
                    <p className='font-semibold'>{stateStoreDetails?.currency_symbol} {wallet ? walletAmount > billingDetails?.calculatedPurchaseTotal ? 0.00 : billingDetails?.calculatedPurchaseTotal - walletAmount : billingDetails?.calculatedPurchaseTotal}</p>
                  </div>
                </div> :
                <div className='flex items-center mt-28 justify-center'>
                  <Spin />
                </div>}
            </div>
            {/* {!loader ? <button className='p-2 w-72 mt-4 ' style={{ color: 'white', background: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}` }} onClick={!customerDetails.data?.customer_id ? showModal : !review ? handleProceed : paymentMethod == 'COD' ? handleCodModal : handlePayment}>{customerDetails.data?.customer_id ? 'Proceed To Checkout' : 'LOGIN TO CHECKOUT'}</button> : <Spin />} */}

            {paymentData.rzpOrderId && <OnlinePayment paymentData={paymentData} store={'storeDetails'} setPaymentData={setPaymentData} purchaseId={address.purchaseDetails.data.purchaseId} customerId={customerDetails.data?.customer_id} wallet={wallet} walletAmount={walletAmount} razorpayKey={razorpayKey}></OnlinePayment>}



          </div>
        </> :
        ''
      }



      {/* Mobile View */}
      <div className='lg:hidden md:hidden flex  items-center justify-between bottom-16 pt-4 bg-white border-t-2 w-full fixed p-1 '>
        {!showAddressMobile ? <>  {!final ?
          checkout != undefined ? <div className=" w-1/2  pt-1  h-12 pr-2 mr-2   text-center font-montSemiBold text-  cursor-pointer" style={{ color: `${storeSettings.data ? 'black' : 'black'}`, background: `white` }}>

            <p className='mb-0 font-montRegular'>{billingDetails?.itemCount} Items In bag</p>Total {stateStoreDetails?.currency_symbol} {billingDetails?.calculatedPurchaseTotal}</div> : '' : ''}

          {checkout != undefined ? !loader ?
            <button className={` flex items-center justify-center text-lg h-12  ${final ? ' w-full' : 'w-44'} text-center font-montSemiBold`} style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, background: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }} onClick={() => { !customerDetails.data?.customer_id ? router.push('/account/user/login') : stateStoreDetails.is_open_today != "Y" ? setStoreClosed(true) : !review ? handleProceed('mobile') : final ? paymentMethod == 'COD' ? handleCodModal() : handlePayment('mobile') : handleProceedMobile() }}>{customerDetails.data?.customer_id ? 'PROCEED' : 'LOGIN'}</button> : <Spin /> :


            <button className={` flex items-center justify-center text-lg h-12  ${final ? ' w-full' : 'w-full'} text-center font-montSemiBold`} style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, background: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }} onClick={() => { !customerDetails.data?.customer_id ? router.push('/account/user/login') : stateStoreDetails.is_open_today != "Y" ? setStoreClosed(true) : !review ? handleProceed('mobile') : final ? paymentMethod == 'COD' ? handleCodModal() : handlePayment('mobile') : handleProceedMobile() }}>{customerDetails.data?.customer_id ? 'PROCEED' : 'LOGIN'}</button>

          }</> :
          ''}

        {paymentData.rzpOrderId && <OnlinePayment paymentData={paymentData} store={'storeDetails'} setPaymentData={setPaymentData} purchaseId={address.purchaseDetails.data.purchaseId} customerId={customerDetails.data?.customer_id} razorpayKey={razorpayKey}></OnlinePayment>}

        <LoginModal visible={visible} setVisible={setVisible} showModal={showModal} />

      </div>

      {/* Modal for Address */}
      <Modal
        title="Edit Address"
        visible={editVisible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ height: '60vh', overflowY: 'scroll' }}

      >
        <div className=''>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* input fields */}
            <div className='space-y-2 my-2'>
              <label htmlFor="" className='block'>Country*</label>
              <select className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.country ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} {...register("country", { required: true })} >
                <option value="India">India</option>
              </select>
            </div>
            <div className='space-y-2 my-2'>
              <label htmlFor="" className='block'>Name*</label>
              <input className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.full_name ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Enter Your Full Name" {...register("full_name", { required: true })} />
            </div>
            <div className='space-y-2 my-2'>
              <label htmlFor="" className='block'>Mobile Number* <span className='text-xs'>(Commonly Used to Assist Delivery)</span></label>
              <input className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.phone ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Enter Your 10 Digit Mobile Number" {...register("phone", {
                required: true, pattern: {
                  value: /^[0-9]+$/,
                  message: 'Please enter a valid Phone number',
                }
              })} />
              {errors ? <p className='text-red-500'>{errors?.phone?.message}</p> : ""}
            </div>
            <div className='space-y-2 my-2'>
              <label htmlFor="" className='block'>Flat No. , House No. / House Name, Road No.*</label>
              <input className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.address_line_1 ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Address" {...register("address_line_1", { required: true })} />
            </div>
            <div className='lg:grid lg:grid-cols-2 lg:space-x-6'>
              <div className='space-y-2 my-2'>
                <label htmlFor="" className='block'>Colony, Area, Street, Village*</label>
                <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.address_line_2 ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="More Address Details" {...register("address_line_2", { required: true })} />
              </div>
              <div className='space-y-2 my-2'>
                <label htmlFor="" className='block'>Land Mark <span className='text-xs'>(optional)</span></label>
                <input className='w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type="text" placeholder="e.g - Near 9 to 9 Super Market" {...register("land_mark", { required: false })} />
              </div>
            </div>
            <div className='lg:grid lg:grid-cols-4 lg:space-x-6'>
              <div className='col-span-2'>
                <div className='space-y-2 my-2'>
                  <label htmlFor="" className='block'>State*</label>
                  <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.state ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Select Your State" {...register("state", { required: true })} />
                </div>
              </div>
              <div className='space-y-2 my-2 col-span-1'>
                <label htmlFor="" className='block'>District*</label>
                <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.city ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Select Your District" {...register("city", { required: true })} />
              </div>

              <div className='space-y-2 my-2 col-span-1'>
                <label htmlFor="" className='block'>Pin*</label>
                <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.zip_code ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Enter Your Area Pin" {...register("zip_code", {
                  required: true, pattern: {
                    value: /^[0-9]+$/,
                    message: 'Please enter numbers only',
                  }
                })} />
                {errors ? <p className='text-red-500 '>{errors?.zip_code?.message}</p> : ""}
              </div>
            </div>

            <div className='space-y-2 my-2'>
              {/* <p className='m-0 p-0'>Address Type</p> */}
              {/* <div className='flex gap-3'> */}
              <div className='flex gap-1 items-center'>

                <input {...register("address_tag", { required: true })} type="radio" value="HOME" />
                <label htmlFor="">Home Address <span className='text-xs'>(product will be delivered between 7 am to 9 pm)</span></label>
              </div>
              <div className='flex gap-1 items-center'>

                <input {...register("address_tag", { required: true })} type="radio" value="WORK" />
                <label htmlFor="">Office / Work Address <span className='text-xs'>(product will be delivered between 10 am to 6 pm)</span></label>
              </div>
              {/* </div> */}
            </div>
            {/* buttons */}
            {/* <div className="flex justify-between mt-3"> */}
            {/* <Button loading={loading}> */}
            {!loading && <input className='border  py-3 px-11 mt-3 text-base  cursor-pointer' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`, color: `white` }} type="submit" value={`${!edit ? 'SAVE ADDRESS' : 'EDIT ADDRESS'}`} />}
            {loading && <span className='ml-3'><LoadingOutlined style={{ fontSize: 24 }} spin /></span>}
            {/* </Button> */}
            {/* <button className='p-3 bg-red-500 w-5/12 rounded' onClick={() => setIsModalVisible(false)}>Cancel</button> */}
            {/* </div> */}
          </form>
        </div>
      </Modal>




      {/* Modal for COD Confirmation */}


      <Modal title="Order Confirm" visible={codModalVisible} onCancel={() => {
        setTransparentLoader(false)
        setCodModalVisible(false)
      }} footer={null}>
        <p className='text-xl text-center font-montSemiBold'>Proceed?</p>
        <p className='text-base text-center'>Confirm Your Order For Cash On Delivery</p>
        <div className='flex justify-center gap-3 pb-4'>
          <button onClick={() => {
            setCodModalVisible(false)
            setTransparentLoader(false)
          }
          } className='w-4/12 border py-2 rounded' style={{ borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>Cancel</button>
          <button onClick={transparentLoader?'':handlePayment} className='w-4/12 py-2 rounded' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`, }}>Confirm</button>
        </div>


        {transparentLoader ?
          <div className='absolute h-full -mt-44 -ml-96 h-[50vh]  w-[80vw] ' >
            <button className='  h-full w-full text-lg px- rounded font-montMedium border-[#959595] text-[#FFFFFF] bg-black bg-opacity-20 backdrop-blur-sm rounded drop-shadow-lg '
            ><p className='font-montMedium text-lg'>Your Order Is Being Processed</p>
              <p className='font-montRegular text-sm'>To ensure your order is not interrupted, please avoid clicking the <br />back or refresh buttons.</p>
              <p><LoadingOutlined /></p>
            </button>

          </div>
          : ''}

      </Modal>



      {/* {Modal When Store is Closed} */}

      <Modal title="" visible={storeClosed} onCancel={() => setStoreClosed(false)} footer={null}>


        <div className='flex flex-col justify-center gap-3'>


          <StoreStatus secondaryColor={storeSettings.data ? storeSettings.data.secondary_color : 'black'} mobile={false} navbarColor={storeSettings.data ? storeSettings.data.primary_color : 'black'} />
          <p className='text-base text-center text-sm'>Store is offline and unable to take your order at the moment. You can try to Contact Us to know more.</p>
        </div>

      </Modal>
      <div className='mt-24 z-[500000]'>
        <ToastContainer />
      </div>



    </>
  )
}

const mapStateToProps = (state) => ({
  address: state.checkoutReducer,
  customerDetails: state.customerDetailsReducer,
  storeSettings: state.storeSettingsReducer,
  stateStoreDetails: state.storeDetailsReducer?.data


})

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(clearCart()),
    addAddressAction: (payload) => dispatch(addAddressAction(payload)),
    defaultAddressAction: (data) => dispatch(defaultAddress(data)),
    dispatchPaymentMethod: (data) => dispatch(paymentMethodAction(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing)