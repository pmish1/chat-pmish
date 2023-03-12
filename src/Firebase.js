// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDV_zPSuE5982987NoYF5KuaEk66VqIUxQ",
  authDomain: "whats-app-44493.firebaseapp.com",
  projectId: "whats-app-44493",
  storageBucket: "whats-app-44493.appspot.com",
  messagingSenderId: "172811690035",
  appId: "1:172811690035:web:cf048858663ea2c1370346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)