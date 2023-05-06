// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYjiTLsC57UZSg_FzDh8i43eBhvB-6FLE",
    authDomain: "food-order-b0ca6.firebaseapp.com",
    projectId: "food-order-b0ca6",
    storageBucket: "food-order-b0ca6.appspot.com",
    messagingSenderId: "799391772369",
    appId: "1:799391772369:web:52d1d33baafb7b96875ff0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export default db
// export const auth  =getAuth(app)