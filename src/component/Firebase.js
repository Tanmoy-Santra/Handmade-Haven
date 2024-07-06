
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-8-MMjsxcIlgXXDgIP5kAzXwCVbIR8Hk",
    authDomain: "auth-39751.firebaseapp.com",
    projectId: "auth-39751",
    storageBucket: "auth-39751.appspot.com",
    messagingSenderId: "632334503670",
    appId: "1:632334503670:web:3130a6b8c996a9a109a6d7",
    measurementId: "G-4D10E5046Y"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;






