import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
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
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
    updateProfile,
    signOut,
    deleteUser
} from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { toast } from 'react-hot-toast'; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
  };
  

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)


const registerUser = async (email, password) => {
  try {
   await createUserWithEmailAndPassword(auth, email, password);
    return true
 } catch (error) {
  switch (error.code) {
    case 'auth/invalid-email':
      toast.error('Invalid email address. Please enter a valid email.');
      break;
    case 'auth/email-already-in-use':
      toast.error('The email address is already in use by another account.');
      break;
    case 'auth/weak-password':
      toast.error('The password is too weak. Please choose a stronger password.');
      break;
    default:
      toast.error('An unexpected error occurred during registration. Please try again later.');
  }
  return false;
}
}


  async function loginUser(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful');
      return true;
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          toast.error('Invalid email address. Please enter a valid email.');
          break;
        case 'auth/user-disabled':
          toast.error('User has been disabled.');
          break;
        case 'auth/user-not-found':
          toast.error('User not found.');
          break;
        case 'auth/wrong-password':
          toast.error('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
          toast.error('Too many failed login attempts. Please try again later.');
          break;
          case 'auth/invalid-credential':
            toast.error('Email or password is incorrect.');
            break;
        default:
          toast.error('An unexpected error occurred. Please try again later.');
      }
      return false;
    }
  }

  const logOutUser = () => {
    try {
    signOut(auth)
      return true
    } catch (error){
      toast.error('error logining out')
      return false
    }
  }


  export async function changeUserPassword(oldPassword, newPassword, confirmPassword) {
    const user = auth.currentUser;

    if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match!');
    }
    try {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    }
    catch (error) {
  }
}  

  const vansRef = collection(db, "vans");
  const ReviewsRef = collection(db, "Reviews");
  const TransactionsRef = collection(db, "transactions");
  const TestimoniesRef = collection(db, "testimonies");



  export async function deleteAllHostVans() {
    const user = auth.currentUser;
    const uid = user.uid;
  
    try {
      const q = query(vansRef, where("hostId", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        try {
          await deleteDoc(doc.ref);
        } catch (error) {
          console.error("Error deleting van:", error);
        }
      });
  
    } catch (error) {
      console.error('Error deleting host vans:', error);
    }
  }
    
  
  export async function deleteAccount(deletePassword) {
    const user = auth.currentUser;
  
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return;
    }
    try {
        const credential = EmailAuthProvider.credential(user.email, deletePassword);
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);
        await deleteAllHostVans()
    } catch (error) {
    }
  }
  
  


  export async function getAllVans() {
    try {
        const q = query(vansRef, where("approved", "==", true));
        const querySnapshot = await getDocs(q);
        const dataArr = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        return dataArr;
    } catch (error) {
        toast.error('error displaying vans')
    }
}

export async function getReviews() {
    try {
        const querySnapshot = await getDocs(TestimoniesRef);
        const dataArr = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        return dataArr;
    } catch (error) {
        toast.error('rrror displaying reviews')
    }
}

  export async function getReviewsByVanId(vanId) {
    try {
        const q = query(ReviewsRef, where('vanId', '==', vanId));
        const querySnapshot = await getDocs(q);
        const reviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(reviews)
      return reviews;
    } catch (error) {
      toast.error('Error fetching reviews')
      return []; 
    }
  }


  export async function getTransactions() {
    try {
        const querySnapshot = await getDocs(TransactionsRef);
        const dataArr = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        return dataArr;
    } catch (error) {
        toast.error('Error fetching transactions')
    }
}


export async function getVan(id) {
  try {
      const docRef = doc(db, 'vans', id);
      const vanSnapshot = await getDoc(docRef);
      return {
          ...vanSnapshot.data(),
          id: vanSnapshot.id
      };
  } catch (error) {
    toast.error('Error fetching van')
  }
}


export async function getHostVans(userId) {
  try {
    const q = query(vansRef, where("hostId", "==", userId));      
    const querySnapshot = await getDocs(q);
      const dataArr = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
      }));
      return dataArr;
  } catch (error) {
      toast.error('Error fetching vans')
  }
}


export async function getHostReviews(userId) {
  try {
    const q = query(ReviewsRef, where("hostId", "==", userId));
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return dataArr;
  } catch (error) {
    return [];
  }
}


const updateUserName = async (newFirstName, newLastName) => {
  const user = auth.currentUser;

  try {
      await updateProfile(user, {
          displayName: `${newFirstName} ${newLastName}`,
      });
      return true;
  } catch (error) {
      return false;
  }
};

const updateUserImg = async (userImg) => {
  const user = auth.currentUser;

  try {
      await updateProfile(user, {
        photoURL: userImg
        });
        return true;
  } catch (error) {
    return false;
  }
};
  
  const addVan = async (vanName, vanPrice, vanType, vanDescription, vanImg) => {
    const user = auth.currentUser;
    const uid = user.uid;

    try {
      const vanPromise = addDoc(collection(db, 'vans'), {
        name: vanName,
        price: vanPrice,
        type: vanType,
        description: vanDescription,
        hostId: uid,
        imageUrl: vanImg,
        approved: false
      })
      await toast.promise(
        vanPromise,
        {
            loading: 'Adding Van...',
            success: 'Van added successfully!',
            error: 'Error adding Van',
        },
        {
            icon: '✍️',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }
        }
    );

   } catch(error){
   }
  }



const addReview = async (date, name, rating, text, vanId, userImg, hostId) => {
  try {
     await addDoc(collection(db, 'Reviews'), {
        date: date,
        name: name,
        rating: rating,
        text: text,
        vanId: vanId,
        userImg: userImg,
        hostId: hostId,
      })
   } catch(error){
   }
  }

  
  
  const deleteVan = async (vanId) => {
    const docRef = deleteDoc(doc(db, "vans", vanId));
    try {
        const deletePromise = deleteDoc(docRef);

        await toast.promise(
          deletePromise,
          {
              loading: 'Deleting van...',
              success: 'Van deleted successfully!',
              error: 'Error deleting van',
          },
          {
              icon: '🗑️',
              style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
              }
          }
      );
    } catch(error){
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
    deleteVan,
    addReview,
    updateUserName,
    updateUserImg,
  }