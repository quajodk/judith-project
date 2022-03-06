import { IProduct } from "../../utils/models";
import * as types from "../../utils/constants";
import { DocumentReference } from "@firebase/firestore/dist/lite";

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

export const signIn = (email: string, password: string) => ({
  type: types.SIGN_IN,
  payload: {
    email,
    password,
  },
});

export const signup = (obj: Record<string, any>) => ({
  type: types.SIGN_UP,
  payload: obj,
});

export const addProduct = (obj: Record<string, any>) => ({
  type: types.ADD_PRODUCT,
  payload: obj,
});

export const persistUser = () => ({
  type: types.PERSIST_USER,
});

export const signOut = () => ({
  type: types.SIGN_OUT,
});

export const authStateChange = () => ({
  type: types.AUTH_STATE_CHANGE,
});

export const getProducts = (lastDoc?: DocumentReference) => ({
  type: types.GET_PRODUCTS,
  payload: lastDoc,
});

export const getProduct = (id: string) => ({
  type: types.GET_PRODUCT,
  payload: id,
});

export const orderProduct = (order: Record<string, any>) => ({
  type: types.ORDER_PRODUCT,
  payload: order,
});
