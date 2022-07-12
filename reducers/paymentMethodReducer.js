import { PAYMENT_METHOD } from "../constants/actionTypes";

const initialState = [];

const paymentMethodReducer = (state = initialState, action) => {

    switch (action.type) {

        case PAYMENT_METHOD: {
            const data = action.payload;
            return {
                ...state, data
            }
        }
        default:
            return state;
    }
}
export default paymentMethodReducer