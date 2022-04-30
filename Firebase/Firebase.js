// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDftQB-Ao16oDBYpzJRyr9upn7QpQ7pEJU",
  authDomain: "helth-tech.firebaseapp.com",
  projectId: "helth-tech",
  storageBucket: "helth-tech.appspot.com",
  messagingSenderId: "1032850703789",
  appId: "1:1032850703789:web:3eaaa554d39195c1e4cd24",
  measurementId: "G-QJ1204LHKM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const store = getStorage(app);
export { app, auth, db, store };
