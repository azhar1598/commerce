import { combineReducers } from "redux";
import storeSettingsReducer from "./storeSettingsReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import customerDetailsReducer from "./customerDetailsReducer";
import searchItemsReducer from "./searchItemsReducer";
import storeDetailsReducer from "./storeDetailsReducer";
import wishlistDetailsReducer from "./wishlistReducer";
import itemDetailsReducer from "./itemDetailsReducer";
import socialProfileReducer from "./socialProfileReducer";
import walletReducer from "./walletReducer";
import mobileHeaderReducer from "./mobileHeaderReducer";
import addressReducer from "./addressReducer"
import paymentMethodReducer from "./paymentMethodReducer";
import storeDisplaySettingsReducer from "./storeDisplaySettingsReducer";

const rootReducer = combineReducers({
    storeSettingsReducer,       
    storeDetailsReducer,
    cartReducer,
    checkoutReducer,
    customerDetailsReducer,
    searchItemsReducer,
    wishlistDetailsReducer,
    itemDetailsReducer,
    socialProfileReducer,
    walletReducer,
    mobileHeaderReducer,
    addressReducer,
    paymentMethodReducer,
    storeDisplaySettingsReducer

})

export default rootReducer