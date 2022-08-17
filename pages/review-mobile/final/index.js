import { CloseOutlined, WalletFilled } from '@ant-design/icons'
import { Spin, Radio, Space, Checkbox, message } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import ReviewMobile from '..'
import { addToCart, adjustQty, fetchBackendCart, fetchPurchaseDetails, getWalletInfoAction, paymentMethodAction, removeFromCart } from '../../../actions'
import Billing from '../../../components/Billing'
import Coupon from '../../../components/Coupon'
import ReviewTracker from '../../../components/ReviewTracker'
import { convenienceFlag } from '../../../services/apiServices'
import Head from 'next/head';
import PageWrapper from '../../../components/PageWrapper/PageWrapper'

const Index = ({ storeSettings, addToCart, removeFromCart, adjustQty, cart, checkout, fetchBackendCart, fetchPurchaseDetails, customerDetails, stateWallet, dispatchWalletInfo, statePaymentMethod, storeDetails }) => {

    const [state, setState] = useState(checkout.backendCart?.purchase_id)



    const [useWallet, setUseWallet] = useState(false)

    const router = useRouter()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })
    const [validCoupon, setValidCoupon] = useState(false)
    const [minProduct, setMinProduct] = useState()      

    const [minQtyMsg, setMinQtyMsg] = useState(false)


    

    console.log('wallet review-mo final',router)

    useEffect(() => {
        if (!isTabletOrMobile) {
            router.push('/review')


        }
        const payload = {
            customerId: customerDetails?.data?.customer_id
            , storeId: 'storeId',
        }
        dispatchWalletInfo({ payload })

        console.log('walllele', stateWallet)

    }, [isTabletOrMobile])

    const walletChange = () => {

        setUseWallet(!useWallet)
    }


    useEffect(() => {
        // if (userDetails.data?.customer_id && storeDetails?.group_id && cart.length != 0) {
        if (customerDetails?.data?.customer_id && cart.length != 0) {
            const data = readyCartData(cart)

            if (cart.length != 0) {
                if (checkout.backendCart?.purchase_id || state) {
                    fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', checkout.backendCart?.purchase_id, data)

                }
                else {
                    fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', undefined, data)

                }
            }
        }
        else {
            router.push('/shop')
        }


        // }
    }, [cart])



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


                        message.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`)
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


                        message.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`)
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


                    message.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.inventory_quantity}`)
                    // setMinQtyMsg(true)
                    setMinProduct(item.item_name)


                }
                else {
                    adjustQty(item.item_id, qty)
                    setMinQtyMsg(false)

                }
            }else{
                
                if (filter[0].qty <= item.inventoryDetails?.min_order_quantity) {


                    message.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.min_order_quantity}`)
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

    const handleChange = () => {

    }


   
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
                        message.error(`Sorry, You Cannot add more than ${quantity} items`)


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
                        message.error(`Sorry, You Cannot add more than ${quantity} items`)


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
                message.error('Sorry, You Cannot add more items')
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
                        message.error(`Sorry, You Cannot add more than ${quantity} items`)


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
                        message.error(`Sorry, You Cannot add more than ${quantity} items`)


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
                message.error('Sorry, You cannot add more items')
            }
        }

    }



console.log('wallet review final',router.query.wallet)

    return (
        <>
            {/* <Head>
        <title>{storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
      </Head> */}
            <ReviewTracker storeSettings={storeSettings} addPaymentMethod={true} reviewOrder={false} orderPlaced={false} />
           
            {checkout.backendCart?.purchase_id != undefined ?
                <>
            <div className='bg-[#F6F6F6]  lg:h-full md:h-full flex flex-col lg:flex-row md:flex-row items-start lg:-mt-4 md:-mt-4 lg:p-2 md:p-2'>
                <div className='mt-24 lg:mt-4 md:mt-4 flex flex-col items-start justify-between  lg:ml-24 lg:mr-24 md:ml-24 md:mr-24 w-full lg:w-[50vw] border-b-2 border-slate-[200] cursor-pointer '>

                    {/* <div className='bg-white h-32 flex items-center p-8 mb-1 w-full'>
                    <Radio.Group onChange={handleChange} value={value}>
                        <Radio className='font-montSemiBold' value='COD'>Cash on Delivery</Radio>
                    </Radio.Group>
                </div> */}



                    <p className='hidden lg:block md:block font-montSemiBold mt-8 text-[#212B36]'>Review Order</p>

                 
                <div className='flex flex-col bg-white w-full justify-between items-start mt-4 lg:mt-0'>

                    {
                        cart.map((item, idx) =>
                            <div className='flex items-start text-left w-full border-b-2 border-slate-300  lg:pl-8 p-3 md:pl-8 lg:pt-3 md:pt-3' key={idx}>
                                <img src={item.primary_img ? item.primary_img : 'https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png'} className='w-28 min-w-28 max-w-28 h-40'  onClick={()=>{router.push(`/product/${item.item_id}`)}}/>
                                <div className='flex flex-col items-start w-full ml-3 lg:ml-24 md:ml-24'>
                                    <p className='text-lg font-montSemiBold'>{item.item_name}</p>
                                    {item.defaultVariantItem ? <p className='text-sm font-montMedium -mt-5'>
                                                <span className='text-gray-500'>Color:</span> {item.defaultVariantItem ? item.defaultVariantItem.variant_value_1?.variant_value_name : ''},
                                                <span className='text-gray-500'>Size:</span> {item.defaultVariantItem ? item.defaultVariantItem.variant_value_2?.variant_value_name : ''}
                                                <span className='text-black-500'> {item.defaultVariantItem.variant_value_3?.variant_value_name ? ', Design No' : ''}</span> {item.defaultVariantItem ? item.defaultVariantItem.variant_value_3?.variant_value_name : 'No Design No'}</p> : ''}
                                    
                                    <p className='text-lg font-montSemiBold -mt-4'>{storeDetails?.currency_symbol} {item.defaultVariantItem ? item.defaultVariantItem.sale_price :  item.sale_price}</p>

                                    {/* {checkout.backendCart?.purchase_id != undefined ? */}
                                        <div className='flex justify-between items-center gap-6' >
                                            <div className='border border-gray-400 space-x-4 flex items-center' style={{ backgroundColor: "white", color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, borderColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}` }}>
                                                <span onClick={() => handleDecreaseQuantity(item, item.qty - 1)} className={`px-4 py-2 text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}` ,opacity:'0.2', borderColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}` }}>-</span>
                                                <span>{item.qty}</span>
                                                <span onClick={() =>  { handleIncreaseQuantity(item) }}className={`px-4 py-2 text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`,opacity:'0.2', borderColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}` }}>+</span>
                                            </div>
                                            {/* <div onClick={() => removeFromCart(item.item_id)} className='text-red-500 font-montMedium cursor-pointer'>Remove</div> */}
                                        </div> 
                                        {/* :
                                        <div className=' w-1/3 flex items-center justify-center'>
                                            <Spin />
                                        </div>} */}
                                </div>
                                <CloseOutlined className='p-4' onClick={() => removeFromCart(item.defaultVariantItem ? item.defaultVariantItem.variant_item_id : item.item_id)} />
                            </div>

                        )}
                </div>

            </div>

            

            <div className='mt-16 w-96'>
                <Coupon storeSettings={storeSettings} />
                <Billing className='' billingDetails={checkout.purchaseDetails?.data} checkout={checkout.backendCart?.purchase_id} review={true} wallet={router.query.wallet=='true'?true:false} walletAmount={stateWallet?.customer_wallet_balance} paymentMethod={statePaymentMethod} final={true}/>
            </div>
          
                




            </div>
            </>
            :
            <div className=' h-screen w-full flex items-center justify-center'>
                <Spin />
            </div>}
        </>
    )
}


const mapStateToProps = (state) => ({
    storeSettings: state.storeSettingsReducer,
    cart: state.cartReducer.cart,
    checkout: state.checkoutReducer,
    customerDetails: state.customerDetailsReducer,
    stateWallet: state.walletReducer?.data,
    statePaymentMethod: state.paymentMethodReducer?.data,
    storeDetails: state.storeDetailsReducer?.data
})


const mapDispatchToProps = dispatch => {
    return {
        addToCart: (data) => dispatch(addToCart(data)),
        removeFromCart: (itemid) => dispatch(removeFromCart(itemid)),
        adjustQty: (itemid, value) => dispatch(adjustQty(itemid, value)),
        fetchBackendCart: (customerid, groupid, purchaseId, data) => dispatch(fetchBackendCart(customerid, groupid, purchaseId, data)),
        fetchPurchaseDetails: (purchaseid) => dispatch(fetchPurchaseDetails(purchaseid)),
        dispatchWalletInfo: (payload) => dispatch(getWalletInfoAction(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index))