// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore: getReactNativePersistence exists in the React Native build
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// export Firebase
export const app = initializeApp(firebaseConfig);

// user stays logged in
const persistence = getReactNativePersistence(ReactNativeAsyncStorage);

function createAuth() {
  try {
    return initializeAuth(app, { persistence });
  } catch {
    return getAuth(app);
  }
}


// Initialize Firebase Authentication and get a reference to the service
export const auth = createAuth();
export const database = getDatabase(app)