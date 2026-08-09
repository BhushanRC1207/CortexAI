// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-222dd.firebaseapp.com",
  projectId: "cortexai-222dd",
  storageBucket: "cortexai-222dd.firebasestorage.app",
  messagingSenderId: "511696649384",
  appId: "1:511696649384:web:3c8573a254f7ddd800569d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
