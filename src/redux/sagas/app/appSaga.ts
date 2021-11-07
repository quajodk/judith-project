import {
  CLOSE_NOTIFICATION,
  REMOVE_FROM_CART,
  TOGGLE_CART,
} from "./../../../utils/constants/index";
import { put } from "redux-saga/effects";
import { ADD_TO_CART } from "../../../utils/constants";
import {
  addToCart,
  removeFromCart,
  setNotificationMassage,
  setNotify,
  toggleCart,
} from "../../reducers/app/appReducer";

function* appSaga({ type, payload }: { type: string; payload: any }) {
  switch (type) {
    case ADD_TO_CART:
      const message = {
        type: ADD_TO_CART,
        message: payload,
      };
      yield put(setNotificationMassage(message));
      yield put(addToCart(payload));
      yield put(setNotify(true));
      break;
    case CLOSE_NOTIFICATION:
      yield put(setNotify(false));
      break;
    case TOGGLE_CART:
      yield put(toggleCart());
      break;
    case REMOVE_FROM_CART:
      yield put(removeFromCart(payload));
      break;
    default:
      yield console.log("its mean saga is working");
      break;
  }
}

export default appSaga;
