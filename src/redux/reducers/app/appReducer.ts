import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "uuidv4";
import {
  ICategory,
  ICheckoutOrder,
  ICustomer,
  IOrder,
  IProduct,
  IUser,
} from "../../../utils/models";

interface AppState {
  product: IProduct | null;
  products: IProduct[];
  cart: IOrder | null;
  totalCartItems: number;
  notify: boolean;
  notificationMessage: Record<string, any> | null;
  openCart: boolean;
  adminUser: IUser | null;
  currentRoute: string;
  isAuthenticating: boolean;
  lastDocRef: any | null;
  total: number;
  paymentSuccess: boolean;
  categories: ICategory[];
  totalOrders: number;
  orders: ICheckoutOrder[];
  loadingProducts: boolean;
  loadingOrders: boolean;
  loadingCategories: boolean;
  addingCategory: boolean;
  allProduct: IProduct[];
  allProductTotal: number;
  addingProduct: boolean;
  customer: ICustomer | null;
  fetchingProduct: boolean;
  done: boolean;
}

const initialState: AppState = {
  products: [],
  product: null,
  cart: null,
  totalCartItems: 0,
  notify: false,
  notificationMessage: null,
  openCart: false,
  adminUser: null,
  currentRoute: "",
  isAuthenticating: true,
  lastDocRef: null,
  total: 0,
  paymentSuccess: false,
  categories: [],
  totalOrders: 0,
  orders: [],
  loadingProducts: false,
  loadingOrders: false,
  loadingCategories: false,
  addingCategory: false,
  allProduct: [],
  allProductTotal: 0,
  addingProduct: false,
  customer: null,
  fetchingProduct: false,
  done: false,
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = [...action.payload.products, ...state.products];
      state.lastDocRef = action.payload.lastDocRef;
      state.total = action.payload.total;
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
    setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload;
    },
    setProduct: (state, action: PayloadAction<IProduct>) => {
      state.product = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
      state.totalCartItems = 0;
    },
    setPaymentSuccess: (state, action: PayloadAction<boolean>) => {
      state.paymentSuccess = action.payload;
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setTotalOrders: (state, action: PayloadAction<number>) => {
      state.totalOrders = action.payload;
    },
    setOrders: (state, action: PayloadAction<ICheckoutOrder[]>) => {
      state.orders = action.payload;
    },
    setLoadingProducts: (state, action: PayloadAction<boolean>) => {
      state.loadingProducts = action.payload;
    },
    setLoadingOrders: (state, action: PayloadAction<boolean>) => {
      state.loadingOrders = action.payload;
    },
    setLoadingCategories: (state, action: PayloadAction<boolean>) => {
      state.loadingCategories = action.payload;
    },
    setAddingCategory: (state, action: PayloadAction<boolean>) => {
      state.addingCategory = action.payload;
    },
    setAllProduct: (state, action: PayloadAction<IProduct[]>) => {
      state.allProduct = action.payload;
    },
    setAllProductTotal: (state, action: PayloadAction<number>) => {
      state.allProductTotal = action.payload;
    },
    setAddingProduct: (state, action: PayloadAction<boolean>) => {
      state.addingProduct = action.payload;
    },
    setCustomer: (state, action: PayloadAction<ICustomer | null>) => {
      state.customer = action.payload;
    },
    setFetchingProduct: (state, action: PayloadAction<boolean>) => {
      state.fetchingProduct = action.payload;
    },
    setDone: (state, action: PayloadAction<boolean>) => {
      state.done = action.payload;
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
  setIsAuthenticating,
  setProduct,
  clearCart,
  setPaymentSuccess,
  setCategories,
  setTotalOrders,
  setOrders,
  setLoadingProducts,
  setLoadingOrders,
  setLoadingCategories,
  setAddingCategory,
  setAllProduct,
  setAllProductTotal,
  setAddingProduct,
  setCustomer,
  setFetchingProduct,
  setDone,
} = appReducer.actions;

export default appReducer.reducer;
