import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "../..FirebaseConfig/FirebaseConfig"; 

export const writeData = async (phoneNumber) => {
    try {
        const docRef = await addDoc(collection(firestoreDb, "number"), { phoneNumber: phoneNumber });
        console.log("Document written with ID:", docRef.id); 
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export const readData = async () => {
    const arr = [];
    try {
        const querySnapshot = await getDocs(collection(firestoreDb, "number")); 
        querySnapshot.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id });
        });
        console.log(arr);
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
};
