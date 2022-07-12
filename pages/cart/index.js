import { CloseOutlined, LoadingOutlined, SyncOutlined } from '@ant-design/icons'
import { message, Spin } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addToCart, adjustQty, fetchBackendCart, fetchPurchaseDetails, getStoreDisplaySettings, removeFromCart } from '../../actions'
import Billing from '../../components/Billing'
import Coupon from '../../components/Coupon'
import { useRouter } from 'next/router'
import EmptyCart from '../../components/svgComponents/EmptyCart'
import Head from 'next/head';
import PageWrapper from '../../components/PageWrapper/PageWrapper'

const Index = ({ storeSettings, addToCart, removeFromCart, adjustQty, cart, checkout, fetchBackendCart, fetchPurchaseDetails, customerDetails, stateStoreDetails, dispatchStoreDisplaySettings }) => {

    const [state, setState] = useState(checkout.backendCart?.purchase_id)
    const [datas, setDatas] = useState([])
    const [validCoupon, setValidCoupon] = useState(false)
    const [loading, setLoading] = useState(false)
    const [enableBulkAPI, setEnableBulkAPI] = useState(true)
    const[purchaseInvalid,setPurchaseInvalid]=useState('')

    const router = useRouter()

    // useEffect(() => {
    // if (customerDetails.data?.customer_id && cart.length != 0) {
    //     const data = readyCartData(cart)
    //     setDatas(data)
    //     if (data && cart.length != 0) {


    //         console.log('carttt',cart)

    // if (checkout.backendCart?.purchase_id || state) {
    if (state) {
        // fetchPurchaseDetails(checkout.backendCart?.purchase_id)
    }
    // }
    // else {
    //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', checkout.backendCart?.purchase_id, data, checkout)
    // }
    //     }
    // }
    // deliveryAddress()


    // }, [cart, datas.length == 0, customerDetails,validCoupon==true])



    useEffect(() => {
        if (customerDetails.data?.customer_id && cart.length != 0) {
            const data = readyCartData(cart)
            setDatas(data)
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
        deliveryAddress()


    }, [cart, customerDetails])

    useEffect(() => {
        if (checkout.backendCart?.purchase_id && !enableBulkAPI) {

            fetchPurchaseDetails(checkout.backendCart?.purchase_id, setLoading)
        }

    }, [validCoupon])

    useEffect(() => {

        console.log('!checkout.purchaseDetails.data.isPurchaseValid),', !checkout.purchaseDetails?.data.isPurchaseValid)

        if (checkout.backendCart?.purchase_id && !checkout.purchaseDetails?.data.isPurchaseValid) {


            Object.keys(checkout.purchaseDetails.data.orders).map(c => {

                // console.log('checkout .', c)
                console.log('checkout.purchaseDetails.data.orders[c]', checkout.purchaseDetails.data.orders[c].isOrderValid ,checkout.purchaseDetails.data.orders[c].orderItems)
                if (!checkout.purchaseDetails.data.orders[c].isOrderValid) {
console.log('checkout.pur',checkout.purchaseDetails.data.orders[c].isOrderValid == 'false')
                    Object.keys(checkout.purchaseDetails.data.orders[c].orderItems).map(a => {
                        if (!checkout.purchaseDetails.data.orders[c].orderItems[a].isOrderItemValid) {

                        
                        console.log('checkout.purchaseDetails.data.orders[c]', checkout.purchaseDetails.data.orders[c].orderItems[a].isOrderItemValid)
                        setPurchaseInvalid(`Please remove ${checkout.purchaseDetails.data.orders[c].orderItems[a].itemName}.Currently,it is out of stock`)
                        message.error(`Please remove ${checkout.purchaseDetails.data.orders[c].orderItems[a].itemName}.Currently,it is out of stock`)
                        }
                    })
                }
            }

            )



        }else{
            setPurchaseInvalid('')
        }

    }, [checkout.purchaseDetails])




    const deliveryAddress = async () => { }


    const handleDecreaseQuantity = (itemid, qty) => {

        const data = readyCartData(cart)

        if (qty == 0) {
            removeFromCart(Number(itemid))

        }
        else {
            adjustQty(itemid, qty)

        }




        // if (checkout.backendCart?.purchase_id || state) {
        //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', checkout.backendCart?.purchase_id, data)

        // }
        // else {
        //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', undefined, data)

        // }


        // fetchBackendCart('customerDetails.data?.customer_id,', 'storeDetails.group_id', data)
    }

    useEffect(() => {
        dispatchStoreDisplaySettings(stateStoreDetails?.store_id)
    }, [])

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
                console.log('fffilter', filter)
                if (filter[0].qty >= quantity) {
                    message.error(`Sorry, You Cannot add more than ${quantity} items`)

                    adjustQty(item.defaultVariantItem.variant_item_id, item.qty)
                }
                else {
                    adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)
                }
            }
            else {
                message.error('Sorry, You Cannot add more items')
            }

        }
        else {
            // item without variant


            let quantity = 0
            const value = item?.inventory_details

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

                if (filter[0].qty >= quantity) {
                    message.error(`Sorry, You Cannot add more than ${quantity} items`)

                    adjustQty(item.item_id, item.qty)
                }
                else {
                    adjustQty(item.item_id, item.qty + 1)
                }
            }
            else {
                message.error('Sorry, You Cannot add more items')
            }




        }

    }

    console.log('Object.keys(checkout.backendCart).length!=0', Object.keys(checkout), Object.keys(checkout).length, Object.keys(checkout).length == 0)



    return (


        <>
            {/* <Head>
                <title>{stateStoreDetails ? stateStoreDetails?.store_name : 'Apparel Store'}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href={stateStoreDetails ? stateStoreDetails?.logo_img_url : 'favicon.ico'} />
            </Head> */}

            {cart.length != 0 ?
                <div className='lg:bg-[#F6F6F6] lg:mt-24 md:-mt-4 lg:h-full md:h-screen flex flex-col lg:flex-row md:flex-row items-start lg:p-2 md:p-2 lg:min-h-screen'>

                    <div className='mt-24 lg:mt-4 md:mt-4 flex flex-col items-start justify-between  lg:ml-24 lg:mr-24 md:ml-24 md:mr-24 w-full lg:w-[50vw] border-b-2 border-slate-[200] cursor-pointer mb-24 lg:mb-0'>
                        <p className='hidden lg:block md:block font-montSemiBold text-lg '>Shopping Bag <span className='text-gray-500 font-montRegular '>({cart.length} {cart.length > 1 ? 'items' : 'item'})</span></p>
                        <div className='flex flex-col bg-white w-full justify-between items-start'>

                            {
                                cart.map((item, idx) =>
                                    <div className='flex items-start text-left w-full border-b-2 border-slate-300  lg:pl-8 p-3 md:pl-8 lg:pt-3 md:pt-3' key={idx}>
                                        <img src={item?.primary_img ? item?.primary_img : 'https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png'} className='w-28 min-w-28 max-w-28 h-40' onClick={() => { router.push(`/product/${item.item_id}`) }} />
                                        <div className='flex flex-col items-start w-full ml-3 lg:ml-24 md:ml-24' >
                                            <p className='text-lg font-montSemiBold ' onClick={() => { router.push(`/product/${item.item_id}`) }}>{item.item_name}</p>
                                            {item.defaultVariantItem ? <p className='text-sm font-montSemiBold -mt-4'>
                                                <span className='text-gray-500'>Color:</span> {item.defaultVariantItem ? item.defaultVariantItem.variant_value_1?.variant_value_name : ''},
                                                <span className='text-gray-500'>Size:</span> {item.defaultVariantItem ? item.defaultVariantItem.variant_value_2?.variant_value_name : ''}
                                                <span className='text-black-500'> {item.defaultVariantItem.variant_value_3?.variant_value_name ? ', Design No' : ''}</span> {item.defaultVariantItem ? item.defaultVariantItem.variant_value_3?.variant_value_name : 'No Design No'}</p> : ''}
                                            <p className='text-[#212B3680] hidden'>{item.item_desc}</p>
                                            <p className='text-lg font-montSemiBold flex items-start -mt-3'>{stateStoreDetails?.currency_symbol} {item.defaultVariantItem ? item.defaultVariantItem.sale_price : item.sale_price}

                                                <span className='line-through px-1 text-sm hidden lg:flex mt-1 ml-2'>{item.price - item.sale_price != 0 ? `${stateStoreDetails?.currency_symbol} ${item.price}` : ''}</span>
                                                <span className='text-green-500 text-sm hidden lg:flex mt-1 ml-2'>{item.price - item.sale_price != 0 ? `Save ${stateStoreDetails?.currency_symbol}${item.defaultVariantItem ? item.defaultVariantItem.list_price - item.defaultVariantItem.sale_price : item.price - item.sale_price}` : ''}</span>
                                            </p>
                                            {checkout.backendCart?.purchase_id != undefined || Object.keys(checkout).length == 0 ?
                                                <div className='flex justify-between items-center gap-6' >
                                                    <div className='border border-gray-400 space-x-6 flex items-center' style={{ backgroundColor: "white", color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>
                                                        <span onClick={() => handleDecreaseQuantity(item.defaultVariantItem ? item.defaultVariantItem.variant_item_id : item.item_id, item.qty - 1)} className={`px-4 py-2 text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, opacity: '0.2', borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>-</span>
                                                        <span style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : 'white'}`, }}>{item.qty}</span>

                                                        <span onClick={() => { handleIncreaseQuantity(item) }}

                                                            className={`px-4 py-2 text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, opacity: '0.2', borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>+</span>
                                                    </div>
                                                    {/* <div onClick={() => removeFromCart(item.defaultVariantItem ? item.defaultVariantItem.variant_item_id : item.item_id)} className='text-red-500 font-montMedium cursor-pointer'>Remove</div> */}

                                                </div>
                                                :
                                                <div className=' w-1/3 flex items-center justify-center'>

                                                    <SyncOutlined style={{ fontSize: 24 }} spin />
                                                </div>}

                                        </div>
                                        <CloseOutlined className='p-4' onClick={() => removeFromCart(item.defaultVariantItem ? item.defaultVariantItem.variant_item_id : item.item_id)} />
                                    </div>

                                )}
                        </div>
                    </div>
                    <div className=' lg:block md:block mt-16  lg:ml-16 w-96'>
                        <Coupon storeSettings={storeSettings} validCoupon={validCoupon} orderId={checkout.purchaseDetails?.data} setValidCoupon={setValidCoupon} purchaseInvalid={purchaseInvalid} billingDetails={checkout.purchaseDetails?.data}/>
                        <Billing className='' billingDetails={checkout.purchaseDetails?.data} checkout={checkout.backendCart?.purchase_id} review={false} shippingAdded={false} purchaseLoading={loading} purchaseInvalid={purchaseInvalid} />
                    </div>

                </div> :
                <div className='flex flex-col lg:mt-24 items-center justify-center p-24 '>

                    {/* <img src="./images/undraw_empty_cart_co35.png" className='lg:h-80' /> */}
                    <div className='hidden lg:block mb-8'>
                        <EmptyCart mobile={false} navbarColor={storeSettings.data ? storeSettings.data.primary_color : 'white'} secondaryColor={storeSettings.data ? storeSettings.data.secondary_color : 'white'} />
                    </div>
                    <div className='lg:hidden'>
                        <EmptyCart mobile={true} navbarColor={storeSettings.data ? storeSettings.data.primary_color : 'white'} secondaryColor={storeSettings.data ? storeSettings.data.secondary_color : 'white'} />
                    </div>

                    <p className='text-xl font-montSemiBold' style={{ color: storeSettings.data ? storeSettings.data.secondary_color : 'black' }}>Your Cart is Empty</p>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    storeSettings: state.storeSettingsReducer,
    cart: state.cartReducer.cart,
    checkout: state.checkoutReducer,
    customerDetails: state.customerDetailsReducer,
    stateStoreDetails: state.storeDetailsReducer.data
})


const mapDispatchToProps = dispatch => {
    return {
        addToCart: (data) => dispatch(addToCart(data)),
        removeFromCart: (itemid) => dispatch(removeFromCart(itemid)),
        adjustQty: (itemid, value) => dispatch(adjustQty(itemid, value)),
        fetchBackendCart: (customerid, groupid, purchaseId, data) => dispatch(fetchBackendCart(customerid, groupid, purchaseId, data)),
        fetchPurchaseDetails: (purchaseid, setLoading) => dispatch(fetchPurchaseDetails(purchaseid, setLoading)),
        dispatchStoreDisplaySettings: (storeId) => dispatch(getStoreDisplaySettings(storeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index))
