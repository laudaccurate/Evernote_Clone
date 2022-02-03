import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCffBKhpwnRK-fDI4i-cN_YDvvgPj_X3r4",
  authDomain: "evernote-clone-2b660.firebaseapp.com",
  projectId: "evernote-clone-2b660",
  storageBucket: "evernote-clone-2b660.appspot.com",
  messagingSenderId: "505294363057",
  appId: "1:505294363057:web:851303a5d037498b908590",
  measurementId: "G-72TSGDGPX9",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
