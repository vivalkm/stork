import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoggedIn(true);
            }
            setCheckingStatus(false);
        });
    }, []);
    return (
        <AuthContext.Provider value={{ loggedIn, checkingStatus, setLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContext;
export { AuthContextProvider };
