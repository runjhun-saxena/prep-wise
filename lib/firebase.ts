// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBZcdp3G-gwQYMd3XlN8qfIPzAYzCdzXDU",
  authDomain: "prepwise-5a356.firebaseapp.com",
  projectId: "prepwise-5a356",
  storageBucket: "prepwise-5a356.appspot.com",
  messagingSenderId: "462017642292",
  appId: "1:462017642292:web:a025c3e058903df1c96f61",
  measurementId: "G-XV63JG6LW0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Always persist across browser reloads
setPersistence(auth, browserLocalPersistence);

export { auth };
export const storage = getStorage(app);

isSupported().then((yes) => {
  if (yes) getAnalytics(app);
});
