import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAzfwfyT9caQcrVTx5o1vzffXGLxM2oloQ",
  authDomain: "fresh-hub-7c05a.firebaseapp.com",
  projectId: "fresh-hub-7c05a",
  storageBucket: "fresh-hub-7c05a.firebasestorage.app",
  messagingSenderId: "194682614599",
  appId: "1:194682614599:web:370e0a6572bf11ca085262",
  measurementId: "G-91073T81JH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;