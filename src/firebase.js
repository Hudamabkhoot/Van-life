import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    setDoc, 
    deleteDoc, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc, 
    query, 
    where
} from "firebase/firestore"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut
} from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB1dCqVLvhrPPm6UKoGmDhYLDttfyQxSSY",
    authDomain: "vanlife-9cfa1.firebaseapp.com",
    projectId: "vanlife-9cfa1",
    storageBucket: "vanlife-9cfa1.appspot.com",
    messagingSenderId: "952852793040",
    appId: "1:952852793040:web:3d92993236c0e12d4b00d5"
  };
  

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)


const registerUser = async (firstName, lastName, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,email,password)
      const user = userCredential.user
      await setDoc(doc(db, 'users', user.email), {
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        hostId: user.uid
      })
      return true
   } catch(error){
      return {error: error.message}
   }
  }


async function loginUser (email, password){
    try {
      const userCredential = await signInWithEmailAndPassword(auth,email,password)
      const user = userCredential.user
      console.log('user is logged in')
      return true
    } catch(error){
        return {error: error.message}
    }
  }
  

  const logOutUser = () => {
    try {
    signOut(auth)
      console.log('user is signed out')
      return true
    } catch (error){
      console.log('user did NOT signout')
      return false
    }
  }


  const vansRef = collection(db, "vans");
  const ReviewsRef = collection(db, "Reviews");
  const TransactionsRef = collection(db, "transactions");

  export async function getAllVans(){
    const querySnapshot = await getDocs(vansRef)
    const dataArr = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
    return dataArr
  }


  export async function getReviews(){
    const querySnapshot = await getDocs(ReviewsRef)
    const dataArr = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
    
    return dataArr
  }

  export async function addReviewToVan(vanId, review) {
    try {
      const vanDocRef = doc(db, "vans", vanId);
      await updateDoc(vanDocRef, {
        reviews: arrayUnion(review[0]) 
      });
  
      return true;
    } catch (error) {
      return { error: error.message };
    }
  }
  
  export async function getTransactions(){
    const querySnapshot = await getDocs(TransactionsRef)
    const dataArr = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
    return dataArr
  }


  export async function getVan(id){
    const docRef = doc(db,'vans', id)
    const vanSnapshot = await getDoc(docRef)
    return {
      ...vanSnapshot.data(),
      id: vanSnapshot.id
    }
  }
  
  export async function getHostVans(){
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const q = query(vansRef, where("hostId", "==", uid))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
    return dataArr
  }
  
  export async function getHost(){
  
    const user = auth.currentUser;
    const email = user.email;
   
    const docRef = doc(db,'users', email)
    const hostSnapshot = await getDoc(docRef)
    return {
      ...hostSnapshot.data(),
      id: hostSnapshot.id
    }
  }
  
  const addVan = async (vanName, vanPrice, vanType, vanDescription, vanImg) => {
    try {
        await addDoc(collection(db, 'vans'), {
        name: vanName,
        price: vanPrice,
        type: vanType,
        description: vanDescription,
        hostId: auth.currentUser.uid,
        imageUrl: vanImg,
      })
      return true
   } catch(error){
      return {error: error.message}
   }
  }

  
  
  const deleteVan = async (vanId) => {
    const docRef = deleteDoc(doc(db, "vans", vanId));
    try {
        await deleteDoc(docRef);
    } catch(error){
      return {error: error.message}
    }
    
  }


  

  export {
    auth,
    db,
    storage,
    registerUser,
    loginUser,
    logOutUser,
    addVan,
    deleteVan
  }