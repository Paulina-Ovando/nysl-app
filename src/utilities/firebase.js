import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDatabase } from "firebase/database";

// Reemplaza esto con TU configuración real de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBDrmJWcZxtlCre57LZk4zSAFj519QxnsQ",
    authDomain: "nysl-app-32969.firebaseapp.com",
    projectId: "nysl-app-32969",
    storageBucket: "nysl-app-32969.firebasestorage.app",
    messagingSenderId: "965352663532",
    appId: "1:965352663532:web:075089d26636ed665e38c9"
};

// Inicializamos Firebase y la Autenticación
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const database = getDatabase(app);

// Configuramos Google y exportamos las funciones
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOutUser = () => signOut(auth);

// Exportamos un hook personalizado para saber si hay un usuario activo
export const useUserState = () => useAuthState(auth);