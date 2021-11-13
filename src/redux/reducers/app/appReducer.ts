import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "uuidv4";
import { IOrder, IProduct, IUser } from "../../../utils/models";

interface AppState {
  products: IProduct[];
  cart: IOrder | null;
  totalCartItems: number;
  notify: boolean;
  notificationMessage: Record<string, any> | null;
  openCart: boolean;
  adminUser: IUser | null;
  currentRoute: string | null;
}

const initialState: AppState = {
  products: [],
  cart: null,
  totalCartItems: 0,
  notify: false,
  notificationMessage: null,
  openCart: false,
  adminUser: null,
  currentRoute: null,
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = [action.payload, ...state.products];
    },
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;

      const cart = state.cart;
      if (cart) {
        state.cart = cart?.products.some((x) => x.product.id === product.id)
          ? {
              ...cart,
              products: cart.products.map((x) => {
                if (x.product.id === product.id) {
                  return {
                    ...x,
                    quantity: x.quantity + 1,
                  };
                }
                return x;
              }),
              totalPrice: cart.totalPrice + product.price,
            }
          : {
              ...cart,
              products: [...cart.products, { product, quantity: 1 }],
              totalPrice: cart.totalPrice + product.price,
            };
      } else {
        state.cart = {
          id: uuid(),
          products: [{ product, quantity: 1 }],
          date: new Date().toLocaleDateString(),
          totalPrice: product.price,
        };
      }
      state.totalCartItems = state.totalCartItems + 1;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.cart = {
        ...state.cart,
        products:
          state.cart?.products?.filter(
            (item) => item?.product.id !== action.payload.id
          ) ?? [],
        totalPrice:
          (state.cart?.totalPrice ?? 0) -
          (action.payload?.price || 0) *
            (state.cart?.products.find(
              (x) => x.product.id === action.payload.id
            )?.quantity ?? 0),
      } as IOrder;
      state.totalCartItems = state.cart?.products.length || 0;
    },
    setNotify: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    setNotificationMassage: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.notificationMessage = action.payload;
    },
    toggleCart: (state) => {
      state.openCart = !state.openCart;
    },
    setAdminUser: (state, action: PayloadAction<IUser>) => {
      state.adminUser = action.payload;
    },
    setRoute: (state, action: PayloadAction<string>) => {
      state.currentRoute = action.payload;
    },
    signOut: (state) => {
      state.adminUser = null;
      localStorage.clear();
    },
  },
});

export const {
  addProduct,
  addToCart,
  removeFromCart,
  setNotify,
  setNotificationMassage,
  toggleCart,
  setAdminUser,
  setRoute,
  signOut,
} = appReducer.actions;

export default appReducer.reducer;
