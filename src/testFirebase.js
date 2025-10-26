import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

async function testFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "true-food"));
    console.log("Documentos en Firestore:", querySnapshot.docs.map(doc => doc.data()));
  } catch (error) {
    console.error("Error al conectar con Firestore:", error);
  }
}

testFirestore();
