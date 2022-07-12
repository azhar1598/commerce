import { STORE_SETTINGS, SET_STORE_SETTINGS, SET_SHOP_WIDGETS, GET_SHOP_SEO_SUCCESS } from "../constants/actionTypes";

const initialState = {
    widgets: null,
    seo: null
};

const storeSettingsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_STORE_SETTINGS:
            const data = action.payload;
            return {
                ...state, data
            }
        case SET_SHOP_WIDGETS:
            const widgets = action.payload;
            return {
                ...state, widgets
            }
        case GET_SHOP_SEO_SUCCESS:
            const seo = action.payload;
            return {
                ...state,
                seo: seo,
                // isReadyToGo: isReady({ ...state, seo: true })
            }

        default:
            return state;
    }
}
export default storeSettingsReducer