import wishlistActionType, {
  STORE_SETTINGS,
  SET_STORE_SETTINGS,
  CART,
  ADJUST_QTY,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  CLEAR_CART,
  FETCH_BACKEND_CART,
  SET_BACKEND_CART,
  FETCH_PURCHASE_DETAILS,
  PURCHASE_DETAILS,
  CUSTOMER_DETAILS,
  SEARCH_ITEMS,
  DEFAULT_ADDRESS,
  SET_STORE_DETAILS,
  GET_STORE_DETAILS,
  GET_WISHLIST_DETAILS,
  SET_WISHLIST_DETAILS,
  FETCH_ITEM_DETAILS,
  SET_ITEM_DETAILS,
  FETCH_VARIANTS,
  SET_VARIANTS,
  FETCH_SPECIFICATION,
  SET_SPECIFICATION,
  FETCH_ADDITIONAL_INFO,
  SET_ADDITIONAL_INFO,
  FETCH_RELATED_ITEMS,
  SET_RELATED_ITEMS,
  SET_VARIANT_IMAGES,
  SET_DEFAULT_ITEM,
  paymentActionType,
  addressActionType,
  INITIATE_RAZORPAY_ORDER,
  INITIATE_CASH_ON_DELIVERY,
  INITIATE_PAYMENT,
  SET_DELIVERY_ADDRESS,
  EDIT_ADDRESS,
  ADD_ADDRESS,
  GET_CATEGORICAL_ITEMS,
  GET_CATEGORY_ITEM_COUNT,
  GET_SEARCH_ITEMS,
  GET_INITIAL_ITEMS,
  GET_CATEGORIES,
  GET_SOCIAL_PROFILE,
  SET_SOCIAL_PROFILE,
  GET_BANNER_IMAGES,
  GET_NEW_ARRIVALS,
  GET_FEATURED_PRODUCTS,
  GET_WALLET_INFO,
  GET_WALLET_TRANSACTIONS,
  SET_WALLET_INFO,
  CUSTOMER_SIGN_UP,
  CUSTOMER_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  VERIFY_FORGOT_OTP,
  VERIFY_OTP,
  MOBILE_SEARCH,
  GET_ADDRESS,
  SET_ADDRESS,
  COUPON_APPLY,
  PAYMENT_METHOD,
  FETCH_FILTER_GROUPS,
  CANCEL_ORDER,
  STORE_DISPLAY_SETTINGS,
  SET_STORE_DISPLAY_SETTINGS,
  REMOVE_COUPON,
  GET_SHOP_WIDGETS,
  SET_SHOP_WIDGETS,
  GET_SHOP_SEO_START,
  GET_SHOP_SEO_SUCCESS,
  SET_DELIVERY,
  SET_PARCEL,
  SHIPPING_CHARGES,
  CONVENIENCE_CHARGES,
  POLICIES,
  SET_POLICIES,
  ADD_ADDON,
  DECREASE_ADDON,
  ADD_BULK_TO_CART,
  GET_ADDONS,
  SET_ADDONS,
  EDIT_ADDONS,
} from "../constants/actionTypes";

export const getStoreSettings = (storeId) => {
  return {
    type: STORE_SETTINGS,
    payload: storeId,
  };
};

export const getStoreDisplaySettings = (storeId) => {
  return {
    type: STORE_DISPLAY_SETTINGS,
    payload: storeId,
  };
};

export const setDeliveryAction = (purchaseId) => {
  return {
    type: SET_DELIVERY,
    payload: purchaseId,
  };
};

export const setParcelAction = (purchaseId) => {
  return {
    type: SET_PARCEL,
    payload: purchaseId,
  };
};

export const setStoreDisplaySettings = (storeId) => {
  return {
    type: SET_STORE_DISPLAY_SETTINGS,
    payload: storeId,
  };
};

export const getStoreDetails = (storeId) => {
  return {
    type: GET_STORE_DETAILS,
    payload: storeId,
  };
};

export const setStoreDetails = (storeId) => {
  return {
    type: SET_STORE_DETAILS,
    payload: storeId,
  };
};

export const searchItems = (data) => {
  return {
    type: SEARCH_ITEMS,
    searchItems: data,
  };
};

export const inputAction = (data) => {
  return {
    type: INPUT,
    payload: data,
  };
};

export const customerDetails = (data) => {
  return {
    type: CUSTOMER_DETAILS,
    payload: data,
  };
};

export const setStoreSettings = (data) => {
  return {
    type: SET_STORE_SETTINGS,
    payload: data,
  };
};

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const addBulkCart = (item) => {
  return {
    type: ADD_BULK_TO_CART,
    payload: item,
  };
};

export const adjustQty = (itemID, value) => {
  return {
    type: ADJUST_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id: itemId,
    },
  };
};

export const addAddon = (payload) => {
  return {
    type: ADD_ADDON,
    payload,
  };
};

export const decreaseAddon = (payload) => {
  return {
    type: DECREASE_ADDON,
    payload,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const fetchBackendCart = (
  customerId,
  groupId,
  purchaseId,
  data,
  addressId
) => {
  return {
    type: FETCH_BACKEND_CART,
    payload: {
      customerId,
      groupId,
      purchaseId,
      data,
      addressId: addressId?.defaultAddress?.address_id,
    },
  };
};

export const setBackendCart = (data) => {
  return {
    type: SET_BACKEND_CART,
    backendCart: data,
  };
};

export const fetchPurchaseDetails = (purchaseid, setLoading) => {
  return {
    type: FETCH_PURCHASE_DETAILS,
    payload: purchaseid,
    setLoading: setLoading,
  };
};

export const purchaseDetails = (data) => {
  return {
    type: PURCHASE_DETAILS,
    purchaseDetails: data,
  };
};

export const defaultAddress = (data) => {
  return {
    type: DEFAULT_ADDRESS,
    payload: data,
  };
};

export const getWishlistDetails = (data) => {
  return {
    type: GET_WISHLIST_DETAILS,
    payload: data,
  };
};

// PDP PAGE ACTIONS

export const fetchItemDetails = (customerId, itemId) => {
  return {
    type: FETCH_ITEM_DETAILS,
    payload: { customerId, itemId },
  };
};




export const setItemDetails = (data) => {
  return {
    type: SET_ITEM_DETAILS,
    data,
  };
};

export const fetchVariants = (id) => {
  return {
    type: FETCH_VARIANTS,
    payload: id,
  };
};

export const setVariants = (data) => {
  return {
    type: SET_VARIANTS,
    variants: data,
  };
};


export const fetchAddons = (payload) => {
  console.log('payloaddd',payload)
  return {
    type: GET_ADDONS,
    payload:payload,
  };
};

export const setAddons = (data) => {
  return {
    type: SET_ADDONS,
    addons: data,
  };
};

export const editAddons = (payload) => {
  return {
    type: EDIT_ADDONS,
    payload: data,
  };
};



export const fetchSpecification = (id) => {
  return {
    type: FETCH_SPECIFICATION,
    payload: id,
  };
};

export const setSpecification = (data) => {
  return {
    type: SET_SPECIFICATION,
    specification: data,
  };
};

export const fetchAdditionalInfo = (id) => {
  return {
    type: FETCH_ADDITIONAL_INFO,
    payload: id,
  };
};

export const setAdditionalInfo = (data) => {
  return {
    type: SET_ADDITIONAL_INFO,
    additionalinfo: data,
  };
};

export const fetchRelatedItems = (id) => {
  return {
    type: FETCH_RELATED_ITEMS,
    payload: id,
  };
};

export const setRelatedItems = (data) => {
  return {
    type: SET_RELATED_ITEMS,
    relatedItems: data,
  };
};

export const setVariantImages = (data) => {
  return {
    type: SET_VARIANT_IMAGES,
    payload: data,
  };
};

export const setDefaultItem = (defaultVariantItem) => {
  return {
    type: SET_DEFAULT_ITEM,
    payload: defaultVariantItem,
  };
};

export const getWalletInfoAction = ({ payload }) => {
  return {
    type: GET_WALLET_INFO,
    payload: payload,
  };
};

export const setWalletInfoAction = (payload) => {
  return {
    type: SET_WALLET_INFO,
    payload: payload,
  };
};

export const getWalletTransactionsAction = ({ payload }) => {
  return {
    type: GET_WALLET_TRANSACTIONS,
    payload: payload,
  };
};

export const paymentMethodAction = (payload) => {
  return {
    type: PAYMENT_METHOD,
    payload: payload,
  };
};

// AUTHENTICATION

export const customerSignUpAction = ({ payload }) => {
  return {
    type: CUSTOMER_SIGN_UP,
    payload: payload,
  };
};

export const customerLoginAction = ({ payload }) => {
  return {
    type: CUSTOMER_LOGIN,
    payload: payload,
  };
};

export const forgotPasswordAction = ({ payload }) => {
  return {
    type: FORGOT_PASSWORD,
    payload: payload,
  };
};

export const resetPasswordAction = ({ payload }) => {
  return {
    type: RESET_PASSWORD,
    payload: payload,
  };
};

export const verifyForgotOtpAction = ({ payload }) => {
  return {
    type: VERIFY_FORGOT_OTP,
    payload: payload,
  };
};

export const verifyOtpAction = ({ payload }) => {
  return {
    type: VERIFY_OTP,
    payload: payload,
  };
};

// Home Page

export const getBannerImagesAction = (
  storeId,
  setData,
  setLoading,
  loading
) => {
  return {
    type: GET_BANNER_IMAGES,
    storeId,
    setData,
    setLoading,
    loading,
  };
};

export const getNewArrivalsAction = (storeId, setData) => {
  return {
    type: GET_NEW_ARRIVALS,
    storeId,
    setData,
  };
};

export const getFeaturedProductsAction = (storeId, setData) => {
  return {
    type: GET_FEATURED_PRODUCTS,
    storeId,
    setData,
  };
};

// PLP PAGE

export const getCategoricalItemsAction = ({ payload }) => {
  return {
    type: GET_CATEGORICAL_ITEMS,
    payload: payload,
  };
};

export const getCategoricalItemCountAction = ({ payload }) => {
  return {
    type: GET_CATEGORY_ITEM_COUNT,
    payload: payload,
  };
};

export const getSearchItemsAction = ({ payload }) => {
  return {
    type: GET_SEARCH_ITEMS,
    payload: payload,
  };
};

export const getInitialItemsAction = ({ payload }) => {
  return {
    type: GET_INITIAL_ITEMS,
    payload: payload,
  };
};

export const getCategoriesAction = ({ payload }) => {
  return {
    type: GET_CATEGORIES,
    payload: payload,
  };
};

// Footer

export const getSocialProfileAction = ({ payload }) => {
  return {
    type: GET_SOCIAL_PROFILE,
    payload: payload,
  };
};

export const setSocialProfileAction = (payload) => {
  return {
    type: SET_SOCIAL_PROFILE,
    payload: payload,
  };
};

// Wishlist

export const getWishlistItems = ({ payload }) => {
  return {
    type: wishlistActionType.GET_WISHLIST_ITEMS,
    payload: payload,
  };
};

export const setWishlistItems = (data) => {
  return {
    type: wishlistActionType.SET_WISHLIST_ITEMS,
    payload: data,
  };
};

export const deleteItemFromWishlist = ({ payload }) => {
  return {
    type: wishlistActionType.REMOVE_FROM_WISHLIST,
    payload: payload,
  };
};

// Actions in Billing

export const addAddressAction = ({ payload }) => {
  return {
    type: ADD_ADDRESS,
    payload: payload,
  };
};

export const editAddressAction = ({ payload }) => {
  return {
    type: EDIT_ADDRESS,
    payload: payload,
  };
};

export const getAddressAction = (payload) => {
  return {
    type: GET_ADDRESS,
    payload: payload,
  };
};

export const setAddressAction = (payload) => {
  return {
    type: SET_ADDRESS,
    payload: payload,
  };
};

export const setDeliveryAddressAction = ({ payload }) => {
  return {
    type: SET_DELIVERY_ADDRESS,
    payload: payload,
  };
};

export const shippingCharges = ({ payload }) => {
  return {
    type: SHIPPING_CHARGES,
    payload: payload,
  };
};

export const convenienceCharges = (purchaseId, flag, setPaymentAdded) => {
  return {
    type: CONVENIENCE_CHARGES,
    payload: { purchaseId, flag, setPaymentAdded },
  };
};

export const couponApplyAction = ({ payload }) => {
  return {
    type: COUPON_APPLY,
    payload: payload,
  };
};

export const removeCouponAction = (orderId, purchaseId) => {
  return {
    type: REMOVE_COUPON,
    orderId: orderId,
    purchaseId,
  };
};

export const initiatePaymentAction = ({ payload }) => {
  return {
    type: INITIATE_PAYMENT,
    payload: payload,
  };
};

export const initiateCashOnDeliveryAction = ({ payload }) => {
  return {
    type: INITIATE_CASH_ON_DELIVERY,
    payload: payload,
  };
};

export const initiateRazorPayOrderAction = ({ payload }) => {
  return {
    type: INITIATE_RAZORPAY_ORDER,
    payload: payload,
  };
};

export const mobileSearchAction = (payload) => {
  return {
    type: MOBILE_SEARCH,
    payload: payload,
  };
};

export const hideCartAction = (payload) => {
  return {
    type: HIDE_CART,
    payload: payload,
  };
};

// Filter

export const getFilterGroups = (payload) => {
  return {
    type: FETCH_FILTER_GROUPS,
    payload: payload,
  };
};

//widgets
export const getShopWidgets = (storeId) => {
  return {
    type: GET_SHOP_WIDGETS,
    payload: storeId,
  };
};
export const setShopWidgets = (data) => {
  return {
    type: SET_SHOP_WIDGETS,
    payload: data,
  };
};

export const cancelOrderAction = (orderId, payload, setMsg) => {
  return {
    type: CANCEL_ORDER,
    orderId,
    payload,
    setMsg,
  };
};

//seo
export const getShopSeoStart = (storeId) => {
  return {
    type: GET_SHOP_SEO_START,
    payload: storeId,
  };
};
export const getShopSeoSuccess = (seo) => {
  return {
    type: GET_SHOP_SEO_SUCCESS,
    payload: seo,
  };
};

export const policiesAction = (storeId) => {
  return {
    type: POLICIES,
    payload: storeId,
  };
};

export const setPolicies = (data) => {
  return {
    type: SET_POLICIES,
    payload: data,
  };
};
