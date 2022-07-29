import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import { getCategoricalItems, getCategoryItemCount, getInitialItems, getSearchItems } from '../services/apiServices'
import Product from './Product'
import Skeleton from './Skeleton'
import { getCategoricalItemCount, getCategoricalItemCountAction, getCategoricalItemsAction, getCategorycalItemsAction, getInitialItemsAction, getSearchItemsAction, getWishlistDetails, getWishlistItems, searchItems } from '../actions'
import SortFilterModal from './SortFilterModal'
import NoSearchFound from './svgComponents/NoSearchFound'
import List from './svgComponents/List'
import Grid from './svgComponents/Grid'

export const ProductList = ({ searchedItem, customerId, dispatchWishlist, stateStoreDetails, stateWishlistItems, dispatchCategoricalItems, dispatchCategoricalItemCount, dispatchSearchItems, dispatchInitialItems, storeSettings, searchItemLocal }) => {

    const [items, setItems] = useState([])
    const [itemCount, setItemCount] = useState()
    const [noMore, setNoMore] = useState(true)
    const [page, setPage] = useState(1)
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterAndSortPayload, setFilterAndSortPayload] = useState({})
    const [sortOrder, setSortOrder] = useState("false")
    const [grid, setGrid] = useState(true)

    const [filterPayLoad, setFilterPayLoad] = useState({})
    const [priceFilter, setPriceFilter] = useState({})

    const router = useRouter()
    const data = router.query



    useEffect(() => {
        if (customerId) {
            const payload = {
                customerId: customerId, storeId: stateStoreDetails.store_id, page: 1, wishlist, setWishlist, setPage, setNoMore
            }

            dispatchWishlist({ payload })
        }
    }, [customerId])


    // items get Updated
    useEffect(() => {

        if (items.length === 0 || items.length % 20 != 0) {
            setNoMore(false)
        }
        else {
            setNoMore(true)
            if (page >= 1) {
                setPage(page + 1)
            }
        }

    }, [items])


    // Category Functionality
    useEffect(() => {
        const func = async () => {
            setLoading(true)
            if (router.isReady) {
                if (data?.category_id) {
                    if (data.category_id == "All Items") {
                        getProducts()



                    }
                    else {
                        const payload = { storeId: 'storeId', categoryId: data.category_id, subCategoryId: data.sub_category_id, page: 1, customerId, setItems, items, setLoading, sortOrder }

                        dispatchCategoricalItems({ payload })



                    }
                    setPage(1)

                }
                else {
                    console.log('router entering heare categoruca')
                    getProducts()
                }
            }
        }
        func()
    }, [router.query, data?.category_id, customerId])



    // Search Functionality
    useEffect(() => {

        const getSearch = async () => {
            setLoading(true)

            if (searchedItem.data != '' && searchedItem.data != undefined && searchedItem.length != 0) {

                const payload = { storeId: 'storeId', searchedItem: searchedItem.data, page: 1, customerId, items, setItems, setLoading, sortOrder }
                if (data?.category_id) {
                    router.push('/shop')
                }
                dispatchSearchItems({ payload })
                setPage(1)


            }
            else {

                if (router.isReady && !data.category_id) {
                    console.log('router search')
                    // getProducts()
                }
            }
        }
        getSearch()
    }, [searchedItem])



    const getProducts = async () => {
        window.scrollTo(0, 0)

        console.log('router is getProducts')
        if (searchedItem.data == '' || searchedItem.data == undefined || searchedItem.length == 0) {

            if (Object.keys(filterAndSortPayload).length != 0 || (filterAndSortPayload?.filter_groups ? Object.keys(filterAndSortPayload.filter_groups).length != 0 : '' || filterAndSortPayload?.priceRange ? Object.keys(filterAndSortPayload.priceRange).length != 0 : '')) {

                const payload = { storeId: stateStoreDetails.store_id, filterAndSortPayload, customerId: customerId, sortOrder, page: page, items, setItems, loading, setLoading }

                dispatchInitialItems({ payload })
            } else {


                const payload = { storeId: stateStoreDetails.store_id, customerId: customerId, page: 1, items, setItems, loading, setLoading }

                dispatchInitialItems({ payload })
            }
        }

    }

    const getMoreProducts = async () => {

        const payload = { storeId: stateStoreDetails.store_id, customerId: customerId, page: page }
        dispatchWishlist(payload)


        // if (searchedItem.data != '' && searchedItem.data != undefined && searchedItem.length != 0) {

        //     const payload = { storeId: 'storeId', searchedItem: searchedItem.data, page, customerId, setLoading }

        //     dispatchSearchItems({ payload })

        // setPage(page + 1)






        // }

        if (searchedItem.data != '' && searchedItem.data != undefined && searchedItem.length != 0) {

            const payload = { storeId: 'storeId', searchedItem: searchedItem.data, page, customerId, items, setItems, setLoading, sortOrder }
            if (data?.category_id) {
                router.push('/shop')
            }
            dispatchSearchItems({ payload })
            setPage(page + 1)


        }
        else if (data?.category_id && data?.category_id != "All Items") {

            if (Object.keys(filterAndSortPayload).length != 0 || (filterAndSortPayload?.filter_groups ? Object.keys(filterAndSortPayload.filter_groups).length != 0 : '' || filterAndSortPayload?.priceRange ? Object.keys(filterAndSortPayload.priceRange).length != 0 : '')) {
                const payload = { storeId: 'storeId', categoryId: data.category_id, sortOrder, subCategoryId: data.sub_category_id, page: page, customerId, setItems, items }

                dispatchCategoricalItems({ payload })
            }

            else {
                // console.log('filterAndSortPayload',filterAndSortPayload,Object.keys(filterAndSortPayload.filter_groups).length)
                const payload = { storeId: 'storeId', categoryId: data.category_id, sortOrder, subCategoryId: data.sub_category_id, page: page, customerId, setItems, items }
                dispatchCategoricalItems({ payload })
            }
        }
        else {

            if (Object.keys(filterAndSortPayload).length != 0 || (filterAndSortPayload?.filter_groups ? Object.keys(filterAndSortPayload.filter_groups).length != 0 : '' || filterAndSortPayload?.priceRange ? Object.keys(filterAndSortPayload.priceRange).length != 0 : '')) {
                const payload = { storeId: stateStoreDetails.store_id, filterAndSortPayload, customerId: customerId, sortOrder, page: page, items, setItems, loading, setLoading }

                dispatchInitialItems({ payload })
            }

            else {

                const payload = { storeId: stateStoreDetails.store_id, customerId: customerId, page: page, items, setItems }
                dispatchInitialItems({ payload })
            }
        }



    }


    const handleSortOrder = (e) => {
        setSortOrder(e.target.value)
        setLoading(true)
        setFilterAndSortPayload({ filter_groups: filterPayLoad, priceRange: priceFilter })

    }

    useEffect(() => {
        // getShopProducts({ storeId, filterAndSortPayload, sortOrder, user })

        if (Object.keys(filterAndSortPayload).length != 0) {


            if (data?.category_id && data?.category_id != "All Items") {
                const payload = { storeId: 'storeId', categoryId: data.category_id, sortOrder, subCategoryId: data.sub_category_id, page: 1, customerId, setItems, items, setLoading }
                dispatchCategoricalItems({ payload })
            } else {
                const payload = { storeId: stateStoreDetails.store_id, filterAndSortPayload, customerId: customerId, sortOrder, page: 1, items, setItems, loading, setLoading }
                dispatchInitialItems({ payload })
            }


            console.log('router filter ands ort ', filterAndSortPayload)

        }

    }, [filterAndSortPayload])


    console.log('searchedItem.length', searchedItem)


    const handleLayout = (layout) => {
        if (layout == 'grid')
            setGrid(true)
        else {
            setGrid(false)
        }
    }

    console.log('data.sub_category_name ,', data.sub_category_name)

    return (
        <>


            {!loading && items?.length == 0 ?
                <div className='flex flex-col mt-24 lg:ml-80'>
                    <div className='flex'>
                        <p className='hidden w- lg:flex lg:-mt-12 px-6 text-lg font-montSemiBold'>{Object.keys(data).length != 0 && data.constructor === Object ? data?.category_id != 'All Items' ? data.sub_category_name != 'undefined' ? data.sub_category_name : data.category_name : 'All Items' : 'All Items'}</p>

                    </div>

                    <div className='flex flex-col  lg:-mt-40 mt-16 items-center justify-center w-full lg:h-screen'>

                        <div className='hidden lg:block lg:h-24  w-full lg:ml-96 lg:-mt-4 '>
                            <NoSearchFound mobile={false} secondaryColor={storeSettings?.data?.primary_color ? storeSettings?.data?.secondary_color : "black"}
                                navbarColor={storeSettings?.data?.navbar_color ? storeSettings?.data?.primary_color : "white"} />
                        </div>

                        <div className='lg:hidden  '>
                            <NoSearchFound mobile={true} secondaryColor={storeSettings?.data?.primary_color ? storeSettings?.data?.secondary_color : "black"}
                                navbarColor={storeSettings?.data?.navbar_color ? storeSettings?.data?.primary_color : "white"} />
                        </div>

                        <p className='text-lg font-montSemiBold lg:pt-44' style={{ color: `${storeSettings?.data?.primary_color ? storeSettings?.data?.secondary_color : "black"}` }}>No Items Found</p>

                        {/* <img src="./images/undraw_Location_search_re_ttoj.png" className='lg:h-72 ' /> */}




                    </div>

                </div>
                // <p className="lg:w-full h-screen flex items-center justify-center lg:-mt-24 text-center font-montRegular lg:text-lg">No Items Found <span style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, color: 'white', padding: '8px', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }} onClick={() => { 
                //     searchItemLocal('')
                //     router.push({
                //         pathname:'/shop',
                //         // query:{enable:true}
                //     }) 
                // }}>Show All products</span></p>
                :
                <>

                    {loading ?
                        <div className='lg:ml-80'>
                            <Skeleton grid={grid} />
                        </div>
                        :
                        <div className='flex flex-col border-t-2 border-slate-200 shadow lg:mt-8  lg:ml-80  md:pl-0'>
                            <div className='flex items-center justify-between lg:mt-   lg:w-full'>
                                <p className='hidden lg:flex  px-10 pt-3 text-lg font-montSemiBold'>{Object.keys(data).length != 0 && data.constructor === Object ? data?.category_id != 'All Items' ? data.sub_category_name != undefined ? data.sub_category_name : data.category_name : 'All Items' : searchedItem.data != '' && searchedItem.data != undefined && searchedItem.length != 0 ? <p className=''><i className='text-[#0000007F] font-montMedium '>Showing results for</i> <span style={{ color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}  >{searchedItem.data}</span></p> : 'All Items'}</p>




                                <div className='hidden  right-4 lg:pl-0 lg:flex  lg:justify-end w-1/2 '>

                                    <div className={`px-2 h-4  cursor-pointer`} onClick={() => { handleLayout('list') }}  >
                                        <List secondaryColor={storeSettings?.data?.secondary_color ? storeSettings?.data?.secondary_color : "black"} grid={grid} />
                                    </div>
                                    <div className={`px-2 h-4 pr-20 cursor-pointer`} onClick={() => { handleLayout('grid') }} >
                                        <Grid secondaryColor={storeSettings?.data?.secondary_color ? storeSettings?.data?.secondary_color : "black"} grid={grid} />
                                    </div>

                                </div>

                            </div>



                            <InfiniteScroll
                                dataLength={items?.length}
                                next={getMoreProducts}
                                hasMore={noMore}
                                loader={
                                    <Skeleton grid={grid} />
                                }
                            >

                                {grid ? 
                                <div className='p-2 flex flex-wrap items-start w-full lg:w-[75vw] md:w-[65vw]  mb-24 '>
                                    {items.map((item, index) => {
                                        return (
                                            <>
                                                {item.item_status == 'AVAILABLE' ?
                                                    <>
                                                        {console.log('item.defaultVariantItem?.variant_value_1?.variant_value_images?.img_url_1', item.defaultVariantItem?.variant_value_1?.variant_value_images != undefined ? JSON.parse(item.defaultVariantItem?.variant_value_1?.variant_value_images).img_url_1 : '')}

                                                        <Product image={item.primary_img !== '' || null ? item.primary_img : item.defaultVariantItem?.variant_value_1?.variant_value_images != undefined ? JSON.parse(item.defaultVariantItem?.variant_value_1?.variant_value_images).img_url_1 : ''} name={item.item_name} desc={item.item_desc} price={item.price} salePrice={item.sale_price} discount={item.price - item.sale_price} key={index} itemId={item.item_id} isWishlisted={item.wishlist} wishlistId={item.wishlistId} customerId={customerId} dispatchWishlist={dispatchWishlist} wishlistPage={false} stateStoreDetails={stateStoreDetails} wishlist={wishlist} setWishlist={setWishlist} stateWishlistItems={stateWishlistItems} setNoMore={setNoMore} grid={grid} item={item} isVeg={item.is_veg=="Y"?true:false}/>
                                                    </> :
                                                    ''


                                                }
                                            </>
                                        )
                                    }
                                    )}
                                </div>

                                    :
                                    <div className='p-2 flex flex-col items-start w-full lg:w-[75vw] md:w-[65vw]  mb-24 '>
                                        {items.map((item, index) => {
                                            return (
                                                <>
                                                    {item.item_status == 'AVAILABLE' ?
                                                        <>
                                                            {console.log('item.defaultVariantItem?.variant_value_1?.variant_value_images?.img_url_1', item.defaultVariantItem?.variant_value_1?.variant_value_images != undefined ? JSON.parse(item.defaultVariantItem?.variant_value_1?.variant_value_images).img_url_1 : '')}

                                                            <Product image={item.primary_img !== '' || null ? item.primary_img : item.defaultVariantItem?.variant_value_1?.variant_value_images != undefined ? JSON.parse(item.defaultVariantItem?.variant_value_1?.variant_value_images).img_url_1 : ''} name={item.item_name} desc={item.item_desc} price={item.price} salePrice={item.sale_price} discount={item.price - item.sale_price} key={index} itemId={item.item_id} isWishlisted={item.wishlist} wishlistId={item.wishlistId} customerId={customerId} dispatchWishlist={dispatchWishlist} wishlistPage={false} stateStoreDetails={stateStoreDetails} wishlist={wishlist} setWishlist={setWishlist} stateWishlistItems={stateWishlistItems} setNoMore={setNoMore} grid={grid} item={item} isVeg={item.is_veg=="Y"?true:false}/>
                                                        </> :
                                                        ''}
                                                </>
                                            )
                                        }
                                        )}
                                    </div>
                                }





                            </InfiniteScroll>






                        </div>

                    }
                    <div className='absolute right-4 -mt-9 lg:left-4 lg:pl-0 lg:flex lg:mt-0 lg:ml-24 '>
                        <SortFilterModal filterAndSortPayload={filterAndSortPayload}
                            setFilterAndSortPayload={setFilterAndSortPayload} sortOrder={sortOrder} serSortOrder={setSortOrder} handleSortOrder={handleSortOrder} storeSettings={storeSettings} setLoading={setLoading} filterPayLoad={filterPayLoad} setFilterPayLoad={setFilterPayLoad} priceFilter={priceFilter} setPriceFilter={setPriceFilter}/>
                    </div>
                </>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        searchedItem: state.searchItemsReducer,
        stateStoreDetails: state.storeDetailsReducer.data,
        stateWishlistItems: state.wishlistDetailsReducer?.data,
        storeSettings: state.storeSettingsReducer


    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchWishlist: (payload) => dispatch(getWishlistItems(payload)),
        dispatchCategoricalItems: (payload) => dispatch(getCategoricalItemsAction(payload)),
        dispatchCategoricalItemCount: (payload) => dispatch(getCategoricalItemCountAction(payload)),
        dispatchSearchItems: (payload) => dispatch(getSearchItemsAction(payload)),
        dispatchInitialItems: (payload) => dispatch(getInitialItemsAction(payload)),
        searchItemLocal: (payload) => dispatch(searchItems(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)