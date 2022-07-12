import wishlistActionType from "../constants/actionTypes";

const initialState = {};

const wishlistDetailsReducer = (state = initialState, action) => {

    switch (action.type) {

        case wishlistActionType.SET_WISHLIST_ITEMS:
            const data = action.payload;
            return {
                ...state, data
            }

        default:
            return state;
    }
}
export default wishlistDetailsReducer