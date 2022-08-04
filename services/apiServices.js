import { callAPI, callNodeAPI, callNodeProdAPI } from "./apiHandler";


const STORE_ID=585
//widgets
export const handleGetShopWidgets = (payload) =>
    callAPI('GET', `stores/get-all-widget-integrations&storeId=${payload}`)

    // SEO

    export const handleSEO = (payload) =>
    callAPI('GET', `stores/get-seo-details&storeId=${STORE_ID}`)


export const getStoreSettingsAPI = () =>
    callAPI('GET', `stores/get-store-display-settings&storeId=${STORE_ID}`)

export const getStoreDisplaySettingsAPI = () =>
    callAPI('GET', `stores/get-store-settings&storeId=${STORE_ID}`)

export const getStoreDetailsAPI = (storeId) =>
    callAPI('GET', `stores/get-details&storeId=${STORE_ID}`)

export const getBannerImages = (storeId) =>
    callAPI(`GET`, `stores/get-banners&storeId=${STORE_ID}`)

export const getNewArrivals = (storeId) =>
    callNodeAPI(`GET`, `/api/v1/store-widgets/get-new-arrivals-by-store?storeId=${STORE_ID}`)


export const getFeaturedProducts = (storeId) =>
    callNodeAPI(`GET`, `/api/v1/store-widgets/get-best-sellers-by-store?storeId=${STORE_ID}`)


export const getInitialItems = (payload) => {
    console.log('api ', payload)
    if (payload.filterAndSortPayload) {

        return callAPI(
            'POST', `catalog/get-items&storeId=${STORE_ID}&pageNum=${payload.page}${payload.sortOrder != 'false' ? `&sortOrder=${payload.sortOrder}` : ''}&customerId=${payload.customerId}`,
            payload.filterAndSortPayload
        );
    }
    else {

        return callAPI(
            'GET', `catalog/get-items&storeId=${STORE_ID}&pageNum=${payload.page}&customerId=${payload.customerId}`,
        );
    }
}

export const getCategories = (storeId) =>
    callAPI(
        'GET', `catalog/get-categories&storeId=${STORE_ID}`,
    );

export const getCategoricalItems = (payload) => {

console.log('filterpayloadAnd payload sort',payload)

    return callAPI(
        'GET', `catalog/get-items&storeId=${STORE_ID}&categoryId=${payload.categoryId}&${payload.subCategoryId != 'undefined' && payload.subCategoryId != undefined ? `subCategoryId=${payload.subCategoryId}` : ''}&pageNum=${payload.page}${payload.sortOrder != 'false' || undefined ? `&sortOrder=${payload.sortOrder}` : ''}&customerId=${payload.customerId}`,
    );
}

export const getCategoryItemCount = (storeId, id, subCategoryId) =>
    callAPI('GET', `catalog/get-item-count&storeId=${STORE_ID}&categoryId=${id}&subCategoryId=${subCategoryId}`)

export const customerSignUp = ({ payload }) =>

    callNodeAPI('POST', `api/v1/customer/register`, {
        storeId: STORE_ID, fullName: payload.inputSignUp?.name, password: payload.inputSignUp.password, confirmPassword: payload.inputSignUp.confirm_password, verificationType: payload.method, emailId: payload.method == "EMAIL" ? payload.inputSignUp?.method : '', deviceId: payload.deviceId, phone: payload.method == "EMAIL" ? '' : payload.inputSignUp?.method, isdCode: '91'
    })

export const customerLogIn = ({ payload }) => {
    console.log('paaayload api', payload, payload.inputSignUp)
    return callNodeAPI('POST', `api/v1/customer/login`, {
        storeId: STORE_ID, password: payload.inputSignUp.password, verificationType: payload.method, emailId: payload.method == "EMAIL" ? payload.inputSignUp?.method : '', phone: payload.method == "EMAIL" ? '' : payload.inputSignUp?.method, isdCode: '91', deviceId: payload.deviceId
    })
}
export const forgotPasswordAPI = ({ payload }) => {

    console.log('payload api forgot password', payload)

    return callNodeAPI('POST', `api/v1/customer/forget-password`, {
        verificationType: payload.method, emailId: payload.method == "EMAIL" ? payload.inputSignUp?.method : '', phone: payload.method == "EMAIL" ? '' : payload.inputSignUp?.method, isdCode: '91'
    })
}

export const verifyForgotOtp = (payload) => {
    console.log('payload otp', payload)
    return callNodeAPI('POST', `/api/v1/customer/verify-otp`, { otpCode: payload.OTP, customerId: payload.customerId ,verificationType:payload.method})
}

export const resetPasswordAPI = (input, customerId) =>
    callNodeAPI('POST', `/api/v1/customer/reset-password`, { password: input.password, confirmPassword: input.confirm_password, customerId: customerId })


export const verifyOtpAPI = (storeId, customerId, otpCode, verificationType) =>
    callNodeAPI('POST', `api/v1/customer/verify-account`, { storeId: STORE_ID, customerId, otpCode, verificationType })

// PDP PAGE API'S

export const getItemDetails = (itemId, customerId) =>
    callAPI('GET', `catalog/get-item-details&itemId=${itemId}&customerId=${customerId}`)

export const getItemVariants = (payload) =>
    callAPI('GET', `catalog/get-variant-groups-by-item-id&itemId=${payload}`)

export const getItemSpecification = (itemId) =>
    callAPI('GET', `catalog/get-product-specifications&itemId=${itemId}`)


export const getItemInfo = (itemId) =>
    callAPI('GET', `catalog/get-product-additional-info&itemId=${itemId}`)

export const getSimilarItems = (itemId) =>
    callNodeProdAPI('GET', `/api/v1/widgets/get-related-items?item_id=${itemId}
        `)


export const getVariantByItemId = (itemId, variantValueId) =>
    callAPI('POST', `catalog/get-variant-items-by-item-id&itemId=${itemId}`, variantValueId)

// END OF PDP PAGE


export const getSearchItems = (payload) =>
    callAPI('GET', `catalog-search/search-items&storeId=${STORE_ID}&searchKey=${payload.searchedItem}&pageNum=${payload?.page}&customerId=${payload.customerId}&${payload.sortOrder != 'false' || undefined ? `&sortOrder=${payload.sortOrder}` : ''}`)


export const getOrdersInfo = (customerId) =>
    callAPI('GET', `my-orders/get-orders-by-customer-id&customerId=${customerId}&storeId=${STORE_ID}`)

export const readOrders = (orderId) =>
    callAPI('GET', `my-orders/read-order&orderId=${orderId}`)

export const getWalletAmount = (payload, storeId) => {
    console.log('wall', payload)
    return callAPI('GET', `customer/get-customer-wallet-details&customerId=${payload.customerId}&storeId=${STORE_ID}`)
}
export const getWalletTransactions = (payload) =>
    callAPI('GET', `customer/get-wallet-transactions&customerId=${payload.customerId}&storeId=${STORE_ID}`)



export const getCartDetails = (payload) => {

    if (Object.keys(payload.data).length !== 0) {
        if (payload.purchaseId == undefined) {
            return callAPI('POST', `orders/add-items-to-cart&customerId=${payload.customerId}&groupId=1`, payload.data)
        }
        else {
            return callAPI('POST', `orders/add-items-to-cart&customerId=${payload.customerId}&groupId=1&purchaseId=${payload.purchaseId}`, payload.data)
        }
    }
}

export const getAddressList = (customerId) => {

    return callAPI('GET', `customer/get-address-book&customerId=${customerId}`)
}

export const addAddress = (customerId, addressData) =>
    callAPI('POST', `customer/add-address&customerId=${customerId}`, { customerAddressDetails: addressData })

export const removeAddress = (customerId, addressId) =>
    callAPI('GET', `customer/remove-address&customerId=${customerId}&addressId=${addressId}`)

export const editAddressAPI = (customerId, addressId, addressData) =>
    callAPI('POST', `customer/update-address&addressId=${addressId}&customerId=${customerId}`, { customerAddressDetails: addressData })

export const getPurchaseDetails = (payload) =>
    callAPI('GET', `orders/get-purchase&purchaseId=${payload}`)

export const setDeliveryAddress = (purchaseId, addressId) =>
    callAPI('GET', `orders/set-delivery-address-id&purchaseId=${purchaseId}&deliveryAddressId=${addressId}`)

export const setDeliveryAddressFlag = (purchaseId, flag) =>
    callAPI('GET', `orders/set-delivery&purchaseId=${purchaseId}&flagStatus=Y`)


export const convenienceFlag = (purchaseId, flag) =>
    callAPI('GET', `orders/set-convenience-flag&purchaseId=${purchaseId}&flagStatus=${flag}`)

    export const setParcelAPI=(purchaseId)=>
    callAPI('GET',`orders/set-parcel&purchaseId=${purchaseId}&flagStatus=Y`)

    export const setDeliveryAPI=(purchaseId)=>
    callAPI('GET',`orders/set-delivery&purchaseId=${purchaseId}&flagStatus=N`)
    

export const couponApply = (payload) =>
    callAPI('GET', `orders/validate-coupon&storeId=${payload.storeId}&couponCode=${payload.coupon}&orderId=${payload.orderId}&customerId=${payload.customerId}`)

export const removeCoupon = (orderId) =>
    callAPI('GET', `orders/remove-coupon&orderId=${orderId}`)


export const initiatePayment = (purchaseId) =>
    callAPI('GET', `orders/initiate-payment&purchaseId=${purchaseId}`)

export const initiateCashOnDelivery = (purchase_id, customerId, amount) => {
    return callAPI('POST', `orders/confirm-order-payments&purchaseId=${purchase_id}&method=COD`, { customerId, amount })
}

export const initiateRazorPayOrder = (purchaseId, totalPurchaseAmount, currency) => {
    return callAPI('GET', `orders/create-new-rzp-order&purchaseId=${purchaseId}&totalPurchaseAmount=${totalPurchaseAmount}&currency=${currency}`)
}



export const razorPayOrderSuccess = (purchaseId, customerId, amount, wallet, id, method) => {
    console.log('mettth', method)
    return callAPI('POST', `orders/confirm-order-payments&purchaseId=${purchaseId}&method=${method}`, { customerId, amount, useWalletAmount: wallet, id })
}
export const getWishlistAPI = (payload) =>
    callAPI('GET', `customer/get-wishlist-items&customerId=${payload?.customerId}&pageNum=${1}&storeId=${payload?.storeId}
`)



export const addToWishlist = (storeId, customerId, itemId) =>
    callAPI('POST',
        `customer/add-item-to-wishlist&customerId=${customerId}&storeId=${STORE_ID}&itemId=${itemId}`
    );

export const deleteFromWishlist = (primaryKey) =>
    callAPI('GET', `customer/delete-from-wishlist&wishlistId=${primaryKey}
`)


export const getSocialProfile = (payload) =>
    callAPI('GET', `stores/get-social-accounts&storeId=${payload.storeId}`)


export const cancelOrder = (orderId, payload) => {

    return (
        callAPI('POST', `my-orders/cancel-order&orderId=${orderId}`, payload)
    )
}


export const filterApi = (payload) =>
    callAPI('GET', `catalog-search/get-filter-groups&storeId=${STORE_ID}`)



