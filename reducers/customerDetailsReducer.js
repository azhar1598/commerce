import {CUSTOMER_DETAILS } from "../constants/actionTypes";

const initialState = []

const customerDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_DETAILS:
            const data=action.payload
            return {
                ...state,
                data
            }

        default:
            return state
    }

}
export default customerDetailsReducer;