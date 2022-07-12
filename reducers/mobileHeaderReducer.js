import { HIDE_CART, MOBILE_SEARCH } from "../constants/actionTypes";

const initialState = [];

const mobileHeaderReducer = (state = false, action) => {

    switch (action.type) {

        case MOBILE_SEARCH: {
            const data = action.payload;
            return {
                ...state, data
            }
        }
        case HIDE_CART: {
            const data = action.payload;
            return {
                ...state, data
            }
        }
        default:
            return state;
    }
}
export default mobileHeaderReducer