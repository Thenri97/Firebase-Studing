// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBWr0Sd_eS8JJn5Nvr2nU_4XDttzuLEtT8",
  authDomain: "tutorial-1a1c6.firebaseapp.com",
  projectId: "tutorial-1a1c6",
  storageBucket: "tutorial-1a1c6.appspot.com",
  messagingSenderId: "536791520475",
  appId: "1:536791520475:web:148db3b39327953eade8fe",
  measurementId: "G-CMF819H5EX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app);
export const storage = getStorage(app);