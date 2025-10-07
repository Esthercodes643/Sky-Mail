import { getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCE7mjksfQK5tk4KIGFMZSYpj4Nd3XpeY",
  authDomain: "sky-mail-787d2.firebaseapp.com",
  projectId: "sky-mail-787d2",
  storageBucket: "sky-mail-787d2.firebasestorage.app",
  messagingSenderId: "1060038818881",
  appId: "1:1060038818881:web:f62f7503484ff73f359ac0",
  measurementId: "G-G6QJT0SQYH"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

 const auth = getAuth(app);
 const db = getFirestore(app);
 const provider = new GoogleAuthProvider();

 export {auth,provider,db};

