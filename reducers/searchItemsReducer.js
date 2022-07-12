import { SEARCH_ITEMS } from "../constants/actionTypes";

const initialState = [];

const searchItemsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEARCH_ITEMS: {
            const data = action.searchItems;
            return {
                ...state, data
            }
        }
        default:
            return state;
    }
}
export default searchItemsReducer