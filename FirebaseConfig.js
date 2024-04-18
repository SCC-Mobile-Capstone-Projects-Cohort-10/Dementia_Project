import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection, getDocs, getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBn-l79wv7IqB3l3TDufQ-f0Ef-wuka9g",
  authDomain: "dementiacareapp-93fcb.firebaseapp.com",
  projectId: "dementiacareapp-93fcb",
  storageBucket: "dementiacareapp-93fcb.appspot.com",
  messagingSenderId: "166472325844",
  appId: "1:166472325844:web:1970c13fee96feaaf87941"
};


// Initialize Firebase
export const firebaseaApp  = initializeApp(firebaseConfig);
export const firebaseaAuth  = getAuth(firebaseaApp);
export const FIRESTORE_DB= getFirestore(firebaseaApp)
export const colRef=collection(FIRESTORE_DB, 'User')



