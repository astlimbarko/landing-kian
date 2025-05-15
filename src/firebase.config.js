// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmzn4bCs0uLaC7siqJeLclBZvpBVFOgoY",
  authDomain: "envios-kian.firebaseapp.com",
  projectId: "envios-kian",
  storageBucket: "envios-kian.firebasestorage.app",
  messagingSenderId: "1087472686228",
  appId: "1:1087472686228:web:de9213d01012f29e6cd081",
  measurementId: "G-P8TBPYNPJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 