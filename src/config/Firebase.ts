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
          reject(new Error("Auth State Changed failed"));
        }
      });
    });

  public setAuthPersistance = () =>
    setPersistence(this.auth, browserLocalPersistence);
}

const firebase = new Firebase();
export default firebase;
