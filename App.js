import { useEffect } from "react";
import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase"; 
function App() {
  useEffect(() => {
    try {
     
      if (!getApps().length) {
        initializeApp(firebaseConfig);
      }

      console.log("✅ Firebase está conectado correctamente.");
    } catch (error) {
      console.error("❌ No se pudo conectar a Firebase:", error);
    }
  }, []);

  return <div>Prueba de conexión a Firebase</div>;
}

export default App;
