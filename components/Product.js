import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from "next/router";
import { AiFillHeart } from 'react-icons/ai'
import { addToWishlist, deleteFromWishlist } from '../services/apiServices';
import { message } from 'antd';
import { addToCart, adjustQty, fetchItemDetails, getSearchItemsAction, getWishlistItems, removeFromCart, searchItems } from '../actions';
import LoginModal from './LoginModal/LoginModal';
import { SyncOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import HeartIcon from './svgComponents/HeartIcon';
import { useRef } from "react"
import { toast, ToastContainer } from 'react-toastify';

export const Product = (props) => {

    const router = useRouter()
    const [wishlistId, setWishlistId] = useState(props.wishlistId)
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 })
    // const [addToWishlist, setAddToWishlist] = useState()

    const [noMoreWishlist, setNoMoreWishlist] = useState()
    const [page, setPage] = useState(2)
    const [minQtyMsg, setMinQtyMsg] = useState(false)
    const [minProduct, setMinProduct] = useState()
    const ref = useRef(null);

    const [visible, setVisible] = useState(false)
    const showModal = () => {
        console.log('asdasdhelloy')
        setVisible(true);
    }


    useEffect(() => {
        import("@lottiefiles/lottie-player");
    }, []);



    console.log('wishlistId', props.wishlistId, props.customerId, wishlistId)

    // useEffect(() => {
    //     const { wishlistId } = props
    //     console.log('initialState?.data?.wishlistId', props?.wishlistId)
    //     if (props.wishlistId) {
    //         setWishlistId(wishlistId)
    //     }

    // }, [props.wishlistId == undefined])



    // const handleWishlist = async (itemId, wishlists) => {


    //     console.log('props.stateWishlistItems,', props.stateWishlistItems)

    //     const filteredItems = props.stateWishlistItems?.filter((wish, i) => {
    //         if (wish.item_id == itemId) {

    //             return wish
    //         }
    //     });

    //     console.log('filtered Items', filteredItems)


    //     if (filteredItems?.length == 0 || filteredItems == undefined) {
    //         const response = await addToWishlist('storeId', props.customerId, itemId)
    //         if (response.data) {
    //             document.getElementById(itemId).style.color = "red"
    //             document.getElementById(`m+${itemId}`).style.color = "red"
    //             message.success('Added to Wishlist')

    //             const payload = {
    //                 customerId: props?.customerId, storeId: props.storeDetails.store_id, page: 1, wishlist: props.wishlist, setWishlist: props.setWishlist, setPage: setPage, page: page, setNoMoreWishlist
    //             }
    //             props.dispatchWishlist({ payload })

    //         }
    //         else {

    //         }
    //     } else {

    //         const response = await deleteFromWishlist(filteredItems[0]?.entry_id)
    //         document.getElementById(itemId).style.color = "black"
    //         document.getElementById(`m+${itemId}`).style.color = "black"
    //         message.success('Removed from wishlist')
    //         if (response.data) {

    //             const payload = {
    //                 customerId: props?.customerId, storeId: props.storeDetails.store_id, page: 1, wishlist: props.wishlist, setWishlist: props.setWishlist, setPage: setPage, page: page, setNoMoreWishlist
    //             }
    //             props.dispatchWishlist({ payload })
    //         }
    //     }




    //     // props.dispatchWishlist


    // }


    const [loadingWishlist, setLoadingWishlist] = useState(false)

    const handleWishlist = async (itemId) => {



        setLoadingWishlist(true)


        console.log('stateW', wishlistId)

        if (!wishlistId || wishlistId == null) {
            const response = await addToWishlist('storeId', props.customerId, itemId)
            if (response.data) {

                // message.success('Added to Wishlist')

                // toast("Added to Wishlist");

                toast.success('Added to Wishlist', {
                    position: "bottom-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log('response', response.data)

                // setHeartIcon(true)
                setWishlistId(response.data)
                setLoadingWishlist(false)
            }

        }
        else {
            const response = await deleteFromWishlist(wishlistId)

            // message.success('Removed from wishlist')

            toast.success('Removed From Wishlist', {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setWishlistId('')
            setLoadingWishlist(false)
            // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);

        }





    }







    const removeFromWishlist = (primaryKey) => {


        console.log('primaryKey', primaryKey)

        const payload = { primaryKey, setState: props.setState, state: props.state, message }
        props.deleteItemFromWishlist({ payload })

    }



    const itemAddToCart = (item) => {

        console.log('item', item)

        let quantity = 0

        if (item.defaultVariantItem) {



            item['defaultVariantItem'] = props.initialState.defaultVariantItem;

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
                props.addToCart(item)
            }
            else {
                // message.error('Sorry, You Cannot add more items')


                toast.error('Sorry, You Cannot add more items', {
                    position: "bottom-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }

            // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
            // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";


        }
        else {

            console.log('itemsms', item)
            if (item.inventoryDetails == null) {

                // props.addToCart(item)
                quantity = 15
                // if(maxmin)
            }
            else if (item.inventoryDetails.inventory_quantity == 0) {
                // message.error('Sorry,The Item is not available at the moment')
                quantity = 0
                console.log('item.inventoryDetails.inventory_quantity == 0', item.inventoryDetails.inventory_quantity == 0)


            }
            else if (item.inventoryDetails.inventory_quantity != 0) {
                console.log('item.inventoryDetails.inventory_quantity != 0', item.inventoryDetails.inventory_quantity != 0)

                if (item.inventoryDetails.inventory_quantity > item.inventoryDetails?.max_order_quantity) {
                    quantity = item.inventoryDetails?.max_order_quantity
                    console.log('item.inventoryDetails.inventory_quantity > item.inventoryDetails?.max_order_quantity', item.inventoryDetails.inventory_quantity > item.inventoryDetails?.max_order_quantity)
                }
                // else {
                //     if (item.inventoryDetails.inventory_quantity < item.inventoryDetails.min_order_quantity) {
                //         // message.error('Sorry,The Item is not available at the moment')
                //         // quantity = 0
                //     }
                else {

                    quantity = item.inventoryDetails?.inventory_quantity
                }
                // }
            }
            if (quantity > 0) {
                props.addToCart(item)
            }
            else {
                // message.error('Sorry, You Cannot add more items')


                toast.error('Sorry, You Cannot add more items', {
                    position: "bottom-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }
            // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
            // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";


        }
    }



    // const handleDecreaseQuantity = (item, qty) => {

    //     const data = readyCartData(cart)
    //     // item.defaultVariantItem ? item.defaultVariantItem : item.item_id

    //     if (item.defaultVariantItem) {

    //         const filter = props.cart.filter((c) => {
    //             if (c.defaultVariantItem.variant_item_id == item.defaultVariantItem.variant_item_id) {
    //                 return c
    //             }
    //         })

    //         // important
    //         if (qty == 0) {
    //             props.removeFromCart(Number(item.variant_item_id))

    //         }
    //         else {
    //             if (item.defaultVariantItem.inventory_details?.inventory_quantity < item.defaultVariantItem.inventory_details?.min_order_quantity) {
    //                 if (filter[0].qty <= item.defaultVariantItem.inventory_details?.inventory_quantity) {


    //                     message.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`)
    //                     // setMinQtyMsg(true)
    //                     setMinProduct(item.item_name)
    //                 }


    //                 else {
    //                     props.adjustQty(item.defaultVariantItem.variant_item_id, qty)
    //                     setMinQtyMsg(false)

    //                 }
    //             }
    //             else {

    //                 if (filter[0].qty <= item.defaultVariantItem.inventory_details?.min_order_quantity) {


    //                     message.error(`Sorry, The Minimum Order Quantity is ${item.defaultVariantItem.inventory_details?.min_order_quantity}`)
    //                     // setMinQtyMsg(true)
    //                     setMinProduct(item.item_name)
    //                 }


    //                 else {
    //                     console.log('qqtty', qty)
    //                     props.adjustQty(item.defaultVariantItem.variant_item_id, qty)
    //                     setMinQtyMsg(false)

    //                 }
    //             }


    //         }


    //     } else {
    //         const filter = props.cart.filter((c) => {
    //             if (c.item_id == item.item_id) {
    //                 return c
    //             }
    //         })

    //         // important
    //         if (qty == 0) {
    //             props.removeFromCart(Number(item.item_id))

    //         }
    //         else {
    //             if (item.inventoryDetails?.inventory_quantity < item.inventoryDetails?.min_order_quantity) {

    //                 if (filter[0].qty <= item.inventoryDetails?.inventory_quantity) {


    //                     message.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.inventory_quantity}`)
    //                     // setMinQtyMsg(true)
    //                     setMinProduct(item.item_name)


    //                 }
    //                 else {
    //                     props.adjustQty(item.item_id, qty)
    //                     setMinQtyMsg(false)

    //                 }
    //             } else {

    //                 if (filter[0].qty <= item.inventoryDetails?.min_order_quantity) {


    //                     message.error(`Sorry, The Minimum Order Quantity is ${item.inventoryDetails?.min_order_quantity}`)
    //                     // setMinQtyMsg(true)
    //                     setMinProduct(item.item_name)


    //                 }
    //                 else {
    //                     props.adjustQty(item.item_id, qty)
    //                     setMinQtyMsg(false)

    //                 }
    //             }
    //         }

    //     }






    //     // if (checkout.backendCart?.purchase_id || state) {
    //     //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', checkout.backendCart?.purchase_id, data)

    //     // }
    //     // else {
    //     //     fetchBackendCart(customerDetails?.data?.customer_id, 'storeDetails.group_id', undefined, data)

    //     // }


    //     // fetchBackendCart('customerDetails.data?.customer_id,', 'storeDetails.group_id', data)
    // }

    // const handleIncreaseQuantity = (item) => {


    //     console.log('itenmmmm', item)

    //     if (item.defaultVariantItem) {

    //         let quantity = 0
    //         const value = item?.defaultVariantItem?.inventory_details

    //         if (value?.inventory_quantity == null) {
    //             if (value?.max_order_quantity == null)
    //                 quantity = 15
    //             else {
    //                 quantity = value.max_order_quantity
    //             }
    //             // if(maxmin)
    //         }
    //         else if (value?.inventory_quantity != null && value?.max_order_quantity == null) {
    //             quantity = value.inventory_quantity
    //             console.log('value?.inventory_quantity != null && value?.max_order_quantity == null',)
    //         }
    //         else if (value?.max_order_quantity > value?.inventory_quantity) {
    //             quantity = value.inventory_quantity
    //             console.log('value?.max_order_quantity > value?.inventory_quantity',)

    //         }
    //         else if (value?.max_order_quantity < value?.inventory_quantity) {

    //             quantity = value.max_order_quantity
    //             console.log('value?.max_order_quantity < value?.inventory_quantity',)
    //         }

    //         if (quantity > 0) {
    //             console.log('cartt', cart)
    //             const filter = props.cart.filter((c) => {
    //                 if (c.defaultVariantItem?.variant_item_id == item.defaultVariantItem.variant_item_id) {
    //                     return c
    //                 }
    //             })
    //             // console.log('fffilter', filter)
    //             // if (filter[0].qty >= quantity) {
    //             //     message.error(`Sorry, You Cannot add more than ${quantity} items`)

    //             //     // props.adjustQty(item.defaultVariantItem.variant_item_id, item.qty)
    //             // }
    //             // else {
    //             //     if (filter[0].qty + 1 >= item.defaultVariantItem.inventory_details?.min_order_quantity) {
    //             //         setMinQtyMsg(false)
    //             //     }
    //             //     props.adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)
    //             // }


    //             if (item.defaultVariantItem.inventory_details?.inventory_quantity < item.defaultVariantItem.inventory_details?.min_order_quantity) {

    //                 if (filter[0].qty < item.item.defaultVariantItem.inventory_details?.inventory_quantity) {
    //                     props.adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)

    //                 }

    //                 if (filter[0].qty >= quantity) {
    //                     message.error(`Sorry, You Cannot add more than ${quantity} items`)


    //                     // adjustQty(item.item_id, item.qty)
    //                 }
    //                 else {
    //                     console.log('filter[0].qty+1', filter[0].qty + 1)
    //                     if (filter[0].qty + 1 >= item.defaultVariantItem.inventory_details?.inventory_quantity) {
    //                         setMinQtyMsg(false)
    //                     }
    //                     props.adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)
    //                 }
    //             }

    //             else {



    //                 if (filter[0].qty < item.defaultVariantItem.inventory_details?.min_order_quantity) {
    //                     props.adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)

    //                 }

    //                 if (filter[0].qty >= quantity) {
    //                     message.error(`Sorry, You Cannot add more than ${quantity} items`)


    //                     // props.adjustQty(item.item_id, item.qty)
    //                 }
    //                 else {
    //                     console.log('filter[0].qty+1', filter[0].qty + 1)
    //                     if (filter[0].qty + 1 >= item.defaultVariantItem.inventory_details?.min_order_quantity) {
    //                         setMinQtyMsg(false)
    //                     }
    //                     props.adjustQty(item.defaultVariantItem.variant_item_id, item.qty + 1)
    //                 }

    //             }



    //         }
    //         else {
    //             message.error('Sorry, You Cannot add more items')
    //         }

    //     }
    //     else {
    //         // item without variant
    //         console.log('item without variant', item)

    //         let quantity = 0
    //         const value = item?.inventoryDetails

    //         console.log('valuee', value)
    //         if (value != null) {

    //             if (value?.inventory_quantity == null) {



    //                 if (value?.max_order_quantity == null)
    //                     quantity = 15
    //                 else {
    //                     quantity = value?.max_order_quantity
    //                 }
    //                 // if(maxmin)
    //             }
    //             else if (value?.inventory_quantity != null && value?.max_order_quantity == null) {
    //                 quantity = value?.inventory_quantity
    //                 console.log('value?.inventory_quantity != null && value?.max_order_quantity == null',)
    //             }
    //             else if (value?.max_order_quantity > value?.inventory_quantity) {
    //                 quantity = value.inventory_quantity
    //                 console.log('value?.max_order_quantity > value?.inventory_quantity',)

    //             }
    //             else if (value?.max_order_quantity < value?.inventory_quantity) {

    //                 quantity = value.max_order_quantity
    //                 console.log('value?.max_order_quantity < value?.inventory_quantity',)
    //             }
    //         } else {
    //             quantity = 15
    //         }

    //         if (quantity > 0) {
    //             console.log('cartt', props.cart)
    //             const filter = props.cart.filter((c) => {
    //                 if (c.item_id == item.item_id) {
    //                     return c
    //                 }
    //             })

    //             // important

    //             if (item.inventoryDetails?.inventory_quantity < item.inventoryDetails?.min_order_quantity) {

    //                 if (filter[0].qty < item.inventoryDetails.inventory_quantity) {
    //                     props.adjustQty(item.item_id, item.qty + 1)

    //                 }

    //                 if (filter[0].qty >= quantity) {
    //                     message.error(`Sorry, You Cannot add more than ${quantity} items`)


    //                     // props.adjustQty(item.item_id, item.qty)
    //                 }
    //                 else {
    //                     console.log('filter[0].qty+1', filter[0].qty + 1)
    //                     if (filter[0].qty + 1 >= item.inventoryDetails?.inventory_quantity) {
    //                         setMinQtyMsg(false)
    //                     }
    //                     props.adjustQty(item.item_id, item.qty + 1)
    //                 }
    //             }

    //             else {



    //                 if (filter[0].qty < item.inventoryDetails?.min_order_quantity) {
    //                     props.adjustQty(item.item_id, item.qty + 1)

    //                 }

    //                 if (filter[0].qty >= quantity) {
    //                     message.error(`Sorry, You Cannot add more than ${quantity} items`)


    //                     // props.adjustQty(item.item_id, item.qty)
    //                 }
    //                 else {
    //                     console.log('filter[0].qty+1', filter[0].qty + 1)
    //                     if (filter[0].qty + 1 >= item.inventoryDetails?.min_order_quantity) {
    //                         setMinQtyMsg(false)
    //                     }
    //                     props.adjustQty(item.item_id, item.qty + 1)
    //                 }
    //             }
    //         }
    //         else {
    //             message.error('Sorry, You cannot add more items')
    //         }
    //     }

    // }

    // const readyCartData = function (arr) {

    //     const key = 'store_id'
    //     return arr.reduce(function (rv, x) {

    //         (rv[x[key]] = rv[x[key]] || []).push({
    //             item_id: x.item_id,
    //             barcode_id: null,
    //             quantity: x.qty,
    //             variant_item_id: x.defaultVariantItem?.variant_item_id | null,
    //         });
    //         return rv;
    //     }, {});
    // };






    const handleDecressQuantity = (itemid, qty) => {
        if (qty == 0) {
            props.removeFromCart(itemid)
        }
        else {
            props.adjustQty(itemid, qty)
        }
    }

    const handleIncreseQuantity = (inventory, itemid, qty) => {
        let quantity = 0
        let value = null
        // console.log("logging when add to cart", initialState.defaultVariantItem)
        if (inventory != null) {
            value = inventory
        }
        // console.log("logging when add to cart 2", value)
        if (value != null) {
            if (value?.inventory_quantity == null) {
                if (value.max_order_quantity == null)
                    quantity = 15
                else {

                    quantity = value.max_order_quantity

                }
                // if(maxmin)
            }
            else if (value?.inventory_quantity != null && value?.max_order_quantity == null) {
                quantity = value.inventory_quantity
            }
            else if (value?.max_order_quantity > value?.inventory_quantity) {
                quantity = value.inventory_quantity
            }
            else if (value?.max_order_quantity < value?.inventory_quantity) {
                quantity = value.max_order_quantity
            }
        } else {
            quantity = 15
        }
        if (qty <= quantity) {
            props.adjustQty(itemid, qty)
        }
        else {
            // message.error('Sorry, You Cannot add more items')


            toast.error('Sorry, You Cannot add more items', {
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }

    const handlePush = () => {
        props.fetchItemDetails('', '')
        props.dispatchSearchItems('')
        router.push(`/product/${props.itemId}`)


    }


    return (

        <>
            {props.grid ?
                <div className={`flex flex-col w-1/2  items-center justify-between ${!props.wishlistPage ? `lg:w-1/3` : `lg:w-1/3`} md:w-11/4  lg:p-2 cursor-pointer  `} >

                    <div className='p-2 lg:flex lg:flex-col h-[50vh] lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px]  border border-blue-100 shadow lg:min-h-[50vh] lg:max-h-[50vh]'>
                        <img src={props.image ? props.image : 'https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png'} className={`h-[184px] min-h-[100px]   md:min-h-[255px] lg:w-[300px]  lg:h-[230px] lg:min-h-[230px] md:h-72 md:w-48 wishlist-img`}
                            onClick={() => {
                                handlePush()

                                // props.dispatchSearchItems('') 
                            }} />


                        <div className='hidden lg:block  absolute ml-64 pt-2 pb-2' style={props.wishlistPage ? { width: '170px' } : { width: '17px' }}>
                            {!loadingWishlist ? <div className='lg:block flex md:flex items-start justify-start ' onClick={() => {

                                !props.wishlistPage ? props.customerId ? !loadingWishlist ? handleWishlist(props.itemId, props.isWishlisted) : '' : showModal() : removeFromWishlist(props.entryId)
                            }}>
                                {props.wishlistPage ?

                                    <AiFillHeart id={`m+${props.itemId}`} className={`text-red-500 text-xl mr-3`} />
                                    :
                                    <HeartIcon fill={wishlistId ? '#FF4141' : '#0000007F'} id={props.itemId} className={`${wishlistId ? 'text-red-500 shadow-2xl' : 'text-[#0000007F] shadow-xl'} text-lg`} />
                                }
                            </div>
                                :
                                !wishlistId ? <div className='-mt-16 -ml-4  flex items-center justify-center'>
                                    <lottie-player
                                        id="firstLottie"
                                        ref={ref}
                                        autoplay
                                        loop
                                        mode="normal"
                                        src="/fireworks.json"
                                        style={{ width: "200px", height: "130px" }}
                                    ></lottie-player>
                                </div> :
                                    <div className='-mt-2 ml-2'>
                                        <SyncOutlined spin />
                                    </div>

                            }
                        </div>




                        {/* Wishlist feature for web  Use it later}
            {/* <div className='hidden wishlist-btn    absolute  pt-2 pb-2' style={props.wishlistPage ? { width: '303px' } : { width: '300px' }}>
                {!loadingWishlist ?
                    <div className='hidden lg:flex md:flex items-center justify-center  ' onClick={() => {

                        !props.wishlistPage ? props.customerId ? handleWishlist(props.itemId) : showModal() : removeFromWishlist(props.entryId)
                    }}>
                        {props.wishlistPage ?

                            <AiFillHeart id={props.itemId} className={`text-red-500 text-xl mr-3`} />
                            :
                            <AiFillHeart id={props.itemId} className={`${wishlistId ? 'text-red-500 shadow-2xl' : 'text-white shadow-2xl'} text-xl ml-60`} />


                        }


                        {/* <button className='capitalize '>{!props.wishlistPage ? 'ADD TO WISHLIST' : 'Remove'}</button> */}
                        {/* </div> */}
                        {/* : */}
                        {/* <div className='w-52 ml-64 -pt-3'>
                        <SyncOutlined spin />
                    </div>} */}
                        {/* </div> */}

                        {/* End of wishlist feature for web */}



                        {/* W ishlist feature for mobile*/}

                        {/* <div className='lg:hidden  absolute pt-2 pb-2' style={props.wishlistPage ? { width: '170px' } : { width: '170px' }}>
                <div className='lg:hidden flex md:flex items-end justify-end ' onClick={() => {

                    !props.wishlistPage ? props.customerId ? !loadingWishlist?handleWishlist(props.itemId, props.isWishlisted):'' : router.push('account/user/login') : removeFromWishlist(props.entryId)
                }}>
                    {props.wishlistPage ?

                        <AiFillHeart id={`m+${props.itemId}`} className={`text-red-500 text-xl mr-3`} />
                        :
                        <AiFillHeart id={`m+${props.itemId}`} className={`${wishlistId ? 'text-red-500' : ''} text-xl mr-3`} />}

                </div>
            </div> */}

                        {/* End of wishlist feature for mobile */}


                        <div className='hidden lg:flex items-start'>
                            {props.isVeg ? <img src="/veg.svg" className=' w-4 h-4 mt-2 mr-2' />
                                : <img src="/non-veg.png" className='w-4 h-4 mt-2 mr-2' />}
                            <p className=' font-montMedium mt-1 ml- text-[16px] lg:text-lg lg:w-72 item-name item-description lg:h-[60px]' onClick={() => { router.push(`/product/${props.itemId}`) }} style={props.wishlistPage ? { width: '240px' } : {}}>{props.name}<span></span></p>
                        </div>

                        <div className='lg:hidden'>
                            <p className='font-montMedium mt-2 text-[14px] h-10  item-name item-description' onClick={() => { router.push(`/product/${props.itemId}`) }} style={props.wishlistPage ? { width: '170px' } : {}}>{props.name}<span></span></p>
                        </div>

                        {/* <p className='hidden font-montRegular text-sm -mt-5 item-description' onClick={() => { router.push(`product/${props.itemId}`) }}>{props.desc}</p> */}
                        <div className='flex justify-between '>
                            <p className='h-12 -mt-3 lg:w-[17vw]  md:w-[13vw] flex  justify-start flex-wrap lg:justify-start md:justify-start text-[16px]  ' onClick={() => { router.push(`/product/${props.itemId}`) }}>
                                <span className='font-montBold '>{props.stateStoreDetails?.currency_symbol} {props.salePrice}</span>
                                <span className='line-through px-1 '>{props.price - props.salePrice != 0 ? `${props.stateStoreDetails?.currency_symbol} ${props.price}` : ''}</span>
                                {/* <span className='text-green-500'>{props.price - props.salePrice != 0 ? `Save ${props.stateStoreDetails?.currency_symbol}${props.price - props.salePrice}` : ''}</span> */}
                            </p>
                            <div className='hidden lg:block font-montSemiBold text-xl text-white -' >
                                {/* <p className='-mt-5 mr-3 rounded shadow border border-red-200 px-3 py-1' style={{ background: `${props.storeSettings.data ? props.storeSettings.data.primary_color : "black"}` }}>+</p>
 */}


                                {props.cart.find(product => product.item_id == props.item.item_id) ?



                                    <div className='mt-2  lg:absolute  border rounded border-red-600 font-montSemiBold h-8  lg:-mt-4 lg:-ml-28 flex items-center space-x-2 bg-white' style={{ backgroundColor: "white", color: `${props.storeSettings.data ? props.storeSettings.data.secondary_color : 'black'}`, borderColor: `${props.storeSettings.data ? props.storeSettings.data.primary_color : 'black'}` }}>
                                        <span onClick={() => handleDecressQuantity(props.item.item_id, props.cart.find(product => product.item_id == props.item.item_id)?.qty - 1)} className={`px-3 text-2xl cursor-pointer`}>-</span>
                                        <span className='text-black font-montMedium text-sm'>{props.cart.find(product => product.item_id == props.item.item_id)?.qty}</span>
                                        <span onClick={() => handleIncreseQuantity(props.item.inventoryDetails, props.item.item_id, props.cart.find(product => product.item_id == props.item.item_id)?.qty + 1)} className='px-3 text-xl cursor-pointer'>+</span>
                                    </div>
                                    :
                                    <p className='-mt-5 mr-3 rounded shadow border border-red-200 px-3 py-1' onClick={() => itemAddToCart(props.item)} style={{ background: `${props.storeSettings.data ? props.storeSettings.data.primary_color : "black"}` }}>+</p>


                                }





                            </div>
                        </div>


                        <div className='lg:hidden  font-montSemiBold text-xl text-white -' >
                                {/* <p className='-mt-5 mr-3 rounded shadow border border-red-200 px-3 py-1' style={{ background: `${props.storeSettings.data ? props.storeSettings.data.primary_color : "black"}` }}>+</p>
 */}


                                {props.cart.find(product => product.item_id == props.item.item_id) ?



                                    <div className='-mt-6 border rounded border-red-600 font-montSemiBold h-10  lg:-mt-4 lg:-ml-28 flex items-center space-x-2 bg-white' style={{ backgroundColor: "white", color: `${props.storeSettings.data ? props.storeSettings.data.secondary_color : 'black'}`, borderColor: `${props.storeSettings.data ? props.storeSettings.data.primary_color : 'black'}` }}>
                                        <span onClick={() => handleDecressQuantity(props.item.item_id, props.cart.find(product => product.item_id == props.item.item_id)?.qty - 1)} className={` text-2xl px-4 cursor-pointer`}>-</span>
                                        <span className='text-black font-montMedium text-sm px-7'>{props.cart.find(product => product.item_id == props.item.item_id)?.qty}</span>
                                        <span onClick={() => handleIncreseQuantity(props.item.inventoryDetails, props.item.item_id, props.cart.find(product => product.item_id == props.item.item_id)?.qty + 1)} className='px-3  text-xl cursor-pointer'>+</span>
                                    </div>
                                    :
                                    <p className='w-[37px] -mt-5 ml-32 rounded shadow border border-red-200 px-3 py-1' onClick={() => itemAddToCart(props.item)} style={{ background: `${props.storeSettings.data ? props.storeSettings.data.primary_color : "black"}` }}>+</p>


                                }





                            </div>



                    </div>
                    <LoginModal visible={visible} setVisible={setVisible} showModal={showModal} />
                </div>

                :
                // List Layout
                <div className={`hidden lg:flex  w-full  ${!props.wishlistPage ? `lg:w-full` : `lg:w-1/3`} md:w-11/4  p-2 cursor-pointer`} >
                    <img src={props.image ? props.image : 'https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png'} className={`h-[184px] min-h-[100px]  lg:min-h-[280px] lg:max-h-[280px] md:min-h-[275px] lg:min-w-[300px] lg:w-[300px]  lg:h-[316px] md:h-72 md:w-48 wishlist-img border border-blue-100 shadow `}
                        onClick={() => {
                            router.push(`/product/${props.itemId}`)

                            // props.dispatchSearchItems('') 
                        }} />





                    {/* W ishlist feature for mobile*/}
                    {/* 
        <div className='lg:hidden  absolute pt-2 pb-2' style={props.wishlistPage ? { width: '170px' } : { width: '170px' }}>
            <div className='lg:hidden flex md:flex items-end justify-end ' onClick={() => {

                !props.wishlistPage ? props.customerId ? !loadingWishlist?handleWishlist(props.itemId, props.isWishlisted):'' : router.push('account/user/login') : removeFromWishlist(props.entryId)
            }}>
                {props.wishlistPage ?

                    <AiFillHeart id={`m+${props.itemId}`} className={`text-red-500 text-xl mr-3`} />
                    :
                    <AiFillHeart id={`m+${props.itemId}`} className={`${wishlistId ? 'text-red-500' : ''} text-xl mr-3`} />}

            </div>
        </div> */}

                    {/* End of wishlist feature for mobile */}


                    <div className='flex-col px-12'>
                        <div className='hidden lg:block'>
                            <p className='font-montMedium mt-2 text-[16px] lg:text-lg lg:w-auto ' onClick={() => { router.push(`/product/${props.itemId}`) }} style={props.wishlistPage ? {} : {}}>{props.name}<span></span></p>
                        </div>

                        <div className='lg:hidden'>
                            <p className='font-montSemiBold mt-2 text-[16px] lg:text-lg lg:w-72 item-name item-description' onClick={() => { router.push(`/product/${props.itemId}`) }} style={props.wishlistPage ? { width: '170px' } : {}}>{props.name}<span></span></p>
                        </div>

                        <p className={`leading-loose font-montMedium text-sm -mt-5 w-auto ${props.wishlistPage ? 'item-description' : 'item-description-list'}`} onClick={() => { router.push(`product/${props.itemId}`) }}>{props.desc}</p>
                        <p className='-mt-3 leading-loose lg:w-[17vw] md:w-[13vw] flex justify-start flex-wrap lg:justify-start md:justify-start text-[16px]  ' onClick={() => { router.push(`/product/${props.itemId}`) }}>
                            <span className='font-montBold '>{props.stateStoreDetails?.currency_symbol} {props.salePrice}</span>
                            <span className='line-through px-1 '>{props.price - props.salePrice != 0 ? `${props.stateStoreDetails?.currency_symbol} ${props.price}` : ''}</span>
                            <span className='text-green-500'>{props.price - props.salePrice != 0 ? `Save ${props.stateStoreDetails?.currency_symbol}${props.price - props.salePrice}` : ''}</span>
                        </p>

                        <div className='flex justify-start items-center '>

                            <div className=' font-montSemiBold text-xl text-white -' >
                                {/* <p className='-mt-5 mr-3 rounded shadow border border-red-200 px-3 py-1' style={{ background: `${props.storeSettings.data ? props.storeSettings.data.primary_color : "black"}` }}>+</p>
 */}


                                {props.cart.find(product => product.item_id == props.item.item_id) ?



                                    <div className='   border rounded border-red-600   l-mt-5 mr-3 rounded shadow  w-44  mt-4 font-montMedium text-sm flex items-center bg-white h-10' style={{ backgroundColor: "white", color: `${props.storeSettings.data ? props.storeSettings.data.secondary_color : 'black'}`, borderColor: `${props.storeSettings.data ? props.storeSettings.data.primary_color : 'black'}` }}>
                                        <span onClick={() => handleDecressQuantity(props.item.item_id, props.cart.find(product => product.item_id == props.item.item_id)?.qty - 1)} className={`pl-4  text-2xl cursor-pointer`}>-</span>
                                        <span className='text-black font-montMedium text-sm px-12'>{props.cart.find(product => product.item_id == props.item.item_id)?.qty}</span>
                                        <span onClick={() => handleIncreseQuantity(props.item.inventoryDetails, props.item.item_id, props.cart.find(product => product.item_id == props.item.item_id)?.qty + 1)} className='pl-4 pr-4 text-xl cursor-pointer'>+</span>
                                    </div>
                                    :
                                    <p className={`-mt-5 mr-3 rounded shadow border border-red-200 ${props.wishlistPage ? 'px-6 py-2 w-44' : "px-10 py-2 "}  mt-4 font-montMedium text-sm`} onClick={() => itemAddToCart(props.item)} style={{ background: `${props.storeSettings.data ? props.storeSettings.data.primary_color : "black"}` }}>ADD TO CART</p>


                                }





                            </div>

                            {/* Wishlist feature for web */}
                            <div className='hidden wishlist-btn   pt-2 pb-2' style={props.wishlistPage ? { width: '303px' } : { width: '' }}>
                                {!loadingWishlist ?
                                    <div className='hidden lg:flex md:flex items-center justify-center ml-16 ' onClick={() => {

                                        !props.wishlistPage ? props.customerId ? handleWishlist(props.itemId) : showModal() : removeFromWishlist(props.entryId)
                                    }}>
                                        {props.wishlistPage ?

                                            // <AiFillHeart id={props.itemId} className={`text-red-500 text-xl mr-3`} />
                                            <HeartIcon fill={'red'} id={props.itemId} className={`text-red-500 text-xl mr-3 shadow-xl text-lg`} />
                                            :
                                            <HeartIcon fill={wishlistId ? '#FF4141' : '#0000007F'} id={props.itemId} className={`${wishlistId ? 'text-red-500 shadow-2xl' : 'text-[#0000007F] shadow-xl'} text-lg`} />
                                        }
                                        <button className='capitalize font-montMedium text-[#0000007F]'>{!props.wishlistPage ? wishlistId ? 'Added to wishlist' : 'Add to wishlist' : 'Added to wishlist'}</button>
                                    </div>
                                    :
                                    <div className='w-52  ml-20 -pt-3'>
                                        {/* <SyncOutlined spin /> */}


                                        {!wishlistId ? <div className='-mt-24 -ml-36 flex items-center justify-center'>
                                            <lottie-player
                                                id="firstLottie"
                                                ref={ref}
                                                autoplay
                                                loop
                                                mode="normal"
                                                src="/fireworks.json"
                                                style={{ width: "200px", height: "130px" }}
                                            ></lottie-player>
                                        </div> :
                                            <div className='ml-16'>
                                                <SyncOutlined spin />
                                            </div>
                                        }
                                    </div>}
                            </div>

                            {/* End of wishlist feature for web */}

                        </div>



                    </div>
                    <LoginModal visible={visible} setVisible={setVisible} showModal={showModal} />
                </div>


            }
            <ToastContainer />

        </>
    )
}

const mapStateToProps = state => {
    return {

        storeSettings: state.storeSettingsReducer,
        initialState: state.itemDetailsReducer,
        cart: state.cartReducer.cart,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSearchItems: (query) => dispatch(searchItems(query)),
        addToCart: (data) => dispatch(addToCart(data)),
        adjustQty: (itemid, value) => dispatch(adjustQty(itemid, value)),
        removeFromCart: (itemid) => dispatch(removeFromCart(itemid)),
        fetchItemDetails: (customerId, itemId) => dispatch(fetchItemDetails(customerId, itemId)),
        // getWishlistItems: (payload) => dispatch(getWishlistItems(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)