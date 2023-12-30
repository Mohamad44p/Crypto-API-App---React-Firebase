import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqlhERnCemceARhAMhAzI1GcsynVRAAYI",
  authDomain: "cryptobase-d4836.firebaseapp.com",
  projectId: "cryptobase-d4836",
  storageBucket: "cryptobase-d4836.appspot.com",
  messagingSenderId: "929336647236",
  appId: "1:929336647236:web:25ef40f0aacf0171a62611"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app