// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);
