// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDTFPcvL1ytUH6ovneNZcRR7qMNrU1HNjs",
    authDomain: "netflix-clone-d475b.firebaseapp.com",
    projectId: "netflix-clone-d475b",
    storageBucket: "netflix-clone-d475b.firebasestorage.app",
    messagingSenderId: "278697512811",
    appId: "1:278697512811:web:3e5ea93cbc37615423462e",
    measurementId: "G-WVZFBLCPVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })

    } catch (error) {
        console.log(error);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth , email ,password);
    } catch (e) {
        console.log("error yanh hai "+e);
    }
}

const logOut = () =>{
    signOut(auth);
}

export {auth , db , login , signUp , logOut}
