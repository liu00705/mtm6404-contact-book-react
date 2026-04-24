import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCYFFgN281louGh9EqQE7OSCkOftPD4V-0",
  authDomain: "contact-book-307f8.firebaseapp.com",
  projectId: "contact-book-307f8",
  storageBucket: "contact-book-307f8.firebasestorage.app",
  messagingSenderId: "20945785882",
  appId: "1:20945785882:web:702e53605dd144be6e2da3",
  measurementId: "G-T5FRQXW76F"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)