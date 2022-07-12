import { FETCH_BACKEND_CART, SET_BACKEND_CART, FETCH_PURCHASE_DETAILS, SET_PURCHASE_DETAILS, PURCHASE_DETAILS, DEFAULT_ADDRESS } from "../constants/actionTypes";

const initialState = {
}

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BACKEND_CART:
            return {
                ...state,
                backendCart: {}
            }
        case SET_BACKEND_CART:
            const { backendCart } = action
            return {
                ...state,
                backendCart
            }

        case PURCHASE_DETAILS:
            const { purchaseDetails } = action
            return {
                ...state,
                purchaseDetails
            }
        case DEFAULT_ADDRESS:
            const  defaultAddress  = action.payload
            return {
                ...state,
                defaultAddress
            }

        default:
            return state
    }

}
export default checkoutReducer;