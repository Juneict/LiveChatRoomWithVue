import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBs1X8LkhOufuSH0EgWUjQmWxABfBwLAE",
  authDomain: "vue-blog-system-587b7.firebaseapp.com",
  projectId: "vue-blog-system-587b7",
  storageBucket: "vue-blog-system-587b7.appspot.com",
  messagingSenderId: "973346239630",
  appId: "1:973346239630:web:099fe700ec4f546f89c5df",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();
let timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { db, timestamp, auth };
