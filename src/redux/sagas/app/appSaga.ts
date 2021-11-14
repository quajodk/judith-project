import { IProduct, IUser } from "./../../../utils/models/index";
import {
  ADD_PRODUCT,
  AUTH_STATE_CHANGE,
  CLOSE_NOTIFICATION,
  PERSIST_USER,
  REMOVE_FROM_CART,
  ROUTE_TO_DASHBOARD,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  TOGGLE_CART,
} from "./../../../utils/constants/index";
import { call, put } from "redux-saga/effects";
import { ADD_TO_CART } from "../../../utils/constants";
import {
  addToCart,
  removeFromCart,
  setAdminUser,
  setNotificationMassage,
  setNotify,
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
          yield put(setRoute(ROUTE_TO_DASHBOARD));
        }
      } catch (error) {
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

        // implement user creation logic
      } catch (error) {
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

        yield console.log(result);

        if (result) {
          const doc: DocumentSnapshot = yield call(
            firebase.getUser,
            result.uid
          );

          if (doc.exists()) {
            const user: IUser = doc.data() as IUser;
            yield put(setAdminUser(user));
            // yield put(setRoute(ROUTE_TO_DASHBOARD));
          }
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
