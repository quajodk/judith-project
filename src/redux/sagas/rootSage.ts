import {
  ADD_TO_CART,
  CLOSE_NOTIFICATION,
  REMOVE_FROM_CART,
  TOGGLE_CART,
} from "./../../utils/constants/index";
import { takeLatest } from "redux-saga/effects";
import appSaga from "./app/appSaga";

function* rootSaga() {
  yield takeLatest(
    [ADD_TO_CART, CLOSE_NOTIFICATION, TOGGLE_CART, REMOVE_FROM_CART],
    appSaga
  );
}

export default rootSaga;
