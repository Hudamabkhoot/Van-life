import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/authSlice';

export const AuthContext = createContext();
const auth = getAuth()

export const AuthProvider = ({children}) => {
    const [isReloading, setIsReloading] = useState(false);
    const [showRentModal, setShowRentModal] = useState(false); 
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.user);

    const handleShowRentModal = () => {
        setShowRentModal(true);
      };

    const handleCloseRentModal = () => {
        setShowRentModal(false);
      };
      
    const currentUser = (user) => {
        if (!user) return null;
        const { 
            email, 
            uid, 
            displayName,
            photoURL,
            metadata,
        } = user;
        
        const { creationTime } = metadata
        
        return {  
            email, 
            uid, 
            displayName,
            photoURL,
            creationTime 
        };
    };

    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const authUser = currentUser(user);
                dispatch(setUser(authUser));
                }
        })
    }, [])

    
    return (
        <AuthContext.Provider value = {{
            authUser, 
            isReloading, 
            setIsReloading,
            showRentModal, 
            handleShowRentModal,
            handleCloseRentModal
            }}>
            {children}
            </AuthContext.Provider>
    )
}