
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLi9nwF22r07vAtLr6XxmlXu14lwOIfEs",
    authDomain: "login-bbf6b.firebaseapp.com",
    projectId: "login-bbf6b",
    storageBucket: "login-bbf6b.appspot.com",
    messagingSenderId: "204961647536",
    appId: "1:204961647536:web:a776b6f44191ed5d7fe475"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;






