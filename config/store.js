import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import createSagaMiddleware from "@redux-saga/core";
import { watcherSaga } from "../sagas";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const persistConfig = {
    key: 'persistKey',
    storage,
    whitelist: [
        'store','cartReducer','checkoutReducer','customerDetailsReducer','storeSettingsReducer','storeDetailsReducer','walletReducer','wishlistDetailsReducer','paymentMethodReducer'
    ],
    // blacklist: ['storeDetailsReducer','storeIdReducer']
    // whitelist: ['cart', 'checkout']
}

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware, logger]
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))
const persistor = persistStore(store)
sagaMiddleware.run(watcherSaga)

export default store
export { persistor }