import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_TO_CART,
  AUTH_STATE_CHANGE,
  CLOSE_NOTIFICATION,
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_ORDER,
  GET_ORDERS,
  GET_PRODUCT,
  GET_PRODUCTS,
  ORDER_PRODUCT,
  PERSIST_USER,
  REMOVE_FROM_CART,
  SIGN_IN,
  SIGN_OUT,
  TOGGLE_CART,
} from "./../../utils/constants/index";
import { /*takeEvery,*/ takeLatest } from "redux-saga/effects";
import appSaga from "./app/appSaga";

function* rootSaga() {
  yield takeLatest(
    [
      ADD_TO_CART,
      CLOSE_NOTIFICATION,
      TOGGLE_CART,
      REMOVE_FROM_CART,
      SIGN_IN,
      ADD_PRODUCT,
      PERSIST_USER,
      SIGN_OUT,
      AUTH_STATE_CHANGE,
      GET_PRODUCTS,
      ORDER_PRODUCT,
      GET_PRODUCT,
      GET_ALL_PRODUCTS,
      ADD_CATEGORY,
      GET_CATEGORIES,
      GET_ORDERS,
      GET_ORDER,
    ],
    appSaga
  );
}

export default rootSaga;
