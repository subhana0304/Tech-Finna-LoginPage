import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase.config';


export const AuthContext = createContext(null)
const auth = getAuth(app);


const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password)=> {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const updateUserProfile = (name, userName) =>{
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    useEffect( ()=> {
        const unsubscribe = onAuthStateChanged(auth, currenUser=>{
            setUser(currenUser);
            console.log('current user', currenUser);
            setLoading(false);
        });
        return() => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;