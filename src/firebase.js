// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGNuLJfIhHJmmggxFTc4IcmkjFeec2I1o",
  authDomain: "boss4-2f453.firebaseapp.com",
  projectId: "boss4-2f453",
  storageBucket: "boss4-2f453.appspot.com",
  messagingSenderId: "371226231390",
  appId: "1:371226231390:web:2664356ef1569c8e852acf",
  measurementId: "G-R3HS14FPGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage };
