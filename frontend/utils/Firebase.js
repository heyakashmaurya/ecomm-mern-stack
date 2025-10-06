import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp , getApps  } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "login-aa6ad.firebaseapp.com",
  projectId: "login-aa6ad",
  storageBucket: "login-aa6ad.firebasestorage.app",
  messagingSenderId: "872613739634",
  appId: "1:872613739634:web:12e9fe9787fd95cc4056eb"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth, provider}