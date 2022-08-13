import { CloseOutlined, SyncOutlined, WalletFilled } from '@ant-design/icons'
import { Spin, Radio, Space, Checkbox, message, Modal } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { addToCart, adjustQty, fetchBackendCart, fetchPurchaseDetails, getStoreDisplaySettings, getWalletInfoAction, removeFromCart } from '../../actions'
import Billing from '../../components/Billing'
import Coupon from '../../components/Coupon'
import { convenienceFlag } from '../../services/apiServices'
import Head from 'next/head';
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import ReviewTracker from '../../components/ReviewTracker'
import StoreStatus from '../../components/svgComponents/StoreStatus'
import { toast, ToastContainer } from 'react-toastify'


const Index = ({ storeSettings, addToCart, removeFromCart, adjustQty, cart, checkout, fetchBackendCart, fetchPurchaseDetails, customerDetails, stateWallet, dispatchWalletInfo, storeDetails, storeDisplaySettings,dispatchStoreDisplaySettings }) => {

    const [state, setState] = useState(checkout.backendCart?.purchase_id)

    const [paymentMethod, setPaymentMethod] = useState()

    const [useWallet, setUseWallet] = useState(false)

    const router = useRouter()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })

    const [enableBulkAPI, setEnableBulkAPI] = useState(true)
    const [validCoupon, setValidCoupon] = useState(false)
    const [paymentAdded, setPaymentAdded] = useState(false)

    const [storeClosed, setStoreClosed] = useState(false)
    const [payReview, setPayReview] = useState(true)

    const [minQtyMsg, setMinQtyMsg] = useState(false)
    const [minProduct, setMinProduct] = useState()



    useEffect(() => {
        cart.map(item => {
            console.log('mappingitem', item, item.inventoryDetails?.min_order_quantity > item.qty)
            if (item.defaultVariantItem) {

                if (item?.defaultVariantItem.inventory_details?.min_order_quantity > item?.defaultVariantItem?.inventory_details?.inventory_quantity) {
                    if (item.defaultVariantItem?.inventory_details?.inventory_quantity > item.qty) {
                        setMinQtyMsg(true)
                        setMinProduct(item.item_name)
                        console.log('mapping')
                    }

                } else {
                    if (item.defaultVariantItem?.inventory_details?.min_order_quantity > item.qty) {
                        setMinQtyMsg(true)
                        setMinProduct(item.item_name)
                        console.log('mapping')
                    }
                }
            }
            else {
                if (item?.inventoryDetails?.min_order_quantity > item?.inventoryDetails?.inventory_quantity) {
                    if (item?.inventoryDetails?.inventory_quantity > item.qty) {
                        setMinQtyMsg(true)
                        setMinProduct(item.item_name)
                        console.log('mapping')
                    }
                }
                else {
                    if (item?.inventoryDetails?.min_order_quantity > item.qty) {
                        setMinQtyMsg(true)
                        setMinProduct(item.item_name)
                        console.log('mapping')
                    }
                }
                // else {
                // setMinQtyMsg(false)
                // }
            }
        })
    }, [cart])




    const handlePaymentChange = async (e) => {


        if (e.target.value == 'COD') {
            if (storeDisplaySettings?.data?.is_cod_accepted == 'Y') {
                setPaymentMethod(e.target.value)
                const response = await convenienceFlag(checkout.backendCart?.purchase_id, e.target.value == 'COD' ? 'N' : 'Y')
                if (response) {
                    setPaymentAdded(true)
                    fetchPurchaseDetails(checkout.backendCart?.purchase_id)
                }
            }
            else {
                // setStoreClosed(true)
            }
        }
        else if (e.target.value == 'ONL') {
            if (storeDisplaySettings?.data?.is_payment_accepted == 'Y') {
                setPaymentMethod(e.target.value)
                const response = await convenienceFlag(checkout.backendCart?.purchase_id, e.target.value == 'COD' ? 'N' : 'Y')
                if (response) {
                    setPaymentAdded(true)
                    fetchPurchaseDetails(checkout.backendCart?.purchase_id)
                }
            }
            else {
                // setStoreClosed(true)
            }
        }


        setUseWallet(false)



    }

    useEffect(() => {
        if (isTabletOrMobile) {
            router.push('/review-mobile')
        }
        const payload = {
            customerId: customerDetails?.data?.customer_id
            , storeId: 'storeId',
        }
        dispatchWalletInfo({ payload })
        dispatchStoreDisplaySettings(storeDetails?.store_id)

        console.log('walllele', stateWallet)

    }, [isTabletOrMobile])

    const walletChange = async (e) => {

        console.log(e.target.checked)
        if (e.target.checked) {
            setPaymentMethod('ONL')
            setUseWallet(true)
            if (paymentMethod == 'COD') {
                const response = await convenienceFlag(checkout.backendCart?.purchase_id, e.target.value == 'COD' ? 'N' : 'Y')
                if (response) {
                    setPaymentAdded(true)

                    fetchPurchaseDetails(checkout.backendCart?.purchase_id)
                }
            }



        }
        else {
            setPaymentMethod(paymentMethod)
            setUseWallet(false)
        }
    }


    // useEffect(() => {
    //     // if (userDetails.data?.customer_id && storeDetails?.group_id && cart.length != 0) {
    //     if (customerDetails?.data?.customer_id && cart.length != 0) {
    //         const data = readyCartData(cart)

    //         if (cart.length != 0) {



    //             if (checkout.backendCart?.purchase_id || state) {
    //                 fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', checkout.backendCart?.purchase_id, data)

    //             }
    //             else {
    //                 fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', undefined, data)

    //             }
    //         }
    //     }
    //     else {
    //         router.push('/shop')
    //     }


    //     // }
    // }, [cart])




    useEffect(() => {
        if (customerDetails.data?.customer_id && cart.length != 0) {
            const data = readyCartData(cart)
            // setDatas(data)
            if (data && cart.length != 0) {


                console.log('carttt', cart)


                // if(!validCoupon){


                fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', checkout.backendCart?.purchase_id, data)
                setEnableBulkAPI(false)

                // }
                // else{
                //     state && fetchPurchaseDetails(checkout.backendCart?.purchase_id)
                // }


            }
        }
        else {
            router.push('/shop')
        }



    }, [cart, customerDetails])

    useEffect(() => {
        if (checkout.backendCart?.purchase_id && !enableBulkAPI) {

            fetchPurchaseDetails(checkout.backendCart?.purchase_id)
        }

    }, [validCoupon])



    const handleDecreaseQuantity = (item, qty) => {

        const data = readyCartData(cart)
        item.defaultVariantItem ? item.defaultVariantItem : item.item_id

        if (item.defaultVariantItem) {

            const filter = cart.filter((c) => {
                if (c.defaultVariantItem.variant_item_id == item.defaultVariantItem.variant_item_id) {
                    return c
                }
            })

            // important
            if (qty == 0) {
                removeFromCart(Number(item.variant_item_id))

            }
            else {
                if (item.defaultVariantItem.inventory_details?.inventory_quantity < item.defaultVariantItem.inventory_details?.min_order_quantity) {
                    if (filter[0].qty <= item.defaultVariantItem.inventory_details?.inventory_quantity) {


                        // message.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`)

                        toast.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`, {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });


                        // setMinQtyMsg(true)
                        setMinProduct(item.item_name)
                    }


                    else {
                        adjustQty(item.defaultVariantItem.variant_item_id, qty)
                        setMinQtyMsg(false)

                    }
                }
                else {
                    if (filter[0].qty <= item.defaultVariantItem.inventory_details?.min_order_quantity) {


                        // message.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`)

                        toast.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`, {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        // setMinQtyMsg(true)
                        setMinProduct(item.item_name)
                    }


                    else {
                        adjustQty(item.defaultVariantItem.variant_item_id, qty)
                        setMinQtyMsg(false)

                    }
                }


            }


        } else {
            const filter = cart.filter((c) => {
                if (c.item_id == item.item_id) {
                    return c
                }
            })

            // important
            if (qty == 0) {
                removeFromCart(Number(item.item_id))

            }
            else {
                if (item.inventoryDetails?.inventory_quantity < item.inventoryDetails?.min_order_quantity) {

                    if (filter[0].qty <= item.inventoryDetails?.inventory_quantity) {


                        // message.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.inventory_quantity}`)


                        toast.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.inventory_quantity}`, {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        // setMinQtyMsg(true)
                        setMinProduct(item.item_name)


                    }
                    else {
                        adjustQty(item.item_id, qty)
                        setMinQtyMsg(false)

                    }
                } else {

                    if (filter[0].qty <= item.inventoryDetails?.min_order_quantity) {


                        // message.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.min_order_quantity}`)



                        toast.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.min_order_quantity}`, {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        // setMinQtyMsg(true)
                        setMinProduct(item.item_name)


                    }
                    else {
                        adjustQty(item.item_id, qty)
                        setMinQtyMsg(false)

                    }
                }
            }

        }






        // if (checkout.backendCart?.purchase_id || state) {
        //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', checkout.backendCart?.purchase_id, data)

        // }
        // else {
        //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', undefined, data)

        // }


        // fetchBackendCart('customerDetails.data?.customer_id,', 'storeDetails.group_id', data)
    }


    const readyCartData = function (arr) {
        const key = 'store_id'



        return arr.reduce(function (rv, x) {



            (rv[x[key]] = rv[x[key]] || []).push({
                item_id: x.item_id,
                barcode_id: null,
                quantity: x.qty,
                variant_item_id: x.defaultVariantItem?.variant_item_id | null,
            });

            return rv;
        }, {});
    };




    const handleIncreaseQuantity = (item) => {


        console.log('itenmmmm', item)

        if (item.defaultVariantItem) {

            let quantity = 0
            const value = item?.defaultVariantItem?.inventory_details

            if (value?.inventory_quantity == null) {
                if (value?.max_order_quantity == null)
                    quantity = 15
                else {
                    quantity = value.max_order_quantity
                }
                // if(maxmin)
            }
            else if (value?.inventory_quantity != null && value?.max_order_quantity == null) {
                quantity = value.inventory_quantity
                console.log('value?.inventory_quantity != null && value?.max_order_quantity == null',)
            }
            else if (value?.max_order_quantity > value?.inventory_quantity) {
                quantity = value.inventory_quantity
                console.log('value?.max_order_quantity > value?.inventory_quantity',)

            }
            else if (value?.max_order_quantity < value?.inventory_quantity) {

                quantity = value.max_order_quantity
                console.log('value?.max_order_quantity < value?.inventory_quantity',)
            }

            if (quantity > 0) {
                console.log('cartt', cart)
                const filter = cart.filter((c) => {
                    if (c.defaultVariantItem?.variant_item_id == item.defaultVariantItem.variant_item_id) {
                        return c
                    }
                })
                // console.log('fffilter', filter)
                // if (filter[0].qty >= quantity) {
                //     message.error(`Sorry, You Cannot add more than ${quantity} items`)

                //     // adjustQty(item.defaultVariantItem.variant_item_id, item.qty)
                // }
                // else {
                //     if (filter[0].qty + 1 >= item.defaultVariantItem.inventory_details?.min_order_quantity) {
                //         setMinQtyMsg(false)
                //     }
                //     adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)
                // }


                if (item.defaultVariantItem.inventory_details?.inventory_quantity < item.defaultVariantItem.inventory_details?.min_order_quantity) {

                    if (filter[0].qty < item.item.defaultVariantItem.inventory_details?.inventory_quantity) {
                        return item

                    }

                    if (filter[0].qty >= quantity) {
                        // message.error(`Sorry, You Cannot add more than ${quantity} items`)


                        

                        toast.error(`Sorry, You Cannot add more than ${quantity} items`, {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });


                        // adjustQty(item.item_id, item.qty)
                    }
                    else {
                        console.log('filter[0].qty+1', filter[0].qty + 1)
                        if (filter[0].qty + 1 >= item.defaultVariantItem.inventory_details?.inventory_quantity) {
                            setMinQtyMsg(false)
                        }
                        adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)
                    }
                }

                else {



                    if (filter[0].qty < item.defaultVariantItem.inventory_details?.min_order_quantity) {
                        return item

                    }

                    if (filter[0].qty >= quantity) {
                        // message.error(`Sorry, You Cannot add more than ${quantity} items`)


                        toast.error(`Sorry, You Cannot add more than ${quantity} items`, {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });


                        // adjustQty(item.item_id, item.qty)
                    }
                    else {
                        console.log('filter[0].qty+1', filter[0].qty + 1)
                        if (filter[0].qty + 1 >= item.defaultVariantItem.inventory_details?.min_order_quantity) {
                            setMinQtyMsg(false)
                        }
                        adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)
                    }

                }



            }
            else {
                // message.error('Sorry, You Cannot add more items')


                toast.error('Sorry, You Cannot add more items', {
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
        else {
            // item without variant
            console.log('item without variant', item)

            let quantity = 0
            const value = item?.inventoryDetails

            console.log('valuee', value)
            if (value != null) {

                if (value?.inventory_quantity == null) {



                    if (value?.max_order_quantity == null)
                        quantity = 15
                    else {
                        quantity = value?.max_order_quantity
                    }
                    // if(maxmin)
                }
                else if (value?.inventory_quantity != null && value?.max_order_quantity == null) {
                    quantity = value?.inventory_quantity
                    console.log('value?.inventory_quantity != null && value?.max_order_quantity == null',)
                }
                else if (value?.max_order_quantity > value?.inventory_quantity) {
                    quantity = value.inventory_quantity
                    console.log('value?.max_order_quantity > value?.inventory_quantity',)

                }
                else if (value?.max_order_quantity < value?.inventory_quantity) {

                    quantity = value.max_order_quantity
                    console.log('value?.max_order_quantity < value?.inventory_quantity',)
                }
            } else {
                quantity = 15
            }

            if (quantity > 0) {
                console.log('cartt', cart)
                const filter = cart.filter((c) => {
                    if (c.item_id == item.item_id) {
                        return c
                    }
                })

                // important

                if (item.inventoryDetails.inventory_quantity < item.inventoryDetails.min_order_quantity) {

                    if (filter[0].qty < item.inventoryDetails.inventory_quantity) {
                        adjustQty(item.item_id, item.qty + 1)

                    }

                    if (filter[0].qty >= quantity) {
                        // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                        toast.error(`Sorry, You Cannot add more than ${quantity} items`, {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });


                        // adjustQty(item.item_id, item.qty)
                    }
                    else {
                        console.log('filter[0].qty+1', filter[0].qty + 1)
                        if (filter[0].qty + 1 >= item.inventoryDetails?.inventory_quantity) {
                            setMinQtyMsg(false)
                        }
                        adjustQty(item.item_id, item.qty + 1)
                    }
                }

                else {



                    if (filter[0].qty < item.inventoryDetails.min_order_quantity) {
                        adjustQty(item.item_id, item.qty + 1)

                    }

                    if (filter[0].qty >= quantity) {
                        // message.error(`Sorry, You Cannot add more than ${quantity} items`)

                        
                        toast.error(`Sorry, You Cannot add more than ${quantity} items`, {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });


                        // adjustQty(item.item_id, item.qty)
                    }
                    else {
                        console.log('filter[0].qty+1', filter[0].qty + 1)
                        if (filter[0].qty + 1 >= item.inventoryDetails?.min_order_quantity) {
                            setMinQtyMsg(false)
                        }
                        adjustQty(item.item_id, item.qty + 1)
                    }
                }
            }
            else {
                // message.error('Sorry, You cannot add more items')

                     
                toast.error('Sorry, You cannot add more items', {
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

    }



    const handleWalletChange = async (e) => {

        if (storeDisplaySettings?.data?.is_payment_accepted == "Y") {
            stateWallet?.customer_wallet_balance != 0 ? walletChange(e) : ''
            // const response = await convenienceFlag(checkout.backendCart?.purchase_id, e.target.value == 'COD' ? 'N' : 'Y')
            // if (response) {
            //     setPaymentAdded(true)
            // }
        } else {
            // setStoreClosed(true)
        }

    }

    return (
        <>
            {/* <Head>
                <title>{storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
            </Head> */}

            <div className='mt-20 lg:mt-24 lg:flex lg:flex-col  md:-mt-4  bg-[#F6F6F6]  lg:pl-16 md:pl-32 lg:p-8 md:p-8'>
                {/* <div className='hidden lg:block'>
                    <ReviewTracker storeSettings={storeSettings} addPaymentMethod={false} reviewOrder={false} orderPlaced={false} paymentAdded={paymentAdded} useWallet={useWallet} />
                </div> */}


                <div className='bg-[#F6F6F6] lg:h-full lg:min-h-screen md:h-full flex flex-col lg:flex-row md:flex-row items-start md:-mt-4 lg:p-2 md:p-2'>

                    <div className='mt-24 lg:bg-white lg:mt-4 md:mt-4 flex flex-col items-start justify-between  lg:ml- lg:mr-12  w-full lg:w-full border-b-2 border-slate-[200] cursor-pointer '>
                        <p className='hidden lg;block md:block font-montBold pt-6 px-10 text-lg text-[#212B36]'>Choose Payment Method</p>
                        <div className='bg-white   flex items-center px-8 pt-2 w-full'>
                            <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
                                <div className="leading gap-0 ">
                                    <Radio value='ONL' className='font-montSemiBold gap-5' style={{ color: storeDisplaySettings?.data?.is_payment_accepted != 'Y' ? 'gray' : 'black', fontSize: '16px', border: '2px solid #F9F9F9', width: '50vw', padding: '10px', paddingTop: '20px', paddingBottom: '20px' }}>Pay Online {
                                        storeDisplaySettings?.data?.is_cod_accepted != 'Y' && storeDisplaySettings?.data?.is_payment_accepted != 'Y' ? "" :
                                            storeDisplaySettings?.data?.is_payment_accepted != 'Y' ? <span className='text-red-500 px-2'>Not Accepting Online Payments</span> : ''}
                                        <div className=' bg-white flex items-center justify-between pt-5 w-full'>

                                            <div className='-mt-4'>
                                                {/* disabled={stateWallet?.customer_wallet_balance && paymentMethod=='ONL' !=0?false:true} */}
                                                <Checkbox onChange={(e) => {
                                                    handleWalletChange(e)


                                                }} defaultChecked={false} checked={useWallet} style={{ color: storeDisplaySettings?.data?.is_payment_accepted != 'Y' ? 'gray' : 'black' }}><span className=' font-montMedium text-sm' >{stateWallet?.customer_wallet_balance != 0 ? paymentMethod == 'ONL' ? ' Use Wallet Money' : 'Wallet only available for Online Payment' : 'No Wallet Amount'}</span></Checkbox>
                                            </div>
                                            <p className=' font-montMedium flex items-center text-sm'>(Balance <span className='text-green-500 text-sm pl-1'>  {storeDetails?.currency_symbol}{stateWallet?.customer_wallet_balance}</span>)</p>

                                        </div>

                                    </Radio>



                                    <Radio value='COD' style={{ color: storeDisplaySettings?.data?.is_cod_accepted != 'Y' ? 'gray' : 'black', fontSize: '16px', border: '2px solid #F9F9F9', width: '50vw', padding: '10px', paddingTop: '20px', paddingBottom: '20px' }} className={`font-montSemiBold inline text-[16px] gap-5`}>Pay on Delivery {
                                        storeDisplaySettings?.data?.is_cod_accepted != 'Y' && storeDisplaySettings?.data?.is_payment_accepted != 'Y' ? "" :

                                            storeDisplaySettings?.data?.is_cod_accepted != 'Y' ? <span className='text-red-500 text-[16px] px-3'>Not Accepting COD at the Moment</span> : ''}
                                            <p className=' font-montMedium flex items-center text-sm py-4'>(wallet money cant be used for cash on delivery.)</p>
                                            
                                            </Radio>

                                </div>
                            </Radio.Group>


                        </div>
                        {/* <div className='bg-white h-32 flex items-center p-8 mb-1 w-full'>
                    <Radio.Group onChange={handleChange} value={value}>
                        <Radio className='font-montSemiBold' value='COD'>Cash on Delivery</Radio>
                    </Radio.Group>
                </div> */}

                        <div className='lg:hidden bg-white flex items-center justify-between px-8 pt-5 w-full'>

                            <div className='-mt-4'>
                                {/* disabled={stateWallet?.customer_wallet_balance && paymentMethod=='ONL' !=0?false:true} */}
                                <Checkbox onChange={(e) => {
                                    handleWalletChange(e)


                                }} defaultChecked={false} checked={useWallet} style={{ color: storeDisplaySettings?.data?.is_payment_accepted != 'Y' ? 'gray' : 'black' }}><span className=' font-montSemiBold' >{stateWallet?.customer_wallet_balance != 0 ? paymentMethod == 'ONL' ? ' Use Wallet Money' : 'Wallet only available for Online Payment' : 'No Wallet Amount'}</span></Checkbox>
                            </div>
                            <p className=' font-montSemiBold flex items-center'><WalletFilled style={{ color: 'gray', paddingRight: '4px' }} />Balance <span className='text-green-500'>{storeDetails?.currency_symbol} {stateWallet?.customer_wallet_balance}</span></p>

                        </div>
                        <p className='text-red-500 text-[16px] pt-2'>{
                            storeDisplaySettings?.data?.is_cod_accepted != 'Y' && storeDisplaySettings?.data?.is_payment_accepted != 'Y' ? "Not Accepting Any Payments at the Moment" : ""}</p>

                        {/* <p className='hidden lg:block md:block font-montSemiBold mt-8 text-[#212B36]'>Review Order</p> */}

                        <div className='flex flex-col bg-white w-full justify-between items-start'>

                            {
                                cart.map((item, idx) => <></>
                                    // No need of cart list here
                                    // <div className='flex items-start text-left w-full border-b-2 border-slate-300  lg:pl-8 p-3 md:pl-8 lg:pt-3 md:pt-3' key={idx}>
                                    //     <img src={item.primary_img ? item.primary_img : 'https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png'} className='w-28 min-w-28 max-w-28 h-40' />
                                    //     <div className='flex flex-col items-start w-full ml-3 lg:ml-24 md:ml-24'>
                                    //         <p className='text-lg font-montSemiBold'>{item.item_name}</p>

                                    //         {item.defaultVariantItem ? <p className='text-sm font-montMedium -mt-5'>
                                    //             <span className='text-gray-500'>Color:</span> {item.defaultVariantItem ? item.defaultVariantItem.variant_value_1?.variant_value_name : ''},
                                    //             <span className='text-gray-500'>Size:</span> {item.defaultVariantItem ? item.defaultVariantItem.variant_value_2?.variant_value_name : ''}
                                    //             <span className='text-black-500'> {item.defaultVariantItem.variant_value_3?.variant_value_name ? ', Design No' : ''}</span> {item.defaultVariantItem ? item.defaultVariantItem.variant_value_3?.variant_value_name : 'No Design No'}</p> : ''}

                                    //         {/* <p className='text-[#212B3680]'>{item.item_desc}</p> */}
                                    //         <p className='text-lg  flex items-start  font-montSemiBold'>{storeDetails?.currency_symbol} {item.defaultVariantItem ? item.defaultVariantItem.sale_price : item.sale_price}
                                    //             <span className='line-through px-1 text-sm hidden lg:flex mt-1 ml-2'>{item.price - item.sale_price != 0 ? `${storeDetails?.currency_symbol} ${item.price}` : ''}</span>
                                    //             <span className='text-green-500 text-sm hidden lg:flex mt-1 ml-2'>{item.price - item.sale_price != 0 ? `Save ${storeDetails?.currency_symbol}${item.defaultVariantItem ? item.defaultVariantItem.list_price - item.defaultVariantItem.sale_price : item.price - item.sale_price}` : ''}</span>

                                    //         </p>


                                    //         {checkout.backendCart?.purchase_id != undefined ?
                                    //             <div className='flex justify-between items-center gap-6' >
                                    //                 <div className='border border-gray-400 space-x-4 flex items-center' style={{ backgroundColor: "white", color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>
                                    //                     <span onClick={() => handleDecreaseQuantity(item, item.qty - 1)} className={`px-4 py-2 text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, opacity: '0.2', borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>-</span>
                                    //                     <span style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : 'white'}` }}>{item.qty}</span>
                                    //                     <span onClick={() => { handleIncreaseQuantity(item) }}

                                    //                         className={`px-4 py-2 text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, opacity: '0.2', borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>+</span>
                                    //                 </div>
                                    //                 {/* <div onClick={() => removeFromCart(item.item_id)} className='text-red-500 font-montMedium cursor-pointer'>Remove</div> */}
                                    //             </div> :
                                    //             <div className=' w-1/3 flex items-center justify-center'>
                                    //                 <SyncOutlined style={{ fontSize: 24 }} spin />
                                    //             </div>}
                                    //     </div>
                                    //     <CloseOutlined className='p-4' onClick={() => removeFromCart(item.defaultVariantItem ? item.defaultVariantItem.variant_item_id : item.item_id)} />
                                    // </div>

                                )}
                        </div>

                    </div>

                    <Modal title="" visible={storeClosed} onCancel={() => setStoreClosed(false)} footer={null}>


                        <div className='flex flex-col justify-center gap-3'>


                            <StoreStatus secondaryColor={storeSettings.data ? storeSettings.data.secondary_color : 'black'} mobile={false} navbarColor={storeSettings.data ? storeSettings.data.primary_color : 'black'} paymentMethod />
                            <p className='text-base text-center text-sm'>Store is not accepting this payment method at the moment</p>
                        </div>

                    </Modal>

                    <div className='mt-4 w-96 mr-20'>
                        {/* <Coupon storeSettings={storeSettings} validCoupon={validCoupon} billingDetails={checkout.purchaseDetails?.data} setValidCoupon={setValidCoupon} /> */}
                        <Billing className='' billingDetails={checkout.purchaseDetails?.data} checkout={checkout.backendCart?.purchase_id} review={true} wallet={useWallet} walletAmount={stateWallet?.customer_wallet_balance} paymentMethod={paymentMethod} final={false} storeDisplaySettings={storeDisplaySettings} payReview={payReview} />
                    </div>



                </div>
            </div>

         


            <ToastContainer />
        </>
    )
}

const mapStateToProps = (state) => ({
    storeSettings: state.storeSettingsReducer,
    cart: state.cartReducer.cart,
    checkout: state.checkoutReducer,
    customerDetails: state.customerDetailsReducer,
    stateWallet: state.walletReducer?.data,
    storeDetails: state.storeDetailsReducer?.data,
    storeDisplaySettings: state.storeDisplaySettingsReducer
})


const mapDispatchToProps = dispatch => {
    return {
        addToCart: (data) => dispatch(addToCart(data)),
        removeFromCart: (itemid) => dispatch(removeFromCart(itemid)),
        adjustQty: (itemid, value) => dispatch(adjustQty(itemid, value)),
        fetchBackendCart: (customerid, groupid, purchaseId, data) => dispatch(fetchBackendCart(customerid, groupid, purchaseId, data)),
        fetchPurchaseDetails: (purchaseid) => dispatch(fetchPurchaseDetails(purchaseid)),
        dispatchWalletInfo: (payload) => dispatch(getWalletInfoAction(payload)),
        dispatchStoreDisplaySettings: (storeId) => dispatch(getStoreDisplaySettings(storeId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index))