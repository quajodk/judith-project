import { IProduct } from "../../utils/models";
import * as types from "../../utils/constants";

export const addToCart = (product: IProduct) => ({
  type: types.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (product: IProduct) => ({
  type: types.REMOVE_FROM_CART,
  payload: product,
});

export const closeNotification = () => ({
  type: types.CLOSE_NOTIFICATION,
});

export const toggleCart = () => ({
  type: types.TOGGLE_CART,
});
