import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Profile from '../../../components/Profile'
import { ArrowLeftOutlined, LeftOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { message, Spin, Steps, Modal, Checkbox, Radio, Space } from 'antd';
import { useRouter } from 'next/router'
import { readOrders } from '../../../services/apiServices'
import { cancelOrderAction } from '../../../actions'
import moment from 'moment'
import Stepper from '../../../components/stepper'
import Head from 'next/head';
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import { useRef } from "react"
import { toast, ToastContainer } from 'react-toastify';


const { Step } = Steps;

export const Index = ({ stateStoreSettings, dispatchCancelOrder, storeDetails, stateCustomerDetails }) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])
    const [orderStatus, setOrderStatus] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [cancelTab, setCancelTab] = useState(false)
    const [value, setValue] = useState();
    const [orderId, setOrderId] = useState()
    const [orderItemId, setOrderItemId] = useState([])
    const [cancelReason, setCancelReason] = useState()
    const [customerId, setCustomerId] = useState()
    const [msg, setMsg] = useState('')
    const [isReturnActive, setIsReturnActive] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const [cancelLoader, setCancelLoader] = useState(false)
    const ref = useRef(null);


    const steps = [
        {
            label: 'Order is Placed',
            dsc: moment.unix(orderDetails?.orderPlacedTime).format('LLL')
        },
        {
            label: 'Order in Progress',
        },
        {
            label: 'Out For Delivery',
        },
        {
            label: 'Order Delivered Successfully',
        },


    ];

    const cancelSteps = [
        {
            label: 'Order is Placed',
            dsc: moment.unix(orderDetails?.orderPlacedTime).format('LLL')
        },

        {
            label: orderDetails.orderStatus == "CANCELLED_BY_CUSTOMER" ? 'Order Cancelled' : 'Order Declined by Restaurant',
        },


    ];





    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const style = stateStoreSettings ? {
        completed: {
            color: stateStoreSettings.secondary_color || '#E83B3B'
        },
        active: {
            color: '#E83B3B'
        },
        pending: {
            color: '#c5c5c5'
        },
        check: {
            color: '#fff'
        },
    } : {}


    const showModal = () => {


        setIsModalVisible(true);

    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCancelTab(false)
        setCancelLoader(false)
        setValue()
        setOrderItemId([])
    };

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    }, []);





    useEffect(() => {

        if (router.isReady) {
            getOrderDetails()
        }


    }, [router.isReady, msg])

    const getOrderDetails = async () => {
        setLoading(true)
        console.log('router.query', router.query.id)
        const response = await readOrders(router.query.id)
        if (response) {
            setOrderDetails(response.data)
            setLoading(false)
        }
        else {
            // message.error('Unable to fetch Order Details,Please try after sometime')


            toast.error('Unable to fetch Order Details,Please try after sometime', {
                position: "bottom-right",
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

    useEffect(() => {
        if (orderDetails?.orderStatus) {
            if (orderDetails?.orderStatus == "PAYMENT_COMPLETED") {
                setOrderStatus(0)
            }
            else if (orderDetails?.orderStatus == "ORDER_CONFIRMED_BY_REST") {
                setOrderStatus(1)
            }
            else if (orderDetails?.orderStatus == "PENDING_PICKUP_BY_CUST") {
                setOrderStatus(2)
            }
            else if (orderDetails?.orderStatus == "ORDER_DELIVERED_SUCCESS") {
                setOrderStatus(3)
            }
            else if (orderDetails?.orderStatus == "ORDER_DECLINED_BY_RESTAURANT" || orderDetails?.orderStatus == "CANCELLED_BY_CUSTOMER") {
                setIsCancelled(true)
                setOrderStatus(1)
            }
        }
    }, [orderDetails, msg])



    useEffect(() => {
        if (msg != '') {
            handleCancel()
            // message.success('Order has been cancelled')

            toast.success('Order has been cancelled', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }

    }, [msg])


    const handleCancelTab = () => {
        console.log('orderItemId', orderItemId)
        if (orderItemId.length != 0) {
            setCancelTab(!cancelTab)
        } else {
            // message.error('Please choose items to return')


            toast.error('Please choose items to return', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }


    const handleCancelReason = () => {
        console.log('value', value, orderDetails.orderId)
        if (value) {
            setCancelLoader(true)
            const payload = { customerId: stateCustomerDetails.customer_id, orderId: orderDetails.orderId, cancelReason: value, orderId: orderDetails.orderId, }
            console.log('payload', payload)
            dispatchCancelOrder(orderDetails.orderId, { payload }, setMsg)
        }
        else {
            // message.error('Please select reason for cancellation')

            toast.error('Please select reason for cancellation', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });


        }
    }

    const handleOrderReturnProduct = (e, item) => {
        console.log('itemm', item, e.target.checked)
        if (e.target.checked) {
            setOrderItemId([...orderItemId, item.orderItemId]);
            setCustomerId(item.customerId)
            setOrderId(item.orderId)
        }
        else {
            const data = orderItemId.filter(i => i !== item.orderItemId)
            console.log('data', data)
            setOrderItemId(data)
        }
        // setOrderItemId(...orderItemId,[orderItem])
    }

    console.log('orderItemId', orderItemId, value)



    return (
        <div className='mt-16  lg:mt-24 md:mt-0 bg-[#F6F6F6] flex lg:pl-32 lg:p-8'>
            {/* <Head>
                <title>{storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
            </Head> */}
            <Profile />


            <div className='flex flex-col w-full lg:px-2 lg:mr-28'>

                {!loading ?
                    <>

                        <div className='flex flex-col w-full lg:mr-24 bg-white lg:ml-8 rounded'>
                            <div className=' hidden lg:pl-8 lg:flex items-center justify-between text-left  w-full rounded'>
                                <div className='lg:w-1/2 flex mt-6 lg:mt-0  '>
                                    <Link href='/account/myOrders'>
                                        <ArrowLeftOutlined className='text-black text-lg mr-4 mt-4' />
                                    </Link>
                                    {/* <p className='text-black font-montSemiBold'>Order Details</p> */}
                                    <p className='text-black text-lg font-montBold lg:mt-3 mt-6'>Order Id  #{orderDetails.orderId}</p>

                                </div>
                                {/* <p className='text-[#212B3680] font-montSemiBold lg:mt-0 mt-6'>Order ID - # {orderDetails.orderId}</p> */}
                            </div>

                            <div className='bg-white lg:hidden lg:pl-8 flex items-center justify-between text-left w-full '>
                                <div className='lg:w-1/2 flex mt-3 lg:mt-0 border-b border-blue-100 shadow w-full mb-2'>
                                    <Link href='/account/myOrders'>
                                        <LeftOutlined className='text-black text-lg mr-4 mt-4 ml-3' />
                                    </Link>
                                    {/* <p className='text-black font-montSemiBold'>Order Details</p> */}
                                    <p className='text-black text-lg font-montSemiBold lg:mt-3 mt-3'>Order ID  #{orderDetails.orderId}</p>

                                </div>
                                {/* <p className='text-[#212B3680] font-montSemiBold lg:mt-0 mt-6'>Order ID - # {orderDetails.orderId}</p> */}
                            </div>




                            <div className=' flex flex-col lg:items-start lg:justify-around justify-between  min-h-96  w-full  cursor-pointer'>
                                {/* Web View Tracker */}


                                <div className=' w-full flex flex-col lg:flex-row flex-wrap px-3 lg:p-4 lg:px-12 lg:justify-between  bg-white '>
                                    {/* Object.values(orderDetails.orderItems).map(item => */}
                                    {orderDetails?.orderItems && Object?.values(orderDetails?.orderItems)?.map((item, index) =>
                                        <div className='flex lg:items-start lg border-2 w-[30vw] lg:border-[#00000028]  lg:pl-8  lg:p-3 md:pl-8 lg:pt-3 md:pt-3 text-left w-full mb-2 lg:mb-0 lg:mt-2' key={index} onClick={() => { router.push(`/product/${item.itemId}`) }}>
                                            <img src={item.itemImg ? item.itemImg : `https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg`} className='w-36 h-28 lg:h-36 min-w-36 max-w-36 border border-blue-100 shadow ' />
                                            <div className='flex flex-col items-start w-full ml-3 lg: '>
                                                <div className='flex'>
                                                    {item.isVeg ? <img src="/veg.svg" className=' w-4 h-4  mr-2' />
                                                        : <img src="/non-veg.png" className='w-4 h-4  mr-2' />}

                                                    <p className='text- font-montSemiBold w-56 lg:w-72   break-words'>{item.itemName}</p>
                                                </div>
                                                {item.customizationDetails && <p className='text-[#212B3680]'><span className='text-black'>Color : </span>{item.customizationDetails ?
                                                    item.customizationDetails?.variant_item_attributes.variant_value_1?.variant_value_name : ''},

                                                    <span className='text-black'>Size : </span>{item.customizationDetails ?
                                                        item.customizationDetails?.variant_item_attributes?.variant_value_2?.variant_value_name : ''},

                                                </p>}
                                                <p className='text-lg font-montSemiBold'>{storeDetails?.currency_symbol}


                                                    {item.customizationDetails ? item.customizationDetails.sale_price : item.itemPrice}</p>

                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className='hidden lg:block md:block p-12 lg:w-full bg-white '>
                                    {/* <Steps direction="horizontal" size="small" current={orderStatus}>
                                        <Step title="Order Placed" description="" />
                                        <Step title="Order accepted by the seller" description="" />
                                        <Step title="Shipped" description="" />
                                        <Step title="Out for Delivery" description="" />
                                        <Step title="Delivered" description="" />
                                    </Steps> */}

                                    <p className='text-black text-lg font-montBold '>Order Status</p>



                                    <Stepper vertical={false} steps={orderDetails.orderStatus == 'CANCELLED_BY_CUSTOMER' || orderDetails.orderStatus == 'ORDER_DECLINED_BY_RESTAURANT' ? cancelSteps : steps} activeStep={orderStatus + 1} sx={style} openReturn={setIsReturnActive} details={orderDetails} />
                                </div>



                            </div>
                            <div className=' w-full bg-white p-4 lg:hidden md:hidden'>
                                {/* <Steps direction="vertical" size="small" current={1}>
                            <Step title="Order Placed" description="Apr 19, 2022" />
                            <Step title="Order accepted by the seller" description="This is a description." />
                            <Step title="Shipped" description="This is a description." />
                            <Step title="Out Of Delivery" description="This is a description." />
                            <Step title="Delivered" description="This is a description." />
                        </Steps> */}

                                <Stepper vertical={true} steps={orderDetails.orderStatus == 'CANCELLED_BY_CUSTOMER' || orderDetails.orderStatus == 'ORDER_DECLINED_BY_RESTAURANT' ? cancelSteps : steps} activeStep={orderStatus + 1} sx={style} openReturn={setIsReturnActive} details={orderDetails} />
                            </div>
                            <div className=' bg-white pl-8 p-3 text-right lg:ml- w-full border-b-4 border-slate-[200]'>

                                {orderDetails.orderStatus == "CANCELLED_BY_CUSTOMER" ? <span className='text-[#212B36] cursor-pointer font-montSemiBold pr-5' >{orderDetails.orderStatus == "CANCELLED_BY_CUSTOMER" ? 'Order Cancelled by Customer' : 'ORDER_DECLINED_BY_RESTAURANT'}</span> :

                                    <span className='text-[#212B36] cursor-pointer font-montSemiBold pr-5' onClick={showModal}>Cancel</span>}

                                {/* <span className='text-[#212B36] cursor-pointer font-montSemiBold' >Need Help ?</span> */}
                            </div>
                        </div>


                        {/* order summary */}
                        <div className=" lg:ml-8 p-6 mb-6 w-full items-center bg-white ">
                            <h2 className="text-xl font-montMedium text-center mb-9">Shipping and Billing Details</h2>
                            <div className=" lg:w-1/2">
                                <div className='border p-3 px-5 mb-3 rounded'>

                                    <p className='text-lg font-montSemiBold'>Address</p>

                                    <div className='flex justify-between lg:w-1/3 md:w-1/3 mb-4 '>
                                    {orderDetails?.isParcel=='Y'?<p>{storeDetails?.address},{storeDetails?.city},{storeDetails?.state},{storeDetails?.country}</p> :   <p>{orderDetails?.deliveryAddressDetails?.full_name}, {orderDetails?.deliveryAddressDetails?.address_line_1}, {orderDetails?.deliveryAddressDetails?.address_line_2}, {orderDetails?.deliveryAddressDetails?.city}, {orderDetails?.deliveryAddressDetails?.state}, {orderDetails?.deliveryAddressDetails?.country}-{orderDetails?.deliveryAddressDetails?.zip_code}</p>}

                                    </div>
                                </div>

                                <p className='text-lg font-montSemiBold'>Billing Details</p>

                                <div className='flex justify-between'>
                                    <p>Price</p>
                                    <p>{storeDetails?.currency_symbol} {Number(orderDetails?.orderAmount).toFixed(2)}</p>
                                </div>
                                {orderDetails?.parcelCharge != 0 ? <div className='flex justify-between'>
                                    <p>Discount</p>
                                    <p>-{storeDetails?.currency_symbol} {Number(orderDetails?.savingsAmount).toFixed(2)}</p>
                                </div> : ''}
                                {orderDetails?.parcelCharge != 0 ? <div className='flex justify-between'>
                                    <p>Parcel</p>
                                    <p>+{storeDetails?.currency_symbol} {Number(orderDetails?.parcelCharge).toFixed(2)}</p>
                                </div> : ''}
                                {orderDetails?.deliveryCharge != 0 ? <div className='flex justify-between'>
                                    <p>Shipping</p>
                                    <p style={{ color: `${stateStoreSettings?.secondary_color ? stateStoreSettings.secondary_color : "black"}` }}>{parseFloat(orderDetails?.deliveryCharge) ? `+${storeDetails?.currency_symbol} ${Number(orderDetails?.deliveryCharge).toFixed(2)}` : 'Free'}</p>
                                </div> : ''}
                                {orderDetails?.convenienceFee != 0 ?   <div className='flex justify-between'>
                                    <p>Tax</p>
                                    <p>+{storeDetails?.currency_symbol} {Number(orderDetails?.taxAmount).toFixed(2)}</p>
                                </div>:''}
                                {orderDetails?.couponSavingsAmount != 0 ?     <div className='flex justify-between'>
                                    <p>Coupon Applied</p>
                                    <p>-{storeDetails?.currency_symbol} {Number(orderDetails?.couponSavingsAmount).toFixed(2)}</p>
                                </div>:''}
                                {orderDetails?.convenienceFee != 0 ?  <div className='flex justify-between'>
                                    <p>Convenience Charge</p>
                                    <p>+{storeDetails?.currency_symbol} {Number(orderDetails?.convenienceFee).toFixed(2)}</p>
                                </div>:''}
                                <hr />
                                <div className='flex justify-between text-xl font-montMedium mt-1'>
                                    <p>Total</p>
                                    <p>{storeDetails?.currency_symbol} {Number(orderDetails?.calculatedOrderTotal).toFixed(2)}</p>
                                </div>

                                <div className='flex justify-betwee font-montMedium mt-1 gap-3'>
                                    <p>Payment Mode: </p>
                                    <p className='text-green-400'> {orderDetails?.paymentDetails && orderDetails?.paymentDetails[0].payment_mode}</p>
                                </div>
                                {/* discount */}
                                {
                                    orderDetails?.savingsAmount ? <div className='p-6 text-center'>
                                        <p className='bg-green-200 p-4 rounded font-montRegular'>You Saved {storeDetails?.currency_symbol} {Number(orderDetails?.savingsAmount).toFixed(2)} on this order</p>
                                    </div> : ''
                                }
                            </div>


                        </div>

                    </>
                    :
                    <div className='h-96 flex items-center justify-center'>


                        <lottie-player
                            id="firstLottie"
                            ref={ref}
                            autoplay

                            loop
                            mode="normal"
                            src="/loader.json"
                            style={{ width: "100px", height: "100px" }}
                        ></lottie-player>
                    </div>}
            </div>


            <Modal title="Cancel Order" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={false} bodyStyle={{ padding: '0px', paddingLeft: '20px' }} destroyOnClose={true}>

                {/* You can uncomment if the item level cancellation feature exists  */}


                {/* {!cancelTab ? <>
                    <p className='font-montSemiBold mt-4'>Choose items to return</p>
                    {orderDetails?.orderItems && Object?.values(orderDetails?.orderItems)?.map((item, index) =>

                        <div className='flex flex-col ' key={index}>
                            <div className='flex items-center justify-start pb-6'  >
                                <input type="checkbox" className='cursor-pointer' onChange={(e) => { handleOrderReturnProduct(e, item) }} />
                                <img src={item.itemImg ? item.itemImg : `https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg`} className='w-20 h-16 min-w-28 max-w-28 px-2' onClick={() => { router.push(`/product/${item.itemId}`) }} />
                                <div className=''>
                                    <p className='text-lg font-montSemiBold   break-words'>{item.itemName}</p>
                                </div>

                            </div>

                        </div>
                    )}
                    <div className='w-full flex items-end justify-end px-8'>
                        <button className=' px-8 font-montSemiBold py-2 text-white mb-10' style={stateStoreSettings ? { background: stateStoreSettings?.secondary_color } : { background: 'black' }} onClick={handleCancelTab}>Next</button>

                    </div>
                </> : */}
                {orderDetails?.orderStatus == "PAYMENT_COMPLETED" ? <div className='px-10'>
                    <p className='font-montSemiBold py-2'>Why are you cancelling this order ?</p>
                    <div className='flex flex-col'>
                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                                <Radio value='Order got delayed'>Order got delayed</Radio>
                                <Radio value='Wrong delivery address'>Wrong delivery address</Radio>
                                <Radio value='Product Defective'>Product Defective</Radio>
                                <Radio value='Got it at a better price'>Got it at a better price</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className='w-full flex items-end justify-center px-8'>
                        {!cancelLoader ?
                            <button className='px-28 mt-4 font-montSemiBold py-2  mb-10 rounded' style={stateStoreSettings ? { background: stateStoreSettings?.secondary_color, color: stateStoreSettings?.navbar_color } : { background: 'black', color: 'white' }} onClick={() => handleCancelReason()}>Cancel</button> : <Spin style={{ marginTop: '20px', marginBottom: '20px' }} />}

                    </div>
                </div> :
                    <div className='px-10'>
                        <p className='font-montSemiBold py-2 h-44 text-center mt-12  justify-center'>Order can’t be canceled after confirmation, please reach out to <span style={{ color: stateStoreSettings ? stateStoreSettings?.secondary_color : 'red' }}>{storeDetails?.primary_phone}</span></p>


                    </div>}

                {/* } */}
            </Modal>


            <ToastContainer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        stateStoreSettings: state.storeSettingsReducer.data,
        storeDetails: state.storeDetailsReducer?.data,
        stateCustomerDetails: state.customerDetailsReducer?.data

    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchCancelOrder: (orderId, payload, setMsg) => dispatch(cancelOrderAction(orderId, payload, setMsg)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index))