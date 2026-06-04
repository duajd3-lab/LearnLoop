// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-bjUAoXEQEimJi0fOElzeXeJoQtX7LC8",
  authDomain: "learnloop-e93bc.firebaseapp.com",
  projectId: "learnloop-e93bc",
  storageBucket: "learnloop-e93bc.firebasestorage.app",
  messagingSenderId: "629305046236",
  appId: "1:629305046236:web:d550bf91989f282488b019",
  measurementId: "G-ENGCW20KBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);