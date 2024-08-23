// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiWIWO8Z9OT75mx9wtxd5XFr5g0QCabgI",
  authDomain: "task-manager-9e92d.firebaseapp.com",
  projectId: "task-manager-9e92d",
  storageBucket: "task-manager-9e92d.appspot.com",
  messagingSenderId: "406064806353",
  appId: "1:406064806353:web:2f53d47db82b9878dfc8f0",
  measurementId: "G-WTK4DG8HLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);