import { SET_STORE_DETAILS } from "../constants/actionTypes";

const initialState = {};

const storeDetailsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_STORE_DETAILS:
            const data = action.payload;
            return {
                ...state, data
            }

        default:
            return state;
    }
}
export default storeDetailsReducer