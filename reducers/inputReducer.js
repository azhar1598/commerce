import { SEARCH_ITEMS } from "../constants/actionTypes";

const initialState = [];

const inputReducer = (state = initialState, action) => {

    switch (action.type) {

        case INPUT: {
            const data = action.payload;
            return {
                ...state, data
            }
        }
        default:
            return state;
    }
}
export default inputReducer