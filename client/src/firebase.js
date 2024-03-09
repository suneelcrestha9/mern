// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sunyallll.firebaseapp.com",
  projectId: "sunyallll",
  storageBucket: "sunyallll.appspot.com",
  messagingSenderId: "1060501825895",
  appId: "1:1060501825895:web:e8fd4a465ed3cc4d3267c2",
  measurementId: "G-G8ESGGHHV5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);