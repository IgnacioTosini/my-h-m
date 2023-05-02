// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgVGbY3dRwrrQ9ITkcrxx_awEwhUkouKw",
    authDomain: "hyme-commerce.firebaseapp.com",
    projectId: "hyme-commerce",
    storageBucket: "hyme-commerce.appspot.com",
    messagingSenderId: "3372033545",
    appId: "1:3372033545:web:7b4e424da05449a0e23ad8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
