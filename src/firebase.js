// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"; // deleteDoc ve doc eklenmeli
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBy9syndG-Egud-Cl-X372bvS5fxiRUQDE",
  authDomain: "tiger-77336.firebaseapp.com",
  projectId: "tiger-77336",
  storageBucket: "tiger-77336.firebasestorage.app",
  messagingSenderId: "988765948345",
  appId: "1:988765948345:web:d2d26ed521787deea10e68",
  measurementId: "G-MZJNENXHW1",
};

// Firebase başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore bağlantısı
const storage = getStorage(app); // Storage bağlantısı

export { db, storage, collection, addDoc, getDocs, deleteDoc, doc, ref, uploadBytes, getDownloadURL }; // deleteDoc ve doc burada eklenmeli
