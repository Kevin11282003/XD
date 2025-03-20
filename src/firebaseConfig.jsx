// firebaseConfig.jsx
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de tu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvTpYbMvjVW_wQ_9pVk08l8SQ6azP4OVk",
    authDomain: "melo-37ab5.firebaseapp.com",
    projectId: "melo-37ab5",
    storageBucket: "melo-37ab5.firebasestorage.app",
    messagingSenderId: "587191030710",
    appId: "1:587191030710:web:888373e2e71cc411592717"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la instancia de Firestore
const db = getFirestore(app);

export { db };
