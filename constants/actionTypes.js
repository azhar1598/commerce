/*
  Contains the action Type constants for the project
*/
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

const createRequestTypes = (base) =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {

    acc[type] = `${base}_${type}`;

    return acc;
  }, {});

export const STORE_ID = "STORE_ID"
export const SET_INITIAL_ITEMS = "SET_INITIAL_ITEMS"
export const SEARCH_ITEMS = "SEARCH_ITEMS"
export const EMAIL_SIGNUP_LOGIN = "EMAIL_SIGNUP_LOGIN"
export const USER_DETAILS = "USER_DETAILS"
export const FETCH_MYORDERS = "FETCH_MYORDERS"
export const SET_MYORDERS = "SET_MYORDERS"
export const FETCH_ORDER_DETAILS = "FETCH_ORDER_DETAILS"
export const SET_ORDER_DETAILS = "SET_ORDER_DETAILS"
export const IS_LOGGED_IN = "IS_LOGGED_IN"
export const GET_STORE_DETAILS = "GET_STORE_DETAILS"
export const SET_STORE_DETAILS = "SET_STORE_DETAILS"
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const ADJUST_QTY = 'ADJUST_QTY'
export const FETCH_BACKEND_CART = 'FETCH_BACKEND_CART'
export const SET_BACKEND_CART = 'SET_BACKEND_CART'
export const FETCH_PURCHASE_DETAILS = 'FETCH_PURCHASE_DETAILS'
export const SET_PURCHASE_DETAILS = 'SET_PURCHASE_DETAILS'
export const CLEAR_CART = 'CLEAR_CART'
export const STORE_SETTINGS = 'STORE_SETTINGS'
export const SET_STORE_SETTINGS = "SET_STORE_SETTINGS"
export const STORE_DISPLAY_SETTINGS = 'STORE_DISPLAY_SETTINGS'
export const SET_STORE_DISPLAY_SETTINGS = "SET_STORE_DISPLAY_SETTINGS"
export const CART = "CART"
export const PURCHASE_DETAILS = "PURCHASE_DETAILS"
export const CUSTOMER_DETAILS = "CUSTOMER_DETAILS"
export const DEFAULT_ADDRESS = "DEFAULT_ADDRESS"
export const GET_WISHLIST_DETAILS = "GET_WISHLIST_DETAILS"
export const SET_WISHLIST_DETAILS = "SET_WISHLIST_DETAILS"

export const SHIPPING_CHARGES="SHIPPING_CHARGES"

// PDP PAGE ACTION TYPES

export const FETCH_ITEM_DETAILS = "FETCH_ITEM_DETAILS"
export const SET_ITEM_DETAILS = "SET_ITEM_DETAILS"
export const FETCH_VARIANTS = "FETCH_VARIANTS"
export const SET_VARIANTS = "SET_VARIANTS"
export const FETCH_SPECIFICATION = "FETCH_SPECIFICATION"
export const SET_SPECIFICATION = "SET_SPECIFICATION"
export const FETCH_ADDITIONAL_INFO = "FETCH_ADDITIONAL_INFO"
export const SET_ADDITIONAL_INFO = "SET_ADDITIONAL_INFO"
export const FETCH_RELATED_ITEMS = "FETCH_RELATED_ITEMS"
export const SET_RELATED_ITEMS = "SET_RELATED_ITEMS"
export const SET_DEFAULT_ITEM = "SET_DEFAULT_ITEM"
export const SET_VARIANT_IMAGES = "SET_VARIANT_IMAGES"


// Home Page


export const GET_BANNER_IMAGES = "GET_BANNER_IMAGES"
export const GET_NEW_ARRIVALS = "GET_NEW_ARRIVALS"
export const GET_FEATURED_PRODUCTS = "GET_FEATURED_PRODUCTS"
export const GET_WALLET_INFO = "GET_WALLET_INFO"
export const SET_WALLET_INFO = "SET_WALLET_INFO"
export const GET_WALLET_TRANSACTIONS = "GET_WALLET_TRANSACTIONS"


// AUTHENTICATION

export const CUSTOMER_SIGN_UP = "CUSTOMER_SIGN_UP"
export const CUSTOMER_LOGIN = "CUSTOMER_LOGIN"
export const FORGOT_PASSWORD = "FORGOT_PASSWORD"
export const RESET_PASSWORD = "RESET_PASSWORD"
export const VERIFY_FORGOT_OTP = "VERIFY_FORGOT_OTP"
export const VERIFY_OTP = "VERIFY_OTP"



// PLP PAGE

export const GET_CATEGORICAL_ITEMS = "GET_CATEGORICAL_ITEMS"
export const GET_CATEGORY_ITEM_COUNT = "GET_CATEGORY_ITEM_COUNT"
export const GET_SEARCH_ITEMS = "GET_SEARCH_ITEMS"
export const GET_INITIAL_ITEMS = "GET_INITIAL_ITEMS"

export const GET_CATEGORIES = "GET_CATEGORIES"


// Footer
export const GET_SOCIAL_PROFILE = "GET_SOCIAL_PROFILE"
export const SET_SOCIAL_PROFILE = "SET_SOCIAL_PROFILE"






export const wishlistActionType = {

  GET_WISHLIST_ITEMS: 'GET_WISHLIST_ITEMS',

  SET_WISHLIST_ITEMS: 'SET_WISHLIST_ITEMS',

  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',

  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',

  CLEARE_WISHLIST: 'CLEARE_WISHLIST',

  WISHLIST_ERROR: 'WISHLIST_ERROR',
}

export const SET_DELIVERY_ADDRESS = 'SET_DELIVERY_ADDRESS'
export const ADD_ADDRESS = 'ADD_ADDRESS'
export const EDIT_ADDRESS = 'EDIT_ADDRESS'
export const GET_ADDRESS = 'GET_ADDRESS'
export const SET_ADDRESS = 'SET_ADDRESS'

export const INITIATE_PAYMENT = 'INITIATE_PAYMENT'
export const INITIATE_CASH_ON_DELIVERY = 'INITIATE_CASH_ON_DELIVERY'
export const INITIATE_RAZORPAY_ORDER = 'INITIATE_RAZORPAY_ORDER'
export const COUPON_APPLY = 'COUPON_APPLY'
export const REMOVE_COUPON = 'REMOVE_COUPON'


export const MOBILE_SEARCH = 'MOBILE_SEARCH'
export const HIDE_CART = 'HIDE_CART'

export const INPUT = 'INPUT'
export const PAYMENT_METHOD = 'PAYMENT_METHOD'

// Filter


export const FETCH_FILTER_GROUPS='FETCH_FILTER_GROUPS'

export const CANCEL_ORDER='CANCEL_ORDER'

//widgets

export const GET_SHOP_WIDGETS="GET_SHOP_WIDGETS"
export const SET_SHOP_WIDGETS="SET_SHOP_WIDGETS"

//seo
export const GET_SHOP_SEO_START="GET_SHOP_SEO_START"
export const GET_SHOP_SEO_SUCCESS="GET_SHOP_SEO_SUCCESS"


export const SET_PARCEL="SET_PARCEL"
export const SET_DELIVERY="SET_DELIVERY"



export default wishlistActionType
