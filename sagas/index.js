import { takeLatest } from "redux-saga/effects"
import wishlistActionType, { addressActionType, ADD_ADDRESS, CANCEL_ORDER, COUPON_APPLY, CUSTOMER_LOGIN, CUSTOMER_SIGN_UP, EDIT_ADDRESS, FETCH_ADDITIONAL_INFO, FETCH_BACKEND_CART, FETCH_FILTER_GROUPS, FETCH_ITEM_DETAILS, FETCH_PURCHASE_DETAILS, FETCH_RELATED_ITEMS, FETCH_SPECIFICATION, FETCH_VARIANTS, FORGOT_PASSWORD, GET_ADDRESS, GET_BANNER_IMAGES, GET_CATEGORICAL_ITEMS, GET_CATEGORIES, GET_FEATURED_PRODUCTS, GET_INITIAL_ITEMS, GET_NEW_ARRIVALS, GET_SEARCH_ITEMS, GET_SOCIAL_PROFILE, GET_STORE_DETAILS, GET_WALLET_INFO, GET_WALLET_TRANSACTIONS, GET_WISHLIST_DETAILS, REMOVE_COUPON, RESET_PASSWORD, SET_ADDRESS, STORE_DISPLAY_SETTINGS, STORE_SETTINGS, VERIFY_FORGOT_OTP, GET_SHOP_WIDGETS, GET_SHOP_SEO_START, SET_PARCEL, SET_DELIVERY, CONVENIENCE_CHARGES, POLICIES, GET_ADDONS } from "../constants/actionTypes"
import { handleAddress, handleAuthentication, handleCancelOrder, handleConvenienceCharges, handleCoupon, handleDeliveryMethod, handleFetchAdditionalInfo, handleFetchAddons, handleFetchBackendCart, handleFetchItemDetails, handleFetchItemSpecification, handleFetchPurchaseDetails, handleFetchRelatedItems, handleFetchVariants, handleFetchWishlistDetails, handleFiltersGroup, handleHomePage, handleItems, handlePolicies, handleSocialProfile, handleStoreDetails, handleStoreDisplaySettings, handleStoreSettings, handleWallet, handleWishlistItems, onGetShopSeo, onGetShopWidgets } from "./sagasHandler"


export function* watcherSaga() {
    //widgets
    yield takeLatest(GET_SHOP_WIDGETS, onGetShopWidgets)
    //seo
    yield takeLatest(GET_SHOP_SEO_START, onGetShopSeo)


    yield takeLatest(STORE_SETTINGS, handleStoreSettings)
    yield takeLatest(FETCH_BACKEND_CART, handleFetchBackendCart)
    yield takeLatest(GET_STORE_DETAILS, handleStoreDetails)
    yield takeLatest(GET_WISHLIST_DETAILS, handleFetchWishlistDetails)

    // PDP PAGE SAGAS

    yield takeLatest(FETCH_ITEM_DETAILS, handleFetchItemDetails)
    yield takeLatest(FETCH_VARIANTS, handleFetchVariants)
    yield takeLatest(GET_ADDONS,handleFetchAddons)
    yield takeLatest(FETCH_SPECIFICATION, handleFetchItemSpecification)
    yield takeLatest(FETCH_ADDITIONAL_INFO, handleFetchAdditionalInfo)
    yield takeLatest(FETCH_RELATED_ITEMS, handleFetchRelatedItems)

    // Wishlist Sagas

    yield takeLatest(wishlistActionType.GET_WISHLIST_ITEMS, handleWishlistItems)
    yield takeLatest(wishlistActionType.REMOVE_FROM_WISHLIST, handleWishlistItems)
    yield takeLatest(ADD_ADDRESS, handleAddress)
    yield takeLatest(EDIT_ADDRESS, handleAddress)
    yield takeLatest(GET_ADDRESS, handleAddress)
    yield takeLatest(GET_CATEGORICAL_ITEMS, handleItems)
    yield takeLatest(GET_INITIAL_ITEMS, handleItems)
    yield takeLatest(GET_SEARCH_ITEMS, handleItems)
    yield takeLatest(GET_CATEGORIES, handleItems)
    yield takeLatest(GET_SOCIAL_PROFILE, handleSocialProfile)
    yield takeLatest(GET_BANNER_IMAGES, handleHomePage)
    yield takeLatest(GET_NEW_ARRIVALS, handleHomePage)
    yield takeLatest(GET_FEATURED_PRODUCTS, handleHomePage)
    yield takeLatest(GET_WALLET_INFO, handleWallet)
    yield takeLatest(GET_WALLET_TRANSACTIONS, handleWallet),
        yield takeLatest(CUSTOMER_LOGIN, handleAuthentication),
        yield takeLatest(CUSTOMER_SIGN_UP, handleAuthentication),
        yield takeLatest(FORGOT_PASSWORD, handleAuthentication),
        yield takeLatest(VERIFY_FORGOT_OTP, handleAuthentication),
        yield takeLatest(RESET_PASSWORD, handleAuthentication)

    yield takeLatest(COUPON_APPLY, handleCoupon)
    yield takeLatest(REMOVE_COUPON, handleCoupon)

    yield takeLatest(FETCH_FILTER_GROUPS, handleFiltersGroup)
    yield takeLatest(CANCEL_ORDER, handleCancelOrder)
    yield takeLatest(STORE_DISPLAY_SETTINGS, handleStoreDisplaySettings)

    yield takeLatest(FETCH_PURCHASE_DETAILS, handleFetchPurchaseDetails)

    yield takeLatest(SET_PARCEL, handleDeliveryMethod)
    yield takeLatest(SET_DELIVERY, handleDeliveryMethod)


    yield takeLatest(CONVENIENCE_CHARGES, handleConvenienceCharges)


    yield takeLatest(POLICIES, handlePolicies)

}
