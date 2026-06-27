// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBG7B2v1yzJzRVfB4y1r_VxzkXipLyH81U",
    authDomain: "surge-29548.firebaseapp.com",
    projectId: "surge-29548",
    storageBucket: "surge-29548.firebasestorage.app",
    messagingSenderId: "217437981571",
    appId: "1:217437981571:web:cdda25a10797484471c4b6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile };
