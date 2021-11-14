import {
  ADD_PRODUCT,
  ADD_TO_CART,
  AUTH_STATE_CHANGE,
  CLOSE_NOTIFICATION,
  PERSIST_USER,
  REMOVE_FROM_CART,
  SIGN_IN,
  SIGN_OUT,
  TOGGLE_CART,
} from "./../../utils/constants/index";
import { takeLatest } from "redux-saga/effects";
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
    ],
    appSaga
  );
}

export default rootSaga;
