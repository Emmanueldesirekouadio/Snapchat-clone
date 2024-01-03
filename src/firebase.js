import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxGaelAliqYveisxRTcix0NhrWTK3MJDk",
  authDomain: "snapchat-clone-final.firebaseapp.com",
  projectId: "snapchat-clone-final",
  storageBucket: "snapchat-clone-final.appspot.com",
  messagingSenderId: "36573234606",
  appId: "1:36573234606:web:39354f5d2f7bf0ae5c343f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
