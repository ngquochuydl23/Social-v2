import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported, Messaging } from "firebase/messaging";

// export const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

export const firebaseConfig = {
    apiKey: "AIzaSyAdAtxJC0UbdEYDFhYvuOqB2DWusveb0hY",
    authDomain: "social-v2-b4278.firebaseapp.com",
    projectId: "social-v2-b4278",
    storageBucket: "social-v2-b4278.appspot.com",
    messagingSenderId: "525126960453",
    appId: "1:525126960453:web:335855b869ae7892886a2c",
    measurementId: "G-FYS9VE398K"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const messaging = async (): Promise<Messaging | undefined> => {
  return (await isSupported()) ? getMessaging(app) : undefined;
};