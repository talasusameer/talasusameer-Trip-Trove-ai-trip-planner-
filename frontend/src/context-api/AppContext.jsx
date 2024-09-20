// src/context-api/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import pb from '../pocketbase/pocketbase.js';

const AppContext = createContext();

function AppProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        async function fetchData() {
            return await pb.authStore.isValid 
        }

        setIsAuth(() => fetchData())
    })
    return (
        <AppContext.Provider value={{ isAuth: isAuth}}>
            <ToastContainer />
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}

export default AppProvider;
