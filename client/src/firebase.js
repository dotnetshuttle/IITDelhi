// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmILkLEaQTBQzsx9qxbglD-RLkex2GUvo",
  authDomain: "mern-estate-a7cf6.firebaseapp.com",
  projectId: "mern-estate-a7cf6",
  storageBucket: "mern-estate-a7cf6.appspot.com",
  messagingSenderId: "816966901216",
  appId: "1:816966901216:web:c8668a2dd6749610b81f85",
  measurementId: "G-N9FPXBG44G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
