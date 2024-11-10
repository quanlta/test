// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOGZtWw-3OgIrMJBWPbPVboluucVCetDg",
  authDomain: "student-management-e2e40.firebaseapp.com",
  projectId: "student-management-e2e40",
  storageBucket: "student-management-e2e40.appspot.com",
  messagingSenderId: "523359474685",
  appId: "1:523359474685:web:c47e0c6b773612b00cbf94",
  measurementId: "G-44KZH4MFXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export {storage, googleProvider};