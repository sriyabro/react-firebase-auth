import { initializeApp } from "firebase/app";
import {
    AuthErrorCodes,
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { AuthProviders } from "../constants/providers.enum";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInWithProvider = (provider: AuthProviders) => {
  let authProvider;
  switch (provider) {
    case AuthProviders.Google:
      authProvider = new GoogleAuthProvider();
      break;
    case AuthProviders.Facebook:
      authProvider = new FacebookAuthProvider();
      break;
    default:
      return new Promise(() => {
        throw { code: AuthErrorCodes.INVALID_OAUTH_PROVIDER };
      });
  }
  if (authProvider) {
    return signInWithPopup(auth, authProvider);
  }
};

// const analytics = getAnalytics(app);
