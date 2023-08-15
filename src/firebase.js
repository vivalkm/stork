// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjtFZ9et86T3E8KnS-QLJbR_Jq0sQrCvA",
    authDomain: "stork-69d6e.firebaseapp.com",
    databaseURL: "https://stork-69d6e.firebaseio.com",
    projectId: "stork-69d6e",
    storageBucket: "stork-69d6e.appspot.com",
    messagingSenderId: "235218132633",
    appId: "1:235218132633:web:ff5562b4a60fb17059a208",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
