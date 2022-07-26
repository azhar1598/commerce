import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from "next/router";
import { AiFillHeart } from 'react-icons/ai'
import { addToWishlist, deleteFromWishlist } from '../services/apiServices';
import { message } from 'antd';
import { getSearchItemsAction, getWishlistItems, searchItems } from '../actions';
import LoginModal from './LoginModal/LoginModal';
import { SyncOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

export const Product = (props) => {

    const router = useRouter()
    const [wishlistId, setWishlistId] = useState(props.wishlistId)
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 })
    // const [addToWishlist, setAddToWishlist] = useState()

    const [noMoreWishlist, setNoMoreWishlist] = useState()
    const [page, setPage] = useState(2)

    const [visible, setVisible] = useState(false)
    const showModal = () => {
        console.log('asdasdhelloy')
        setVisible(true);
    }


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

                message.success('Added to Wishlist')
                console.log('response', response.data)

                // setHeartIcon(true)
                setWishlistId(response.data)
                setLoadingWishlist(false)
            }

        }
        else {
            const response = await deleteFromWishlist(wishlistId)

            message.success('Removed from wishlist')
            setWishlistId('')
            setLoadingWishlist(false)
            // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);

        }





    }


    

    const itemAddToCart = (item) => {

        let quantity = 0

        if (initialState.defaultVariantItem) {



            item['defaultVariantItem'] = initialState.defaultVariantItem;

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
                addToCart(item)
            }
            else {
                message.error('Sorry, You Cannot add more items')
            }

            // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
            // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";


        }
        else {

            console.log('itemsms', item)
            if (item.inventoryDetails == null) {

                // addToCart(item)
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
                addToCart(item)
            }
            else {
                message.error('Sorry, sYou Cannot add more items')
            }
            // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
            // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";


        }
    }

    const handleDecreaseQuantity = (itemid, qty) => {

        if (qty == 0) {
            removeFromCart(Number(itemid))
        }
        else {
            adjustQty(itemid, qty)
        }
    }




    const removeFromWishlist = (primaryKey) => {


        console.log('primaryKey', primaryKey)

        const payload = { primaryKey, setState: props.setState, state: props.state, message }
        props.deleteItemFromWishlist({ payload })

    }



    return (

        <>
            {props.grid ?
                <div className={`flex flex-col w-1/2 items-center justify-between ${!props.wishlistPage ? `lg:w-1/3` : `lg:w-1/3`} md:w-11/4  p-2 cursor-pointer  `} >

                    <div className='p-2 lg:flex lg:flex-col  border border-blue-100 shadow min-h-[50vh] max-h-[50vh]'>
                        <img src={props.image ? props.image : 'https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png'} className={`h-[184px] min-h-[100px]   md:min-h-[255px] lg:w-[300px]  lg:h-[230px] lg:min-h-[230px] md:h-72 md:w-48 wishlist-img`}
                            onClick={() => {
                                router.push(`/product/${props.itemId}`)
                                // props.dispatchSearchItems('') 
                            }} />

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


                        <div className='hidden lg:block'>
                            <p className='font-montMedium mt-2 text-[16px] lg:text-lg lg:w-72 item-name item-description lg:h-16' onClick={() => { router.push(`/product/${props.itemId}`) }} style={props.wishlistPage ? { width: '240px' } : {}}>{props.name}<span></span></p>
                        </div>

                        <div className='lg:hidden'>
                            <p className='font-montSemiBold mt-2 text-[16px] lg:text-lg lg:w-72 item-name item-description' onClick={() => { router.push(`/product/${props.itemId}`) }} style={props.wishlistPage ? { width: '170px' } : {}}>{props.name}<span></span></p>
                        </div>

                        {/* <p className='hidden font-montRegular text-sm -mt-5 item-description' onClick={() => { router.push(`product/${props.itemId}`) }}>{props.desc}</p> */}
                        <div className='flex justify-between'>
                            <p className='-mt-3 lg:w-[17vw] md:w-[13vw] flex  justify-start flex-wrap lg:justify-start md:justify-start text-[16px]  ' onClick={() => { router.push(`/product/${props.itemId}`) }}>
                                <span className='font-montBold '>{props.stateStoreDetails?.currency_symbol} {props.salePrice}</span>
                                <span className='line-through px-1 '>{props.price - props.salePrice != 0 ? `${props.stateStoreDetails?.currency_symbol} ${props.price}` : ''}</span>
                                {/* <span className='text-green-500'>{props.price - props.salePrice != 0 ? `Save ${props.stateStoreDetails?.currency_symbol}${props.price - props.salePrice}` : ''}</span> */}
                            </p>
                            <div className=' font-montSemiBold text-xl text-white -' >
                              <p className='-mt-5 mr-3 rounded shadow border border-red-200 px-3 py-1' style={{background: `${props.storeSettings.data ? props.storeSettings.data.primary_color : "black"}` }}>+</p>
                            </div>

                        </div>
                    </div>
                    <LoginModal visible={visible} setVisible={setVisible} showModal={showModal} />
                </div>

                :
                // List Layout
                <div className={`flex  w-full  ${!props.wishlistPage ? `lg:w-full` : `lg:w-1/3`} md:w-11/4  p-2 cursor-pointer`} >
                    <img src={props.image ? props.image : 'https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png'} className={`h-[184px] min-h-[100px]  lg:min-h-[255px] lg:max-h-[255px] md:min-h-[255px] lg:min-w-[300px] lg:w-[300px]  lg:h-[316px] md:h-72 md:w-48 wishlist-img border border-blue-100 shadow `}
                        onClick={() => {
                            router.push(`/product/${props.itemId}`)

                            // props.dispatchSearchItems('') 
                        }} />

                    {/* Wishlist feature for web */}
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
                    {/* </div>
                :
                <div className='w-52 ml-64 -pt-3'>
                    <SyncOutlined spin />
                </div>}
        </div> */}

                    {/* End of wishlist feature for web */}



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
                            <p className='font-montMedium mt-2 text-[16px] lg:text-lg lg:w-auto ' onClick={() => { router.push(`/product/${props.itemId}`) }} style={props.wishlistPage ? { width: '240px' } : {}}>{props.name}<span></span></p>
                        </div>

                        <div className='lg:hidden'>
                            <p className='font-montSemiBold mt-2 text-[16px] lg:text-lg lg:w-72 item-name item-description' onClick={() => { router.push(`/product/${props.itemId}`) }} style={props.wishlistPage ? { width: '170px' } : {}}>{props.name}<span></span></p>
                        </div>

                        <p className='leading-loose font-montMedium text-sm -mt-5 w-auto item-description-list' onClick={() => { router.push(`product/${props.itemId}`) }}>{props.desc}</p>
                        <p className='-mt-3 leading-loose lg:w-[17vw] md:w-[13vw] flex justify-start flex-wrap lg:justify-start md:justify-start text-[16px]  ' onClick={() => { router.push(`/product/${props.itemId}`) }}>
                            <span className='font-montBold '>{props.stateStoreDetails?.currency_symbol} {props.salePrice}</span>
                            <span className='line-through px-1 '>{props.price - props.salePrice != 0 ? `${props.stateStoreDetails?.currency_symbol} ${props.price}` : ''}</span>
                            <span className='text-green-500'>{props.price - props.salePrice != 0 ? `Save ${props.stateStoreDetails?.currency_symbol}${props.price - props.salePrice}` : ''}</span>
                        </p>



                    </div>
                    <LoginModal visible={visible} setVisible={setVisible} showModal={showModal} />
                </div>


            }

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
        // getWishlistItems: (payload) => dispatch(getWishlistItems(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)