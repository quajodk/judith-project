import config from "./FirebaseConfig";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  User,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore/lite";
import { IProduct } from "../utils/models";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

class Firebase {
  private app: FirebaseApp = initializeApp(config);

  /**
   *  ** Auth API **
   */
  private auth = getAuth(this.app);

  public createAccount = (email: string, password: string) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  public signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(this.auth, email, password);

  public signOut = () => this.auth.signOut();

  public passwordReset = (email: string) =>
    sendPasswordResetEmail(this.auth, email);

  public passwordUpdate = (user: User, password: string) =>
    updatePassword(user, password);

  public reauthenticate = (password: string) => {
    const user = this.auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user?.email as string,
      password
    );

    return reauthenticateWithCredential(user as User, credential);
  };

  public changePassword = (currentPassword: string, newPassword: string) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          updatePassword(user as User, newPassword)
            .then(() => {
              resolve("Password updated successfully!");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  public changeEmail = (currentPassword: string, newEmail: string) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          updateEmail(user as User, newEmail)
            .then(() => {
              resolve("Email updated successfully!");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  public onAuthStateChanged = () =>
    new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(null);
        }
      });
    });

  public setAuthPersistance = () =>
    setPersistence(this.auth, browserLocalPersistence);

  /**
   * ** Firestore API **
   */
  private db = getFirestore(this.app);

  public addUser = (id: string, user: Record<string, any>) =>
    setDoc(doc(this.db, "users", id), user);

  public getUser = (id: string) => getDoc(doc(this.db, "users", id));

  public addProduct = (id: string, product: IProduct) =>
    setDoc(doc(this.db, "products", id), product);

  public addProductFile = async (productFile: Record<string, any>) =>
    await addDoc(collection(this.db, "files"), productFile);

  /**
   *  ** Storage API **
   */
  private store = getStorage(this.app);

  public uploadToStorage = async ({
    folder,
    file,
  }: {
    folder: string;
    file: File;
  }) => {
    const storageRef = ref(this.store, folder);
    const metadata = {
      contentType: file.type,
    };

    // upload
    const uploadTask = await uploadBytesResumable(storageRef, file, metadata);
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    return { downloadUrl, uploadTask };
  };

  public deleteFile = async (fileName: string) => {
    const storageRef = ref(this.store, fileName);

    await deleteObject(storageRef);
  };
}

const firebase = new Firebase();
export default firebase;
