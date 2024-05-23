import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect, createContext } from 'react'

const AuthContext = createContext();
const auth = getAuth()

export const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null)
    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])
    return (
        <AuthContext.Provider value = {{user}}>{children}</AuthContext.Provider>
    )
}

export default AuthContext;