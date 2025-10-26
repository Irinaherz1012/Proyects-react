import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkXvCS6WMNh3pUxNiO5bRjTAkVHX_4Dpw",
  authDomain: "true-food-cac70.firebaseapp.com",
  projectId: "true-food-cac70",
  storageBucket: "true-food-cac70.appspot.com",
  messagingSenderId: "7212083137",
  appId: "1:7212083137:web:61cf56fbf61e6ac13be828"
};


const app = initializeApp(firebaseConfig);




export const db = getFirestore(app);
