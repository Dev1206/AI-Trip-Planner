// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9Ovx79UqgjIrKTdSEBsdOv4_kN6o45GI",
  authDomain: "trippy-feddb.firebaseapp.com",
  projectId: "trippy-feddb",
  storageBucket: "trippy-feddb.appspot.com",
  messagingSenderId: "955160675912",
  appId: "1:955160675912:web:1525cdccb51939dab4ba7d",
  measurementId: "G-B988HYF7VH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

const firebaseServices = {
    app, // Firebase app instance
    db,  // Firestore database instance
    // You can add other services like analytics here.
  };
  
  // Default export the firebaseServices object.
  export default firebaseServices;
  