import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAEXODMS8dwrlYN2YmYccOTLyudHqoHL2w",
  authDomain: "project1-831e3.firebaseapp.com",
  projectId: "project1-831e3",
  storageBucket: "project1-831e3.firebasestorage.app",
  messagingSenderId: "1027613932531",
  appId: "1:1027613932531:web:fdaadfbd49b7e3adc93086",
  measurementId: "G-ZTM9TDHG29"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
