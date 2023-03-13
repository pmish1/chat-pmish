import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase';

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const signedIn = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })

        return () => {signedIn()}
    }, [])

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    )
}