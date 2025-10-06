// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const firebaseConfig = {
  apiKey: "AIzaSyDCE7mjksfQK5tk4KIGFMZSYpj4Nd3XpeY",
  authDomain: "sky-mail-787d2.firebaseapp.com",
  projectId: "sky-mail-787d2",
  storageBucket: "sky-mail-787d2.firebasestorage.app",
  messagingSenderId: "1060038818881",
  appId: "1:1060038818881:web:f62f7503484ff73f359ac0",
  measurementId: "G-G6QJT0SQYH"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db =getFirestore(app);
export const provider = new GoogleAuthProvider();