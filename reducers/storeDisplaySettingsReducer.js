import {  SET_STORE_DISPLAY_SETTINGS } from "../constants/actionTypes";

const initialState = {};

const storeDisplaySettingsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_STORE_DISPLAY_SETTINGS:
            const data = action.payload;
            return {
                ...state, data
            }

        default:
            return state;
    }
}
export default storeDisplaySettingsReducer