import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers/rootReducer";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "loadingProducts",
    "loadingCategories",
    "loadingOrders",
    "addingProduct",
    "addingCategory",
    "products",
    "lastDocRef",
    "openCart",
  ],
};

const persistedReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store as default, persistor };
