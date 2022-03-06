import { IProduct, IUser } from "./../../../utils/models/index";
import {
  ADD_PRODUCT,
  AUTH_STATE_CHANGE,
  CLOSE_NOTIFICATION,
  GET_PRODUCTS,
  ORDER_PRODUCT,
  PERSIST_USER,
  REMOVE_FROM_CART,
  ROUTE_TO_DASHBOARD,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  TOGGLE_CART,
  ADD_TO_CART,
  GET_PRODUCT,
} from "./../../../utils/constants";
import { call, put, select, SelectEffect } from "redux-saga/effects";
import {
  addProduct,
  addToCart,
  clearCart,
  removeFromCart,
  setAdminUser,
  setIsAuthenticating,
  setNotificationMassage,
  setNotify,
  setPaymentSuccess,
  setProduct,
  setRoute,
  signOut,
  toggleCart,
} from "../../reducers/app/appReducer";
import firebase from "../../../config/Firebase";
import { User, UserCredential } from "@firebase/auth";
import {
  DocumentReference,
  DocumentSnapshot,
} from "@firebase/firestore/dist/lite";
import store, { RootState } from "../../store";

function selectState<T>(selector: (s: RootState) => T): SelectEffect {
  return select(selector);
}

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
    case SIGN_IN:
      try {
        const result: UserCredential = yield call(
          firebase.signIn,
          payload.email,
          payload.password
        );
        const doc: DocumentSnapshot = yield call(
          firebase.getUser,
          result.user.uid
        );

        if (doc.exists()) {
          const user: IUser = doc.data() as IUser;
          yield put(setAdminUser(user));
          yield put(setIsAuthenticating(false));
          yield put(setRoute(ROUTE_TO_DASHBOARD));
        }
      } catch (error) {
        yield put(setIsAuthenticating(false));
        yield console.log(error);
      }
      break;
    case SIGN_UP:
      try {
        const result: UserCredential = yield call(
          firebase.createAccount,
          payload.registerObj.email,
          payload.registerObj.password
        );

        const user = {
          email: payload.registerObj.email,
          name: payload.registerObj.name,
          isAdmin: false,
        };
        yield call(firebase.addUser, result.user.uid, user);
        yield put(setIsAuthenticating(false));
        // implement user creation logic
      } catch (error) {
        yield put(setIsAuthenticating(false));
        yield console.log(error);
      }
      break;
    case ADD_PRODUCT:
      try {
        const productFile = {
          productName: payload.title,
          fileUrl: payload.productFile,
        };

        const productDoc: DocumentReference = yield call(
          firebase.addProductFile,
          productFile
        );

        const product: IProduct = {
          id: payload.id,
          title: payload.title,
          price: payload.price,
          imageSrc: payload.imageSrc,
          imageAlt: payload.imageAlt,
          description: payload.description,
          isAvailable: payload.isAvailable,
          tags: payload.tags,
          currency: payload.currency,
          productFile: productDoc.id,
        };

        yield call(firebase.addProduct, payload.id, product);
      } catch (error) {
        yield console.log(error);
      }
      break;
    case PERSIST_USER:
      try {
        yield call(firebase.setAuthPersistance);
      } catch (error) {
        yield console.log(error);
      }
      break;
    case SIGN_OUT:
      yield call(firebase.signOut);
      yield put(signOut());
      break;
    case AUTH_STATE_CHANGE:
      try {
        const result: User | null = yield call(firebase.onAuthStateChanged);

        if (result) {
          const doc: DocumentSnapshot = yield call(
            firebase.getUser,
            result.uid
          );

          if (doc.exists()) {
            const user: IUser = doc.data() as IUser;
            yield put(setAdminUser(user));
          }
          yield put(setIsAuthenticating(false));
        }
      } catch (error) {
        yield put(setIsAuthenticating(false));
        yield console.log(error);
      }
      break;
    case GET_PRODUCTS:
      try {
        const selector = (
          state: RootState
        ): ReturnType<typeof store.getState> => state.app;
        const state: ReturnType<typeof selector> = selectState(
          selector
        ) as unknown as ReturnType<typeof selector>;
        const result: Record<string, any> = yield call(
          firebase.getProducts,
          payload
        );

        if (result?.product?.length !== 0) {
          yield put(
            addProduct({
              products: result.products,
              lastDocRef: result.lastDoc
                ? result.lastDoc
                : state.app.lastDocRef,
              total: result.total ? result.total : state.app.total,
            })
          );
        }
      } catch (error) {
        yield console.log(error);
      }
      break;
    case ORDER_PRODUCT:
      try {
        const orderObj = {
          billingAddress: {
            address: payload.address,
            city: payload.city,
            country: payload.country,
            postalCode: payload.postalCode,
            state: payload.state,
          },
          email: payload.email,
          phone: payload.phone,
          payment: {
            nameOnCard: payload.cardName,
            isCardValid: payload.isCardValid ? payload.isCardValid : false,
            cardType: payload.cardType ? payload.cardType : "",
          },
          products: payload.products.map(
            (product: Record<string, any>) => product?.product.id
          ),
          files: payload.products.map(
            (product: Record<string, any>) => product?.product?.productFile
          ),
          total: payload.totalPrice,
        };

        const result: DocumentReference = yield call(
          firebase.orderProduct,
          orderObj
        );

        if (result) {
          const getFiles = async () => {
            const result: unknown[] = [];
            await Promise.all(
              orderObj.files.map(async (file: string) => {
                const fileObj: DocumentSnapshot = await firebase.getProductFile(
                  file
                );

                return {
                  path: fileObj?.data()?.fileUrl,
                  filename: fileObj?.data()?.productName,
                };
              })
            )
              .then((res) => {
                result.push(...res);
              })
              .catch((err) => console.log(err));

            return result;
          };

          const files: unknown[] = yield call(getFiles);

          yield console.log(files);

          const mail = {
            to: payload.email,
            message: {
              subject: `Order Confirmation #${result.id}`,
              html: `<p>Thank you for your order! Your order #${result.id} has been processed successfully. Attached is a link download your file</p>`,
              text: `Thank you for your order! Your order #${result.id} has been processed successfully. Attached is a link download your file`,
              attachments: files,
            },
          };

          const doc: DocumentReference = yield call(firebase.sendMail, mail);

          if (doc.id) {
            // clear cart
            yield put(clearCart());
            // set payment success modal
            yield put(setPaymentSuccess(true));
          }
        }
      } catch (error) {
        yield console.log(error);
      }
      break;
    case GET_PRODUCT:
      try {
        const result: DocumentSnapshot = yield call(
          firebase.getProduct,
          payload
        );

        if (result.exists()) {
          const product: IProduct = {
            id: result.id,
            ...result.data(),
          } as IProduct;
          yield put(setProduct(product));
        }
      } catch (error) {
        yield console.log(error);
      }
      break;
    default:
      yield console.log("its mean saga is working");
      break;
  }
}

export default appSaga;
