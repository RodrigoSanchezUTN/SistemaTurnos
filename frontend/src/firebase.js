import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQ4BJJ50h2xB9WB2p6ouFj09XZ2PGqG6U",
  authDomain: "turnify-c6edf.firebaseapp.com",
  projectId: "turnify-c6edf",
  storageBucket: "turnify-c6edf.firebasestorage.app",
  messagingSenderId: "180129850145",
  appId: "1:180129850145:web:72d4bc31e49a858a355460",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;