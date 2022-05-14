import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { AuthProviders } from "../constants/providers.enum";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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
      console.error("Invalid provider");
  }
  if (authProvider) {
    signInWithPopup(auth, authProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

const analytics = getAnalytics(app);
