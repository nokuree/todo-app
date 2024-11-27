import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDYQ1dJfEspdNkcejCMdbphce6uyPAVF1w",
  authDomain: "auth-project-3ed5b.firebaseapp.com",
  projectId: "auth-project-3ed5b",
  storageBucket: "auth-project-3ed5b.firebasestorage.app",
  messagingSenderId: "215988624400",
  appId: "1:215988624400:web:941a82de3ea9306b6cfe95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
