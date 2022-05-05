import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./app/appReducer";

const persistConfig = {
  key: "@omega-app",
  storage,
  blacklist: [
    "loadingProducts",
    "loadingCategories",
    "loadingOrders",
    "addingProduct",
    "addingCategory",
    "openCart",
    "done",
    "fetchingProduct",
    "countryCode",
  ],
};

const reducers = combineReducers({
  // reducers
  app: persistReducer(persistConfig, appReducer),
});

export default reducers;
