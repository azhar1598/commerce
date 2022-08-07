import { purchaseDetails, setAdditionalInfo, setAddressAction, setBackendCart, setItemDetails, setPurchaseDetails, setSocialProfileAction, setSpecification, setStoreDetails, setStoreDisplaySettings, setStoreSettings, setVariants, setWalletInfoAction, setWishlistDetails, setWishlistItems, setShopWidgets, getShopSeoSuccess } from "../actions";
import { addAddress, cancelOrder, couponApply, customerLogIn, customerSignUp, deleteFromWishlist, editAddressAPI, filterApi, forgotPasswordAPI, getAddressList, getBannerImages, getCartDetails, getCategoricalItems, getCategories, getFeaturedProducts, getInitialItems, getItemDetails, getItemInfo, getItemSpecification, getItemVariants, getNewArrivals, getPurchaseDetails, getSearchItems, getSimilarItems, getSocialProfile, getStoreDetailsAPI, getStoreDisplaySettingsAPI, getStoreSettingsAPI, getWalletAmount, getWalletTransactions, getWishlistAPI, removeCoupon, resetPasswordAPI, verifyForgotOtp, verifyOtpAPI, handleGetShopWidgets, handleSEO, setDeliveryAPI, setParcelAPI } from "../services/apiServices";
import { put } from "redux-saga/effects"
import store from "../config/store";
import wishlistActionType, { FETCH_FILTER_GROUPS } from "../constants/actionTypes";

//widgets
export function* onGetShopWidgets({ payload }) {
    try {
        // const res = yield fetcher('GET', `?r=stores/get-all-widget-integrations&storeId=${payload}`);
        const res = yield handleGetShopWidgets(payload);
        if (res.data) {
            yield put(setShopWidgets(res.data))
        }

    } catch (error) {
        // yield put(errorOnProductDetailPage(error))
    }

}
//seo
export function* onGetShopSeo({ payload }) {
    try {
        // const res = yield fetcher('GET', `?r=stores/get-all-widget-integrations&storeId=${payload}`);
        const res = yield handleSEO(payload);
        if (res.data) {
            yield put(getShopSeoSuccess(res.data))
        }

    } catch (error) {
        console.log(error)
    }

}

export function* handleStoreDetails({ storeId }) {

    console.log('get storeDetails', storeId)

    try {
        const response = yield getStoreDetailsAPI(storeId)
        const { data } = response;
        yield put(setStoreDetails(data))

    } catch (error) {
        console.log(error)
    }

}


export function* handleStoreSettings() {

    try {
        const response = yield getStoreSettingsAPI()
        const { data } = response;

        yield put(setStoreSettings(data))

    } catch (error) {
        console.log(error)
    }

}


export function* handleDeliveryMethod(data) {

console.log('type',data)

    try {
        if (data.type == 'SET_PARCEL') {
            const response = yield setParcelAPI(data.payload)
         console.log('data.payload',data.payload)
            
            // const response1 = yield getPurchaseDetails(data.payload)
            // yield put(purchaseDetails(response1))

            const response1 = yield getPurchaseDetails(data.payload)
            yield put(purchaseDetails(response1))


        }
        else {
            const response = yield setDeliveryAPI(data.payload)
            const response1 = yield getPurchaseDetails(data.payload)
            yield put(purchaseDetails(response1))
           
            // const response1 = yield getPurchaseDetails(data.payload)
            // yield put(purchaseDetails(response1))

            
        }

    } catch (error) {
        console.log(error)
    }

}




export function* handleStoreDisplaySettings() {


    try {
        const response = yield getStoreDisplaySettingsAPI()
        const { data } = response;

        yield put(setStoreDisplaySettings(data))

    } catch (error) {
        console.log(error)
    }

}


export function* handleFetchBackendCart({ payload }) {


    try {
        if (payload) {
            const response = yield getCartDetails(payload)
            const { data } = response;
            const response1 = yield getPurchaseDetails(response.data.purchase_id)
            yield put(setBackendCart(data))
            yield put(purchaseDetails(response1))
        }
        else {
            yield put(setBackendCart())
            yield put(purchaseDetails())
        }

    } catch (error) {
        message.error("Something Error Occurd. Remove this item and try again");
    }

}

export function* handleFetchPurchaseDetails({ payload, setLoading }) {
    console.log('purch', payload)
    try {
        if (payload) {
            const response = yield getPurchaseDetails(payload)
            yield put(purchaseDetails(response))
        }
        else {
            yield put(purchaseDetails())
        }

        // setLoading(false)

    } catch (error) {
        console.log(error)
    }

}

export function* handleFetchWishlistDetails({ payload }) {

    try {
        const response = yield getWishlistAPI(payload)
        const { data } = response;
        yield put(setWishlistDetails(data))
    } catch (error) {
        message.error("Something Error Occurd. Remove this item and try again");
    }

}

// PDP PAGA SAGAS

export function* handleFetchItemDetails({ payload }) {
    try {
        const response = yield getItemDetails(payload.itemId, payload.customerId)
        const { data } = response;
        yield put(setItemDetails(data))

    } catch (error) {
        console.log(error)
    }

}

export function* handleFetchVariants({ payload }) {
    try {
        const response = yield getItemVariants(payload)
        const { data } = response;

        yield put(setVariants(data))

    } catch (error) {
        console.log(error)
    }

}

export function* handleFetchItemSpecification({ payload }) {
    try {
        const response = yield getItemSpecification(payload)
        const { data } = response;
        yield put(setSpecification(data))

    } catch (error) {
        console.log(error)
    }

}

export function* handleFetchAdditionalInfo({ payload }) {
    try {
        const response = yield getItemInfo(payload)
        const { data } = response;
        yield put(setAdditionalInfo(data))

    } catch (error) {
        console.log(error)
    }

}

export function* handleFetchRelatedItems({ payload }) {
    try {
        const response = yield getSimilarItems(payload)
        const { data } = response;
        yield put(setRelatedItems(data))

    } catch (error) {
        console.log(error)
    }

}

// END OF PDP PAGE


// PLP PAGE

export function* handleItems({ type, payload }) {

    console.log('routertype', type)

    try {

        if (type == 'GET_CATEGORICAL_ITEMS') {
            const response = yield getCategoricalItems(payload)
            const { data } = response;
            if (payload.page != 1) {
                payload.setItems([...payload.items, ...data])
            }
            else {
                payload.setItems(data)
            }
            payload.setLoading(false)
        }
        else if (type == 'GET_INITIAL_ITEMS') {
            console.log('initial', payload)
            const response = yield getInitialItems(payload)
            const { data } = response;

            console.log('response.data sagas', response)



            if (payload.page != 1) {
                payload.setItems([...payload.items, ...data])
            }
            else {
                payload.setItems(data)
            }
            payload.setLoading(false)
        }
        else if (type == 'GET_SEARCH_ITEMS') {
            const response = yield getSearchItems(payload)
            const { data } = response;
            if (payload.page != 1) {
                payload.setItems([...payload.items, ...data])
            }
            else {
                payload.setItems(data)
            }
            payload.setLoading(false)
        }
        else if (type == 'GET_CATEGORIES') {
            const response = yield getCategories(payload)
            const { data } = response;
            payload.setCategories(data)
        }
    } catch (error) {
        console.log(error)
    }
}

export function* handleHomePage({ type, storeId, setData, setLoading, loading }) {

    try {

        console.log('data', setData)
        if (type == 'GET_BANNER_IMAGES') {
            const response = yield getBannerImages(storeId)
            const { data } = response;
            setData(data)
            console.log('loaddding', loading)

            setLoading(false)
        }
        else if (type == 'GET_NEW_ARRIVALS') {
            const response = yield getNewArrivals(storeId)
            const { data } = response;
            setData(data)
        }
        else if (type == 'GET_FEATURED_PRODUCTS') {
            const response = yield getFeaturedProducts(storeId)
            const { data } = response;
            setData(data)
        }
    }
    catch (error) {
        console.log(error)
    }
}


export function* handleSocialProfile({ type, payload }) {

    try {

        if (type == 'GET_SOCIAL_PROFILE') {
            const response = yield getSocialProfile(payload)
            console.log('response', response, data)
            const { data } = response;
            console.log('reducer data sagas', response, data)
            yield put(setSocialProfileAction(data))
        }
    }
    catch (error) {
        console.log(error)
    }
}

// LOGIN 

export function* handleAuthentication({ type, payload }) {

    console.log('payload login ', payload, payload.inputSignUp)

    try {

        if (type == 'CUSTOMER_SIGN_UP') {
            const response = yield customerSignUp({ payload })

            const { data } = response;
            console.log('data', data, data.message, data.message != 'Phone number is already taken')
            if (data.message != 'Email is already taken' && data.message != 'Phone number is already taken') {
                payload.setCustomerId(data.customerDetails.customer_id)
                console.log('payload.cust', data.customerDetails)

                // payload.customerDetails(data.customerDetails)
            }
            payload.setMessage(data.message)


        }
        else if (type == 'CUSTOMER_LOGIN') {

            const response = yield customerLogIn({ payload })

            const { data } = response;
            if (data?.customerDetails?.is_account_verified == "Y") {
                console.log(data.message)
                payload.customerDetails(data.customerDetails)
                payload.setMessage(data.message)

            }
            else if (data?.message == 'Invalid Credentials') {
                payload.setMessage(data.message)
            }
            else if (data?.message == 'User does not exist!. Please Signup and try again') {
                payload.setMessage(data.message)
            }
            else {
                payload.setMessage('Please Verify Your Account')
            }


        }
        else if (type == 'FORGOT_PASSWORD') {

            const response = yield forgotPasswordAPI({ payload })

            const { data } = response;

            payload.setMessage(data.message)
            console.log('forgot password indi', data)

            payload.setCustomerId(data.customerId)
        }
        else if (type == 'VERIFY_FORGOT_OTP') {

            const response = yield verifyForgotOtp(payload)

            const { data } = response;

            payload.setMessage(data.message)

            payload.customerDetails(data.customerDetails)
        }
        else if (type == 'RESET_PASSWORD') {

            const response = yield resetPasswordAPI(payload)

            const { data } = response;

            // payload.setMessage(data.message)

            payload.setWalletTransactions(data)
        }

        else if (type == 'VERIFY_OTP') {

            const response = yield verifyOtpAPI(payload)

            const { data } = response;

            payload.setWalletTransactions(data)
        }
    }
    catch (error) {
        console.log(error)
    }
}



// Wallet Feature

export function* handleWallet({ type, payload }) {

    console.log('handle wallet', type, payload)

    try {

        if (type == 'GET_WALLET_INFO') {
            const response = yield getWalletAmount(payload)

            const { data } = response;

            yield put(setWalletInfoAction(data))
            console.log('handle payload', payload, payload.setLoading)
            payload?.setLoading ? payload?.setLoading(false) : ''
        }
        else if (type == 'GET_WALLET_TRANSACTIONS') {

            const response = yield getWalletTransactions(payload)

            const { data } = response;

            payload.setWalletTransactions(data)
            payload.setLoading(false)
        }
    }
    catch (error) {
        console.log(error)
    }
}


export function* handleCoupon(payload) {

    console.log('ytype', payload, payload.type, payload.payload)

    try {
        if (payload.type == 'COUPON_APPLY') {
            const response = yield couponApply(payload.payload)

            const { data } = response;
            console.log('data.messsage', data.message, payload)

            if (data.message == 'Invalid Coupon Code') {
                payload.payload.message.error(data.message)
                payload.payload.setMsg(data.message)
                payload.payload.setLoading(false)

            }
            else {

                payload.payload.message.success('Coupon Applied Successfully')
                payload.payload.setMsg(data.message)
                payload.payload.setLoading(false)
                payload.payload.setValidCoupon(true)
                if (data) {

                    const response1 = yield getPurchaseDetails(payload.payload.purchaseId)
                    yield put(purchaseDetails(response1))



                }


            }

            // if (data.message == 'Invalid Coupon Code') {
            //     payload.message.error(data.message)
            //   }
            //   else {

            //     payload.message.success('Coupon Applied Successfully')
            //     payload.setValidCoupon(true)
            //   }

        } else {
            console.log('coupon remove payload', payload)
            const response = yield removeCoupon(payload.orderId)

            const { data } = response;
            console.log('data.messsage', data.message, payload)
            const response1 = yield getPurchaseDetails(payload.purchaseId)
            yield put(purchaseDetails(response1))

            // if (data.message == 'Invalid Coupon Code') {
            //     payload.message.error(data.message)
            //   }
            //   else {

            //     payload.message.success('Coupon Applied Successfully')
            //     payload.setValidCoupon(true)
            //   }


        }




    }
    catch (error) {
        console.log(error)
    }
}




// Wishlist Feature

export function* handleWishlistItems({ type, payload }) {

    console.log('wish type', type, payload)

    if (type == 'GET_WISHLIST_ITEMS') {
        try {
            const response = yield getWishlistAPI(payload)
            const { data } = response;

            if (data.length === 0 || data.length < 9) {
                payload.setNoMoreWishlist(false)
            }
            else {
                payload.setPage(payload.page + 1)
                payload.setNoMoreWishlist(true)
            }
            if (payload.page == 1) {

                payload.setWishlist(data)
                // yield put(setWishlistDetails(data))
                yield put(setWishlistItems(data))


            } else {
                payload.setWishlist([...payload.wishlist, ...data])
                yield put(setWishlistItems(data))
            }
            if (payload?.setLoading) {
                payload.setLoading(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    else if (type == 'REMOVE_FROM_WISHLIST') {

        try {
            const response = yield deleteFromWishlist(payload.primaryKey)
            payload.setState(!payload.state)
            payload.message.success('Product Removed From Wishlist')

        }
        catch (error) {
            console.log(error)
        }
    }

}


export function* handleAddress({ type, payload }) {

    console.log('response.typeee address', type, payload)

    if (type == 'ADD_ADDRESS') {

        const response = yield addAddress(payload.customerId, payload.address)

        try {
            if (response) {
                // payload.message.success(`${payload.edit ? `Address Updated Successfully` : `Address added Successfully`}`)

                payload.toast.success(`${payload.edit ? `Address Updated Successfully` : `Address added Successfully`}`, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

                payload.setLoading(false)
                payload.setBool(!payload.bool)
            }
            else {
                // payload.message.error('Something is wrong')

                payload.toast('Something is wrong', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
                payload.setLoading(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    else if (type == 'EDIT_ADDRESS') {
        const response = yield editAddressAPI(payload.customerId, payload.addressId, payload.address)

        try {
            if (response) {
                // payload.message.success(`${payload.edit ? `Address Updated Successfully` : `Address added Successfully`}`)

                payload.toast.success(`${payload.edit ? `Address Updated Successfully` : `Address added Successfully`}`, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });


                payload.setLoading(false)
                payload.setBool(!payload.bool)
            }
            else {
                // payload.message.error('Something is wrong')
                payload.toast('Something is wrong', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                payload.setLoading(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    else if (type == 'GET_ADDRESS') {
        console.log('payyload', payload)
        const response = yield getAddressList(payload)

        const { data } = response;
        try {
            if (response) {
                yield put(setAddressAction(data))

            }
        }
        catch (error) {
            console.log(error)
        }
    }

}


// Sort and Filter

export function* handleFiltersGroup({ payload }) {

    console.log('filter sagas', payload, payload.payload.storeId, payload.payload.setFiltersGroup)


    try {
        const res = yield filterApi('storeId');


        if (res.data) {

            payload.payload.setFiltersGroup(res.data)
        }

    } catch (error) {
        // yield put(errorOnProductDetailPage(error))
    }

}



export function* handleCancelOrder({ orderId, payload, setMsg }) {

    console.log('payload sagas cancel', orderId, payload, setMsg)

    try {
        const res = yield cancelOrder(orderId, payload.payload);


        if (res.data) {
            setMsg(res.data)

            // payload.payload.setFiltersGroup(res.data)
        }

    } catch (error) {
        // yield put(errorOnProductDetailPage(error))
    }

}