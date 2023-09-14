// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_nQEX7Wb06eQ9st7oY_7Du7QrZPwgwuU",
  authDomain: "authenticator-fce4c.firebaseapp.com",
  projectId: "authenticator-fce4c",
  storageBucket: "authenticator-fce4c.appspot.com",
  messagingSenderId: "323903073089",
  appId: "1:323903073089:web:1ce7e54f5fef268528cfc0",
  measurementId: "G-SWT9LEMKN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};