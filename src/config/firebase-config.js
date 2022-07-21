import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAK9_-yzHjdVTsVL57-3kXJ6YTIakBtOko",
    authDomain: "web-tiktok-1f995.firebaseapp.com",
    projectId: "web-tiktok-1f995",
    storageBucket: "web-tiktok-1f995.appspot.com",
    messagingSenderId: "981751057020",
    appId: "1:981751057020:web:f932ca371bb0d5193617f9",
    measurementId: "G-34KB23JS65"
  };
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);

export default authentication;