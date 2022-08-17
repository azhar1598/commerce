
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";

import { connect } from 'react-redux'
import { fetchItemDetails, fetchVariants, fetchSpecification, fetchAdditionalInfo, fetchRelatedItems, addToCart, adjustQty, removeFromCart, getStoreDetails, getStoreId, setVariantImages, setDefaultItem, getWishlistItems } from "../../actions";
import { Image, message, Rate, Spin, Tooltip, Space, Carousel } from 'antd';
import Link from 'next/link'
import ReactPlayer from 'react-player'
import { useMediaQuery } from 'react-responsive'
// import ReactImageMagnify from 'react-image-magnify';
import { HeartOutlined, ArrowLeftOutlined, HeartFilled, Loading3QuartersOutlined, LoadingOutlined, SyncOutlined, MinusOutlined, PlusOutlined, } from '@ant-design/icons'


import { addToWishlist, deleteFromWishlist, getVariantByItemId } from '../../services/apiServices';
import Magnify from '../../components/Magnify';
import LoginModal from '../../components/LoginModal/LoginModal';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { useRef } from "react"
import { toast, ToastContainer } from 'react-toastify';



const Index = ({ removeFromCart, initialState, fetchItemDetails, fetchVariants, fetchSpecification, fetchAdditionalInfo, fetchRelatedItems, addToCart, cart, adjustQty, storeSettings, getStoreId, getStoreDetails, storeDetails, setVariantImages, setDefaultItem, stateCustomerDetails, stateWishlistItems, dispatchWishlist }) => {



    const router = useRouter();
    const { id } = router.query;

    const [loadingWishlist, setLoadingWishlist] = useState(false)
    // const [page, setPage] = useState(2)
    const [minQtyMsg, setMinQtyMsg] = useState(false)

    const ref = useRef(null);

    const [active, setActive] = useState(0)
    const [highlightDefault, setHighLightDefault] = useState([])
    const [selectedVariantStyle, setSelectedVariantStyle] = useState([])
    const [keepVariants, setKeepVariants] = useState([])
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 })
    const [loadingVariants, setLoadingVariants] = useState(false);
    const [wishlist, setWishlist] = useState([])
    const [heartIcon, setHeartIcon] = useState(initialState?.data?.wishlist)
    const [visible, setVisible] = useState(false)
    const [wishlistId, setWishlistId] = useState()

    
    const [rgbaBackground, setRgbaBackground] = useState('')
    const [primaryBackground, setPrimaryBackground] = useState('')

    const [rgbaColor, setRgbaColor] = useState()


    
    useEffect(() => {

        setRgbaBackground(hex2rgba(storeSettings.data ? storeSettings.data.secondary_color : '#ffffff', 0.2))
        setRgbaColor(hex2rgba(storeSettings.data ? storeSettings.data.navbar_color : '#000000', 1))

    }, [rgbaBackground == ''])

    const hex2rgba = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgba(${r},${g},${b},${alpha})`;
    };


    // 75:5  Error: React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render This is because you made it like this     const [wishlistId, setWishlistId] = useState(initialState?.data?.wishlist), rather this is the solution const [wishlistId, setWishlistId] = useState()





    useEffect(() => {
        const condition = () => {
            if (id) {
                fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);
                fetchVariants(id);
                fetchSpecification(id);
                fetchAdditionalInfo(id);
                fetchRelatedItems(id)
                getStoreDetails(router.query.storeId);
            }
        }
        condition()
    }, [id])

    
    useEffect(() => {
        import("@lottiefiles/lottie-player");
      },[]);

    // useEffect(() => {

    // }, [initialState?.defaultVariantItem, initialState.data])








    useEffect(() => {



        const selectedItem = cart.find(function (item) {

            console.log('selected cart item', item, item.defaultVariantItem != null && item.defaultVariantItem?.variant_item_id == initialState.defaultVariantItem?.variant_item_id, item.item_id == initialState.data?.item_id)

            if (item.defaultVariantItem != null && item.defaultVariantItem.variant_item_id == initialState?.defaultVariantItem?.variant_item_id) {


                console.log('selected te def', item)
                return item


            }
            else if (item.item_id == initialState.data?.item_id) {

                console.log('selected te', item)
                return item
            }
        }
        )

        console.log('selected Item', initialState, selectedItem, cart)

        if (selectedItem?.qty < initialState.data?.inventoryDetails?.min_order_quantity || selectedItem?.qty < initialState.defaultVariantItem?.inventoryDetails?.min_order_quantity) {
            console.log('initialState.data', initialState.data)
            setMinQtyMsg(true)
            !isDesktopOrLaptop && 

            
            
            // message.error(`Minimum Quantity is ${initialState.defaultVariantItem ? item.defaultVariantItem?.inventory_details?.min_order_quantity>item.defaultVariantItem?.inventory_details?.inventory_quantity?item.defaultVariantItem?.inventory_details?.inventory_quantity:item.defaultVariantItem?.inventory_details?.min_order_quantity : initialState.data?.inventoryDetails?.min_order_quantity> initialState.data?.inventoryDetails?.inventory_quantity? initialState.data?.inventoryDetails?.inventory_quantity:initialState.data?.inventoryDetails?.min_order_quantity}`)
            //

            
            toast.error(`Minimum Quantity is ${initialState.defaultVariantItem ? item.defaultVariantItem?.inventory_details?.min_order_quantity>item.defaultVariantItem?.inventory_details?.inventory_quantity?item.defaultVariantItem?.inventory_details?.inventory_quantity:item.defaultVariantItem?.inventory_details?.min_order_quantity : initialState.data?.inventoryDetails?.min_order_quantity> initialState.data?.inventoryDetails?.inventory_quantity? initialState.data?.inventoryDetails?.inventory_quantity:initialState.data?.inventoryDetails?.min_order_quantity}`, {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });


        }
        else {
            setMinQtyMsg(false)
        }




    }, [initialState?.defaultVariantItem, initialState.data, cart])

    useEffect(() => {
        if (initialState?.defaultVariantItem) {

            const defaultVar = Object.keys(initialState.defaultVariantItem).map(key => {
                if (key.includes("variant_value")) {
                    return initialState.defaultVariantItem[key]
                }
            }).filter(Boolean)

            const selectedDefaultVariant = defaultVar.map(e => e.variant_value_id)
            setSelectedVariantStyle(selectedDefaultVariant)

        }
    }, [initialState?.defaultVariantItem, initialState.data])





    useEffect(() => {

        if (initialState?.data?.wishlistId) {
            setWishlistId(initialState?.data?.wishlistId)
        }

    }, [initialState?.data?.wishlistId == undefined])



    const colorVariants = ["COLOUR",
        "COLOURS",
        "COLOR",
        "COLORS",
        "SHADE",
        "SHADES",
        "Colr",
        "Color",
        "color"
    ]






    // wishlist not in use states

    const showModal = () => {



        setVisible(true);
    }






    const handleDecreaseQuantity = (itemid, qty) => {

        if (qty == 0) {
            removeFromCart(Number(itemid))
        }
        else {
            adjustQty(itemid, qty)
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
                quantity = value?.inventory_quantity
                console.log('value?.inventory_quantity != null && value?.max_order_quantity == null',)
            }
            else if (value?.max_order_quantity > value?.inventory_quantity) {
                quantity = value?.inventory_quantity
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
                // message.error('Sorry, sYou Cannot add more items')

                


                            
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
            // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
            // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";


        }
    }





    const fetchVariantItemById = async (itemid, variantvalueid) => {
        setLoadingVariants(true)

        const res = await getVariantByItemId(itemid, variantvalueid)
        setLoadingVariants(false)
        return res.data;
    }

    const handleVariantOnChange = async (indices, groupName, imagedata, variantValueId) => {

        selectedVariantStyle[indices - 1] = variantValueId

        let variantvalue = {}
        variantvalue[`variant_value_${indices}`] = variantValueId
        const allVariants = await fetchVariantItemById(id, variantvalue);

        const shouldbeselect = getListedVarants(allVariants, selectedVariantStyle)
        vanishVariants(indices, allVariants)

        if (shouldbeselect) {
            setDefaultItem(shouldbeselect);
        }
        else {
            const defaultOnChange = allVariants[Object.keys(allVariants)[0]]
            if (defaultOnChange) {
                setDefaultItem(defaultOnChange);
            }
        }

        if (!imagedata) {
            return
        }
        else {
            const images = Object.values(imagedata).filter(Boolean)
            setVariantImages(images)
        }

    }

    const vanishVariants = (indices, object) => {
        const keepVariant = initialState.variants.filter(item => item.indices == indices)
        const keep = keepVariant.map(element => element.variant_values)
        // const keep=keepProp.map(item=>item.variant_value_id)
        let result
        if (keepVariants.length) {
            result = keep[0].map(function (item) {
                if (keepVariants.includes(item.variant_value_id)) {
                    return item.variant_value_id
                }
            })
        }
        else {
            result = keep[0].map(a => a.variant_value_id);
        }

        let not_displayable = []
        let finalResult = []
        const giantList = Object.values(object)
        for (let i = 0; i < giantList.length; i++) {
            const x = giantList[i]
            let vari = []
            let flag = 0


            if (x["is_displayable"] == "N") {
                for (let i = 1; i <= 5; i++) {
                    if (x[`variant_value_${i}`]) {
                        // vari.push(x[`variant_value_${i + 1}`])
                        const variantx = x[`variant_value_${i}`]
                        if (variantx?.variant_value_id) {
                            // flag=flag+1
                            not_displayable.indexOf(variantx?.variant_value_id) == -1 ? not_displayable.push(variantx?.variant_value_id) : ""
                        }
                    }
                }
            }


            if (x["is_displayable"] != "N") {
                for (let i = 1; i <= 5; i++) {
                    if (x[`variant_value_${i}`]) {
                        // vari.push(x[`variant_value_${i + 1}`])
                        const variantx = x[`variant_value_${i}`]
                        if (variantx?.variant_value_id) {
                            // flag=flag+1
                            result.indexOf(variantx?.variant_value_id) == -1 ? result.push(variantx?.variant_value_id) : ""
                        }
                    }
                }
            }
        }
        if (not_displayable.length) {
            for (let i = 0; i < not_displayable.length; i++) {
                if (selectedVariantStyle[i] != not_displayable[i]) {
                    finalResult = result.filter(item => item != not_displayable[i])
                }
            }
            setKeepVariants(finalResult)
        }
        else {

            setKeepVariants(result)
        }

    }

    const getListedVarants = (object = {}, list = []) => {
        let variant = {};
        const giantList = Object.values(object)
        for (let i = 0; i < giantList.length; i++) {
            const x = giantList[i]
            let vari = []
            let flag = 0
            if (x.is_displayable == "Y") {
                for (let i = 0; i < list.length; i++) {
                    if (x[`variant_value_${i + 1}`]) {
                        // vari.push(x[`variant_value_${i + 1}`])
                        const variantx = x[`variant_value_${i + 1}`]
                        if (variantx?.variant_value_id == list[i]) {
                            flag = flag + 1
                        }
                    }
                }
            }
            if (flag == list.length) {
                return x
            }
            // variant.push(vari)
        }
        // let result = null
        // variant.forEach(element => {
        //     if (element.some(item => list.includes(item?.variant_value_id))) {
        //         result = element
        //     }
        // });
        // return result
        return null;
    }


    const handleWishlist = async (itemId) => {



        const filteredItems = stateWishlistItems?.data?.filter((wish, i) => {
            if (wish.item_id == itemId) {

                return wish
            }

        });
        setLoadingWishlist(true)


        console.log('stateW', stateWishlistItems, filteredItems, wishlistId)

        if (!wishlistId || wishlistId == undefined) {
            const response = await addToWishlist('storeId', stateCustomerDetails?.data?.customer_id, itemId)
            if (response.data) {

                // message.success('Added to Wishlist')


                


                            
            toast.success('Added to Wishlist', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });


                console.log('response', response.data)

                setHeartIcon(true)
                setWishlistId(response.data)
                setLoadingWishlist(false)
                // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);

            }

        }
        else {
            const response = await deleteFromWishlist(wishlistId)

            // message.success('Removed from wishlist')

                    
            toast.success('Removed from wishlist', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setWishlistId('')
            setHeartIcon(false)
            setLoadingWishlist(false)
            // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);

        }


        // if (filteredItems?.length == 0 || filteredItems==undefined || Object.keys(filteredItems).length === 0 || stateWishlistItems == {}) {
        //     if (response.data) {

        //         message.success('Added to Wishlist')
        //         setHeartIcon(true)
        //         // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);

        //     }

        //     else {

        //     }
        // } else {


        //  
        //     message.success('Removed from wishlist')
        //     setHeartIcon(false)
        //     // fetchItemDetails(stateCustomerDetails?.data?.customer_id, id);
        // }


        // const payload = {
        //     customerId: stateCustomerDetails?.data?.customer_id, page: 1, storeId: storeDetails.store_id, setWishlist, wishlist, setPage: setPage, setNoMoreWishlist: setNoMoreWishlist
        // }



        // dispatchWishlist({ payload })



    }


    const removeFromWishlist = (primaryKey) => {

        const payload = { primaryKey, setState: props.setState, state: props.state, message }


    }




    return (
        initialState && !initialState.loading && !loadingVariants ? <>
            {/* <Head>
                <title>{initialState.data ? initialState.data.item_name : ""} </title>
                <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
                <meta name="description" content={`${initialState.data && initialState.data.item_name + ', ' + initialState.data && initialState.data.item_desc}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
                <meta property="og:description"
                    content={`${initialState.data && initialState.data.item_name + ', ' + initialState.data && initialState.data.item_desc}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
                <meta name="keywords" content={`${initialState.data && initialState.data.item_name + ', ' + initialState.data && initialState.data.item_desc} , Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />
            </Head> */}

            <div className='relative min-h-screen mt-16  lg:min-h-0 lg:mb-28 lg:mt-24'>
                {/* {!isDesktopOrLaptop?<div className='bg-white sticky top-0 shadow-2xl  p-2 h-10'><ArrowLeftOutlined onClick={() => router.push(`/`)} /></div>:""} */}
                <div className='lg:p-10 p-5 bg-white'>
                    {/* product details container */}
                    <div className="grid md:grid-cols-2  lg:mb-24   lg:min-h-0 mt-5 lg:mt-0 lg:pl-24 lg:pr-24">
                        {/* images */}
                        <div>
                            <div className="lg:grid lg:grid-cols-2 ">
                                <div className="lg:col-span-1 lg:order-2 ">
                                    {
                                        isDesktopOrLaptop ?
                                            <div className='w-full h-96' >
                                                {/* <ReactImageMagnify {...{
                                                    smallImage: {
                                                        alt: 'product',
                                                        isFluidWidth: false,
                                                        src: initialState.images ? initialState.images[active] != null ? initialState.images[active] : `https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png` : "",
                                                        width: 300,
                                                        height: 400
                                                    },
                                                    largeImage: {
                                                        src: initialState.images ? initialState.images[active] != null ? initialState.images[active] : `https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png` : "",
                                                        width: 600,
                                                        height: 600
                                                    },
                                                    enlargedImageContainerStyle: { background: '#fff', zIndex: 9 },
                                                    enlargedImageContainerDimensions: {
                                                        width: '200%',
                                                        height: '100%'
                                                    }
                                                }} /> */}

                                                {console.log('initiate.images', initialState, initialState.images, initialState?.defaultVariantItem?.variant_value_1?.variant_value_images)}

                                                {/* <Magnify images={initialState.images}/> */}
                                                <Magnify images={initialState.images?.length != 0 ? initialState.images : Object.values(initialState?.defaultVariantItem?.variant_value_1?.variant_value_images != undefined ? initialState.defaultVariantItem?.variant_value_1?.variant_value_images : '')} />
                                            </div> :
                                            <div className='w-[90vw] bg-red-600'>
                                                <Carousel autoplay>

                                                    {initialState.images?.length != 0 ?
                                                        initialState?.images?.map((key, idx) => {
                                                            console.log('key', key, idx)

                                                            return (<img className='w-[20px] min-h-96 h-[100vh] max-h-96  rounded' key={key} src={key ? key : `https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png`} alt="" />)
                                                        })
                                                        :
                                                        Object.values(initialState?.defaultVariantItem?.variant_value_1?.variant_value_images != undefined ? initialState.defaultVariantItem?.variant_value_1?.variant_value_images : '').map((key, idx) => {
                                                            console.log('key', key, idx)

                                                            return (<img className='w-[20px] min-h-96 h-96 max-h-96 rounded ' key={key} src={key ? key : `https://dsa0i94r8ef09.cloudfront.net/widgets/dummyfood.png`} alt="" />)
                                                        })

                                                    }
                                                </Carousel>
                                            </div>
                                    }

                                </div>
                                {/* <div className='col-span-1 flex lg:flex-col flex-wrap items-center gap-2 mt-2 mb-10 lg:mb-0 lg:mt-0 order-1'>
                                    {
                                        initialState.images ? initialState.images.map((key, idx) => <div key={idx} className='w-16 h-16 lg:w-20 lg:h-20 w border flex items-center justify-center'><img onClick={() => setActive(idx)} className='w-14 h-14 lg:w-16 lg:h-16 hover:scale-105 transition duration-75 rounded' src={key} /></div>) : ""
                                    }
                                </div>*/}

                            </div>
                        </div>
                        {/* product information */}
                        <div className='lg:my-0 my-4'>
                            {/* title */}
                            <h2 className="text-gray-800 text-xl font-montSemiBold flex" >   {initialState.data ? initialState.data.is_veg=="Y"?<img src="/veg.svg" className=' w-4 h-4 mt-2 mr-2'/>
                        :<img src="/non-veg.png" className='w-4 h-4 mt-2 mr-2'/>:''}
                        {initialState.data ? initialState.data.item_name : ""}</h2>


                            {/* price */}
                            <div className='flex lg:flex-col flex-col-reverse'>

                                {/* description */}
                                {
                                    initialState.data && initialState.data.item_desc != 'No description available' ? <p className="pr-4 text-sm font-montRegular">{initialState.data.item_desc}</p> : ""
                                }

                                <div className=" flex items-center">
                                    <p className="text-xl font-montBold mr-5" style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}` }}>{storeDetails?.currency_symbol} {initialState.defaultVariantItem ? initialState.defaultVariantItem.sale_price : initialState.data ? initialState.data.sale_price : ""}</p>

                                    {initialState.defaultVariantItem ?
                                        <p className="line-through text-lg text-gray-500"> {initialState.defaultVariantItem ? initialState.defaultVariantItem.list_price - initialState.data.sale_price != 0 ? `${storeDetails?.currency_symbol} ${initialState.defaultVariantItem.list_price}` : '' : ''} </p>

                                        :
                                        <p className="line-through text-lg text-gray-500">{initialState.data ? initialState.data.price - initialState.data.sale_price != 0 ? `${storeDetails?.currency_symbol} ${initialState.data.price}` : '' : ''} </p>
                                    }
                                </div>


                            </div>

                            {/* Variants */}
                            {initialState.variants ? initialState.variants.map((item, idx) => <div key={idx} className="">
                                <p className="font-montMedium">{item.variant_group_name}</p>
                                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                    {colorVariants.includes(item.variant_group_name) ? item.variant_values.map((variant, idx) => <li key={idx} className="mr-2">
                                        <Tooltip color={'black'} placement="top" title={variant.variant_value_name}>
                                            <div onClick={() => handleVariantOnChange(item.indices, item.variant_group_name, variant.variant_value_images, variant.variant_value_id)} className="inline-block py-3 px-3 text-white rounded border-2 cursor-pointer" style={{ background: `${variant.variant_value_metadata ? variant.variant_value_metadata.color_hexcode : variant.variant_value_name}`, borderColor: `${selectedVariantStyle.includes(variant.variant_value_id) ? storeSettings.data ? storeSettings.data.primary_color : 'black' : ""}`, display: `${keepVariants.length && !keepVariants.includes(variant.variant_value_id) ? "none" : ""}` }}></div>
                                        </Tooltip>
                                    </li>)
                                        :
                                        item.variant_values.map((variant, idx) => <li key={idx} className="mr-2">
                                            <div onClick={() => handleVariantOnChange(item.indices, item.variant_group_name, variant.variant_value_images, variant.variant_value_id)} className="inline-block py-3 px-4 text-gray-500 border-2 border-gray-300 rounded-lg cursor-pointer" style={{ borderColor: `${selectedVariantStyle.includes(variant.variant_value_id) ? storeSettings.data ? storeSettings.data.primary_color : 'black' : ""}`, display: `${keepVariants.length && !keepVariants.includes(variant.variant_value_id) ? "none" : ""}` }}>{variant.variant_value_name}</div>
                                        </li>
                                        )
                                    }
                                </ul>


                            </div>)
                                : ""
                            }
                            {/* 65575 */}


                            {isDesktopOrLaptop ?
                                <div className='flex'>

                                    <div className="flex items-center space-x-5">
                                        {console.log('initialSTtae', initialState)}
                                        {

                                            initialState.defaultVariantItem && initialState.defaultVariantItem.variant_item_status == "UNAVAILABLE" || initialState.defaultVariantItem && initialState.defaultVariantItem.variant_item_status == "CURRENTLY_UNAVAILABLE" || initialState.data && initialState.data.item_status == 'CURRENTLY_UNAVAILABLE' || initialState.data && initialState.data.item_status == 'UNAVAILABLE' ? <div className=" py-2 px-4 border text-sm cursor-not-allowed mt-3 font-montMedium" style={{ backgroundColor: "white", color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, borderColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}` }}>UNAVAILABLE</div>

                                                :

                                                !cart.find(item => initialState.defaultVariantItem ? item.defaultVariantItem?.variant_item_id == initialState.defaultVariantItem.variant_item_id : item.item_id == id) ? <div onClick={() => itemAddToCart(initialState.data)} className="text-lg py-2 px-7 border cursor-pointer mt-3" style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>Add to Cart</div>
                                                    :
                                                    <div className='border space-x-9  flex items-center mt-3' style={{ backgroundColor: "white", color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>
                                                        <span onClick={() => handleDecreaseQuantity(initialState.defaultVariantItem ? initialState.defaultVariantItem.variant_item_id : id, cart.find(function (item) {
                                                            if (initialState.defaultVariantItem) {
                                                                if (item.defaultVariantItem) {
                                                                    if (item.defaultVariantItem.variant_item_id == initialState.defaultVariantItem.variant_item_id) {
                                                                        return item
                                                                    }
                                                                }
                                                            }
                                                            else if (item.item_id == id) {
                                                                return item
                                                            }
                                                        }).qty - 1)} className={`px-3 py-2 text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? rgbaBackground : 'black'}`, color: `${storeSettings.data ? rgbaColor : 'white'}`,  borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}><MinusOutlined/></span>
                                                        <span className={` text-2xl `} style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : 'white'}`, }}>{cart.find(function (item) {
                                                            if (initialState.defaultVariantItem) {
                                                                if (item.defaultVariantItem) {
                                                                    if (item.defaultVariantItem.variant_item_id == initialState.defaultVariantItem.variant_item_id) {
                                                                        return item
                                                                    }
                                                                }
                                                            }
                                                            else if (item.item_id == id) {
                                                                return item
                                                            }


                                                        }).qty}</span>
                                                        <span onClick={() => adjustQty(initialState.defaultVariantItem ? initialState.defaultVariantItem.variant_item_id : id, cart.find(function (item) {
                                                            if (initialState.defaultVariantItem) {
                                                                if (item.defaultVariantItem) {
                                                                    if (item.defaultVariantItem.variant_item_id == initialState.defaultVariantItem.variant_item_id) {
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
                                                                            quantity = value?.inventory_quantity
                                                                            console.log('value?.inventory_quantity != null && value?.max_order_quantity == null',)
                                                                        }
                                                                        else if (value?.max_order_quantity > value?.inventory_quantity) {
                                                                            quantity = value?.inventory_quantity
                                                                            console.log('value?.max_order_quantity > value?.inventory_quantity',)

                                                                        }
                                                                        else if (value?.max_order_quantity < value?.inventory_quantity) {

                                                                            quantity = value.max_order_quantity
                                                                            console.log('value?.max_order_quantity < value?.inventory_quantity',)
                                                                        }

                                                                        if (quantity > 0) {

                                                                            const filter = cart.filter((c) => {
                                                                                if (c.defaultVariantItem?.variant_item_id == item.defaultVariantItem.variant_item_id) {
                                                                                    return c
                                                                                }
                                                                            })

                                                                            // if (filter[0].qty >= quantity) {
                                                                            //     message.error(`Sorry, You Cannot add more than ${quantity} items`)
                                                                            //     item.qty = item.qty - 1
                                                                            //     return item
                                                                            // }
                                                                            // else {
                                                                            //     return item
                                                                            // }



                                                                            if (value?.inventory_quantity < value?.min_order_quantity) {
                                                                                
                                                                                if (filter[0].qty < value?.inventory_quantity) {
                                                                                    return item

                                                                                }

                                                                                else if (filter[0].qty >= quantity) {
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

                                                                                    item.qty = item.qty - 1

                                                                                    return item
                                                                                }
                                                                                else {

                                                                                    return item
                                                                                }
                                                                            }

                                                                            else {
                                                                                if (filter[0].qty < value?.min_order_quantity) {
                                                                                    return item

                                                                                }

                                                                                else if (filter[0].qty >= quantity) {
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
                                                                                    item.qty = item.qty - 1

                                                                                    return item
                                                                                }
                                                                                else {

                                                                                    return item
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
                                                                }
                                                            }
                                                            else {
                                                                if (initialState.data) {
                                                                    let quantity
                                                                    console.log('itemsms', item)
                                                                    if (initialState.data.item_id == item.item_id) {
                                                                        if (item.inventoryDetails == null) {

                                                                            // addToCart(item)
                                                                            console.log('')
                                                                            quantity = 15
                                                                            // if(maxmin)
                                                                        }
                                                                        else if (item.inventoryDetails.inventory_quantity == 0) {
                                                                            // message.error('Sorry,The Item is not available at the moment')
                                                                            quantity = 0


                                                                        }
                                                                        else if (item.inventoryDetails.inventory_quantity != 0) {

                                                                            if (item.inventoryDetails.inventory_quantity > item.inventoryDetails?.max_order_quantity) {
                                                                                quantity = item.inventoryDetails?.max_order_quantity
                                                                            }

                                                                            else if (item.inventoryDetails.inventory_quantity < item.inventoryDetails.min_order_quantity) {
                                                                                // message.error('Sorry,The Item is not available at the moment')
                                                                                quantity = item.inventoryDetails.inventory_quantity
                                                                            }
                                                                            else {
                                                                                quantity = item.inventoryDetails?.inventory_quantity
                                                                            }
                                                                            // }
                                                                        }


                                                                        if (quantity > 0) {



                                                                            const filter = cart.filter((c) => {
                                                                                if (c.item_id == item.item_id) {
                                                                                    return c
                                                                                }
                                                                            })


                                                                         

                                                                            if (item.inventoryDetails?.inventory_quantity < item.inventoryDetails?.min_order_quantity) {

                                                                                if (filter[0].qty < item.inventoryDetails.inventory_quantity) {
                                                                                    return item

                                                                                }

                                                                                else if (filter[0].qty >= quantity) {
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


                                                                                    item.qty = item.qty - 1

                                                                                    return item
                                                                                }
                                                                                else {

                                                                                    return item
                                                                                }
                                                                            }

                                                                            else {
                                                                                if (filter[0].qty < item.inventoryDetails?.min_order_quantity) {
                                                                                    return item

                                                                                }

                                                                                else if (filter[0].qty >= quantity) {
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

                                                                                    item.qty = item.qty - 1

                                                                                    return item
                                                                                }
                                                                                else {

                                                                                    return item
                                                                                }
                                                                            }





                                                                            // addToCart(item)
                                                                            // return item
                                                                        }
                                                                        // else {
                                                                        //     message.error('Sorry, You Cannot add more items')
                                                                        // }
                                                                        // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
                                                                        // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";


                                                                    }
                                                                }

                                                            }
                                                        }).qty + 1)} className={`py-2  px-3   text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? rgbaBackground : 'black'}`, color: `${storeSettings.data ? rgbaColor : 'white'}`,  borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}><PlusOutlined className=''/></span>

                                                    </div>}

                                        {/* <div className="text-emerald-500 py-2 px-2 border border-slate-300 text-sm cursor-pointer flex items-center"><HeartOutlined /><span className="px-2">Add to Wishlist</span></div> */}
                                    </div>
                                    {!loadingWishlist ? wishlistId ?

                                        <div onClick={() => handleWishlist(initialState?.data.item_id)} className="text-lg py-2 px-7 cursor-pointer mt-3 text-[#212B36] flex items-start" ><span className='-mt-1 pr-3 ' id={initialState?.data?.item_id}><HeartFilled style={{ fontSize: '24px', color: 'red' }} /></span>ADDED TO WISHLIST</div>
                                        :
                                        <div onClick={() => stateCustomerDetails?.data?.customer_id ? handleWishlist(initialState?.data.item_id) : showModal()} className="text-lg py-2 px-7 cursor-pointer mt-3 text-[#212B36] flex items-start" ><span className='-mt-1 pr-3 ' id={initialState?.data?.item_id}><HeartOutlined style={{ fontSize: '24px', }} /></span>Add to wishlist</div>

                                        : <div className=' h-12 flex  py-2 px-24 mt-4  items-center '>
                                            <SyncOutlined spin />
                                        </div>}
                                </div>
                                : ""
                            }
                            {/* {minQtyMsg?  */}



                            {minQtyMsg && initialState?.data.item_status == 'AVAILABLE' ? <p className='text-red-500 font-montMedium'> <i>{`${initialState.defaultVariantItem ? `**Minimum Quatity is ${initialState.defaultVariantItem.inventoryDetails.min_order_quantity}` : `**Minimum Quantity is ${initialState?.data &&

                                initialState.data.inventoryDetails?.inventory_quantity < initialState.data.inventoryDetails?.min_order_quantity ? initialState.data.inventoryDetails?.inventory_quantity : initialState.data.inventoryDetails?.min_order_quantity}`}`}</i></p> : ''}
                        </div>

                    </div>
                    {initialState.spec?.length ? <>
                        {/* <hr /> */}
                        {/* product specification */}
                        <div className='lg:pl-24'>
                            <h2 className="text-gray-800 text-2xl font-montSemiBold lg:my-7">Product Specifications</h2>
                            {/* <div className=" lg:grid lg:grid-cols-2 bg-yellow-700 "> */}
                            <div className=" flex flex-col lg:grid lg:grid-cols-2  gap-5 mb-12 lg:mb-0">
                                {
                                    initialState.spec ? initialState.spec.map((item, idx) => <div key={idx} className="pr-5">
                                        <h3 className="text-gray-500 ">{item.attribute_key}</h3>
                                        <p className="border-b-2 text-lg font-montMedium">{item.attribute_value}</p>
                                    </div>) : ""
                                }

                            </div>

                            {/* </div> */}
                        </div>
                    </> : ""

                    }
                    {/* Aditional Info */}
                    {initialState.additionalinfo?.length ?
                        <>
                            <div className="my-7 lg:pl-24 lg:pr-24" >
                                <hr />
                                <h2 className="text-gray-800 text-2xl font-montSemiBold my-7">Additional Info</h2>
                                <div className="grid lg:grid-cols-2">
                                    {
                                        initialState.additionalinfo ? initialState.additionalinfo.map((item, idx) => item.media_type == "IMAGE" ? <div key={idx} className="space-y-2 p-3 w-98 h-98">
                                            <img className='w-full h-80'
                                                src={item.media_url ? item.media_url : "/dummyfood.png"}
                                                alt='product-img'
                                            />
                                            <h2 className="font-montSemiBold">{item.title}</h2>
                                            <p className="font-montRegular">{item.description}</p>
                                        </div> : ""
                                        ) : ""
                                    }
                                </div>
                                <div className="mt-7">
                                    {
                                        initialState.additionalinfo ? initialState.additionalinfo.map((item, idx) => item.media_type == "VIDEO" ? <div className="mx-auto lg:w-5/12">
                                            {/* <img className='w-full h-96'
                            src="/dummyfood.png"
                            alt='product-img'
                        /> */}
                                            {/* <Video className='w-full h-96' src={item.media_url?item.media_url:""}/> */}
                                            <div className='w-full h-80'>
                                                <ReactPlayer height={'100%'} width={'100%'} url={item.media_url} />
                                            </div>
                                            <h2 className="font-montSemiBold">{item.title}</h2>
                                            <p className="font-montRegular">{item.description}</p>
                                        </div> : ""
                                        ) : ""
                                    }
                                </div>
                            </div>
                        </> : ""
                    }
                    {
                        initialState.relatedItems?.length ? <>
                            <hr />
                            {/* Similar Items */}
                            <div>
                                <h2 className="text-gray-800 text-2xl font-montSemiBold my-7">Similar Items</h2>
                                <div className="lg:grid lg:grid-cols-4 flex whitespace-nowrap flex-grow space-x-10 overflow-x-scroll lg:overflow-x-hidden lg:flex-none">
                                    {
                                        initialState.relatedItems ? initialState.relatedItems.map((item, idx) => <div className='cursor-pointer' key={idx} >
                                            {/* onClick={() => redirect(`product/${item.item_id}`)} */}
                                            <img className='lg:w-72 lg:h-72 w-36 h-36 rounded'
                                                src={item.primary_img ? item.primary_img : "/dummyfood.png"}
                                                alt='product-img'
                                            />
                                            <h2 className="text-gray-800 text-base font-montSemiBold">{item.item_name}</h2>

                                            <p className="text-gray-800 text-base font-montRegular">{storeDetails?.currency_symbol} {item.sale_price}

                                            </p>

                                        </div>) : ""
                                    }
                                </div>
                            </div>
                        </>
                            : ""
                    }

                </div>


                {
                    !isDesktopOrLaptop ?
                        <div className="flex items-center sticky bottom-16 shadow-2xl bg-white p-2">
                            {

                                !loadingWishlist ?
                                    wishlistId ?

                                        <div onClick={() => stateCustomerDetails?.data?.customer_id ? handleWishlist(initialState?.data.item_id) : router.push('/account/user/login')} className="text-sm py-2 px-1 cursor-pointer mt-3 text-[#212B36] flex items-start w-64 " ><span className=' pr-3 ' id={initialState?.data?.item_id}><HeartFilled style={{ fontSize: '24px', color: 'red' }} /></span>ADDED TO WISHLIST</div>
                                        :
                                        <div onClick={() => stateCustomerDetails?.data?.customer_id ? handleWishlist(initialState?.data.item_id) : router.push('/account/user/login')} className="text py-2 px-1 cursor-pointer mt-3 text-[#212B36] flex items-start w-64 " ><span className='-mt-1 pr-3 ' id={initialState?.data?.item_id}><HeartOutlined style={{ fontSize: '24px', }} /></span>Add to wishlist</div>

                                    : <div className='w-52 px-20'>
                                        <SyncOutlined spin />
                                    </div>
                            }


                            {initialState.defaultVariantItem && initialState.defaultVariantItem.variant_item_status == "UNAVAILABLE" || initialState.defaultVariantItem && initialState.defaultVariantItem.variant_item_status == "CURRENTLY_UNAVAILABLE" || initialState.data && initialState.data.item_status == 'CURRENTLY_UNAVAILABLE' || initialState.data && initialState.data.item_status == 'UNAVAILABLE' ?

                                <div className=" py-2 px-2 border text-center text-sm cursor-pointer w-1/2" style={{ backgroundColor: "white", color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, borderColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}` }}>UNAVAILABLE</div>
                                :

                                !cart.find(item => initialState.defaultVariantItem ? item.defaultVariantItem?.variant_item_id == initialState.defaultVariantItem.variant_item_id : item.item_id == id) ?
                                    <div onClick={() => itemAddToCart(initialState.data)} className="mt-2 py-2 px-2 border text-center text- cursor-pointer w-1/2" style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'white'}`, backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>Add to Cart</div>
                                    :
                                    <div className='border space-x-2  flex items-center justify-between w-1/2 m-auto' style={{ backgroundColor: "white", color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>
                                        <span onClick={() => handleDecreaseQuantity(initialState.defaultVariantItem ? initialState.defaultVariantItem.variant_item_id : id, cart.find(function (item) {
                                            if (initialState.defaultVariantItem) {
                                                if (item.defaultVariantItem) {
                                                    if (item.defaultVariantItem.variant_item_id == initialState.defaultVariantItem.variant_item_id) {
                                                        return item
                                                    }
                                                }
                                            }
                                            else if (item.item_id == id) {
                                                return item
                                            }


                                        }).qty - 1)}
                                            className={`px-4 py-2 text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? rgbaBackground : 'black'}`, color: `${storeSettings.data ? rgbaColor : 'white'}`,  borderColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}` }}><MinusOutlined/></span>


                                        <span className='font-montBold text-' style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : 'white'}` }}>{cart.find(function (item) {
                                            if (initialState.defaultVariantItem) {
                                                if (item.defaultVariantItem) {
                                                    if (item.defaultVariantItem.variant_item_id == initialState.defaultVariantItem.variant_item_id) {
                                                        return item
                                                    }
                                                }
                                            }
                                            else if (item.item_id == id) {
                                                return item
                                            }
                                        }).qty}</span>
                                        <span onClick={() => adjustQty(initialState.defaultVariantItem ? initialState.defaultVariantItem.variant_item_id : id, cart.find(function (item) {
                                          if (initialState.defaultVariantItem) {
                                            if (item.defaultVariantItem) {
                                                if (item.defaultVariantItem.variant_item_id == initialState.defaultVariantItem.variant_item_id) {
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
                                                        quantity = value?.inventory_quantity
                                                        console.log('value?.inventory_quantity != null && value?.max_order_quantity == null',)
                                                    }
                                                    else if (value?.max_order_quantity > value?.inventory_quantity) {
                                                        quantity = value?.inventory_quantity
                                                        console.log('value?.max_order_quantity > value?.inventory_quantity',)

                                                    }
                                                    else if (value?.max_order_quantity < value?.inventory_quantity) {

                                                        quantity = value.max_order_quantity
                                                        console.log('value?.max_order_quantity < value?.inventory_quantity',)
                                                    }

                                                    if (quantity > 0) {

                                                        const filter = cart.filter((c) => {
                                                            if (c.defaultVariantItem?.variant_item_id == item.defaultVariantItem.variant_item_id) {
                                                                return c
                                                            }
                                                        })

                                                        // if (filter[0].qty >= quantity) {
                                                        //     message.error(`Sorry, You Cannot add more than ${quantity} items`)
                                                        //     item.qty = item.qty - 1
                                                        //     return item
                                                        // }
                                                        // else {
                                                        //     return item
                                                        // }



                                                        if (value?.inventory_quantity < value?.min_order_quantity) {
                                                            
                                                            if (filter[0].qty < value?.inventory_quantity) {
                                                                return item

                                                            }

                                                            else if (filter[0].qty >= quantity) {
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

                                                                item.qty = item.qty - 1

                                                                return item
                                                            }
                                                            else {

                                                                return item
                                                            }
                                                        }

                                                        else {
                                                            if (filter[0].qty < value?.min_order_quantity) {
                                                                return item

                                                            }

                                                            else if (filter[0].qty >= quantity) {
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

                                                                item.qty = item.qty - 1

                                                                return item
                                                            }
                                                            else {

                                                                return item
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
                                            }
                                        }
                                        else {
                                            if (initialState.data) {
                                                let quantity
                                                console.log('itemsms', item)
                                                if (initialState.data.item_id == item.item_id) {
                                                    if (item.inventoryDetails == null) {

                                                        // addToCart(item)
                                                        console.log('')
                                                        quantity = 15
                                                        // if(maxmin)
                                                    }
                                                    else if (item.inventoryDetails.inventory_quantity == 0) {
                                                        // message.error('Sorry,The Item is not available at the moment')
                                                        quantity = 0


                                                    }
                                                    else if (item.inventoryDetails.inventory_quantity != 0) {

                                                        if (item.inventoryDetails.inventory_quantity > item.inventoryDetails?.max_order_quantity) {
                                                            quantity = item.inventoryDetails?.max_order_quantity
                                                        }

                                                        else if (item.inventoryDetails.inventory_quantity < item.inventoryDetails.min_order_quantity) {
                                                            // message.error('Sorry,The Item is not available at the moment')
                                                            quantity = item.inventoryDetails.inventory_quantity
                                                        }
                                                        else {
                                                            quantity = item.inventoryDetails?.inventory_quantity
                                                        }
                                                        // }
                                                    }


                                                    if (quantity > 0) {



                                                        const filter = cart.filter((c) => {
                                                            if (c.item_id == item.item_id) {
                                                                return c
                                                            }
                                                        })


                                                     

                                                        if (item.inventoryDetails.inventory_quantity < item.inventoryDetails.min_order_quantity) {

                                                            if (filter[0].qty < item.inventoryDetails.inventory_quantity) {
                                                                return item

                                                            }

                                                            else if (filter[0].qty >= quantity) {
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

                                                                item.qty = item.qty - 1

                                                                return item
                                                            }
                                                            else {

                                                                return item
                                                            }
                                                        }

                                                        else {
                                                            if (filter[0].qty < item.inventoryDetails.min_order_quantity) {
                                                                return item

                                                            }

                                                            else if (filter[0].qty >= quantity) {
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

                                                                item.qty = item.qty - 1

                                                                return item
                                                            }
                                                            else {

                                                                return item
                                                            }
                                                        }





                                                        // addToCart(item)
                                                        // return item
                                                    }
                                                    // else {
                                                    //     message.error('Sorry, You Cannot add more items')
                                                    // }
                                                    // item['store_name'] = storeDetails.data ? storeDetails.data.store_name : "";
                                                    // item['store_logo'] = storeDetails.data ? storeDetails.data.logo_img_url : "";


                                                }
                                            }


                                            // else if (item.item_id == id) {
                                            //     return item
                                            // }



                                        }
                                        }).qty + 1)}


                                            className={`px-4 py-2 text-xl cursor-pointer`} style={{ backgroundColor: `${storeSettings.data ? rgbaBackground: 'black'}`, color: `${storeSettings.data ?rgbaColor : 'white'}`, borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}><PlusOutlined/></span>
                                    </div>}

                            {/* 
                            <div className="text-emerald-500 py-2 px-2 border border-slate-300 text-sm cursor-pointer flex items-center"><HeartOutlined /><span className="px-2">Add to Wishlist</span></div> 
                            */}





                        </div>
                        : ""
                }

            </div>

            <ToastContainer />
            <LoginModal visible={visible} setVisible={setVisible} showModal={showModal} />

        </>

            :
            <div className='flex justify-center items-center bg-white h-screen'>
                {/* <Spin size="large" /> */}


                
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

    );

};

const mapStateToProps = state => {
    return {
        initialState: state.itemDetailsReducer,
        stateCustomerDetails: state.customerDetailsReducer,
        cart: state.cartReducer.cart,
        storeSettings: state.storeSettingsReducer,
        storeDetails: state.storeDetailsReducer?.data,
        stateWishlistItems: state.wishlistDetailsReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (itemid) => dispatch(removeFromCart(itemid)),
        fetchItemDetails: (customerId, itemId) => dispatch(fetchItemDetails(customerId, itemId)),
        fetchVariants: (id) => dispatch(fetchVariants(id)),
        fetchSpecification: (id) => dispatch(fetchSpecification(id)),
        fetchAdditionalInfo: (id) => dispatch(fetchAdditionalInfo(id)),
        fetchRelatedItems: (id) => dispatch(fetchRelatedItems(id)),
        addToCart: (data) => dispatch(addToCart(data)),
        adjustQty: (itemid, value) => dispatch(adjustQty(itemid, value)),

        getStoreDetails: (storeId) => dispatch(getStoreDetails(storeId)),
        setVariantImages: (data) => dispatch(setVariantImages(data)),
        setDefaultItem: (data) => dispatch(setDefaultItem(data)),
        dispatchWishlist: (payload) => dispatch(getWishlistItems(payload)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index));