import { message, Skeleton, Spin } from 'antd'
// import { Head } from 'next/document'

import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import { deleteItemFromWishlist, getWishlistItems, removeFromWishlist } from '../../../actions'
import Product from '../../../components/Product'
import Profile from '../../../components/Profile'
import WishlistImage from '../../../components/svgComponents/WishlistImage'
import Link from 'next/link'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRef } from "react"


export const Index = ({ customerDetails, storeDetails, storeSettings, getWishlistItems, deleteItemFromWishlist }) => {

    const [wishlist, setWishlist] = useState([])
    const [noMoreWishlist, setNoMoreWishlist] = useState(true)
    const [page, setPage] = useState(2)
    const [state, setState] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const ref = useRef(null);

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    }, []);



    useEffect(() => {

        const payload = {
            customerId: customerDetails.customer_id, storeId: storeDetails.store_id, page: 1, wishlist, setWishlist, setPage, setNoMoreWishlist, setLoading
        }
        getWishlistItems({ payload })

    }, [state])



    const getMoreProducts = () => {

        const payload = { customerId: customerDetails.customer_id, storeId: storeDetails.store_id, page, wishlist, setWishlist, page, setPage, setNoMoreWishlist }

        getWishlistItems({ payload })
    }

    return (
        <>


            <div className='mt-20 lg:mt-24 md:-mt-4 bg-[#F6F6F6] flex lg:pl-32 md:pl-32 lg:p-8 md:p-8 '>
                {/* <Head>
                <title>{storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
            </Head> */}
                <Profile />
                <div className='flex flex-col lg:w-[62vw] bg-white w-full lg:mr-24 md:mr-24 lg:ml-8  '>
                    {/* {wishlist.length>0 ? <p className='text-lg font-montSemiBold lg:px-32 mt-8'>Wishlist <span className='text-gray-400 font-montRegular'>( {wishlist.length} Items )</span></p> : ''} */}

                    <div className=' pl-4 lg:pl-8 lg:p-3 md:pl-8 md:p-3 flex text-left lg:ml-5 md:ml-5 w-full '>
                        <Link href='/account/user'>
                            <div className='lg:hidden md:hidden'>
                                <ArrowLeftOutlined className='text-black text-lg mr-4 mt-3 lg:mt-0' />
                            </div>
                        </Link>
                        <p className='text-black font-montBold text-xl mt-4 -ml-5'>Wishlist <span className='text-sm text-slate-400'>{ wishlist.length>0?
                        `${wishlist.length} items`:``}</span></p>
                        <p className='lg:hidden text-lg text-black font-montRegular mt-2'>Wishlist</p>
                    </div>

                    {loading ?
                        <>
                            


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
                            </div>
                        </>

                        :
                        wishlist.length > 0 ?
                            <div className='flex flex-col -ml-1 w-[64vw] lg:px-2  md:px-0  '>


                                <InfiniteScroll
                                    dataLength={wishlist?.length}
                                    next={getMoreProducts}
                                    hasMore={noMoreWishlist}
                                    style={{ overflow: 'hidden' }}
                                    loader={
                                        <Skeleton />
                                    }
                                >
                                    <div className='p-2 flex  lg:ml-4 flex-col flex-wrap items-start w-full lg:w-full mb-24 '>
                                        {wishlist.map((item, index) =>
                                            <Product image={item.primary_img} name={item.item_name} desc={item.item_desc} price={item.price} salePrice={item.sale_price} discount={item.price - item.sale_price} key={index} itemId={item.item_id} isWishlisted={item.wishlist} customerId={customerDetails.customer_id} entryId={item.entry_id} wishlistPage='true' stateStoreDetails={storeDetails} deleteItemFromWishlist={deleteItemFromWishlist} setState={setState} state={state} grid={false} item={item} isVeg={item.is_veg=="Y"?true:false} />
                                        )}
                                    </div>

                                </InfiniteScroll>
                            </div> :
                            <div className='flex flex-col items-center justify-center' >
                                {/* <img src="./images/undraw_Wishlist_re_m7tv.png" className='h-96 w-96 ' /> */}
                                <WishlistImage mobile={true} navbarColor={storeSettings.data ? storeSettings.data.primary_color : 'white'} secondaryColor={storeSettings.data ? storeSettings.data.secondary_color : 'white'} />

                                <p className='w-full text-center text-xl font-montSemiBold lg:mb-28' style={{ color: `${storeSettings.data ? storeSettings.data.secondary_color : "black"}` }}>Nothing is added to Wishlist</p>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    customerDetails: state.customerDetailsReducer?.data,
    storeDetails: state.storeDetailsReducer.data,
    storeSettings: state.storeSettingsReducer


})

const mapDispatchToProps = dispatch => {
    return {
        getWishlistItems: (payload) => dispatch(getWishlistItems(payload)),
        deleteItemFromWishlist: (payload) => dispatch(deleteItemFromWishlist(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)