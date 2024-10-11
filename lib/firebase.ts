import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "project-id",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (process.env.NEXT_PUBLIC_APP_ENV === 'DEV') {
    connectFirestoreEmulator(db, 'localhost', 8080);
}

export { db };