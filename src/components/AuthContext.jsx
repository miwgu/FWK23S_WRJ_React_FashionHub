import { createContext, useState, useEffect } from 'react';
import mockUserData from './mockData/customer.json';


export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    /* const users = [
        {email: 'miwa.g@example.com', password: '1234'},
        {email: 'oskar.g@example.com', password: '2345'},
    ]; */

    useEffect(() => {
        // Check if there is a logged-in user in localStorage on component mount
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUserData'));
        if (loggedInUser) {
          setUser(loggedInUser);
          setLoggedIn(true);
        }
      }, []);

    const login = (email, password) => {
        const user = mockUserData.find(u => u.email === email && u.password === password);
        if (user) {
            setUser(user);
            setLoggedIn(true);
            // Store logged-in user in localStorage with a different key
            localStorage.setItem('loggedInUserData', JSON.stringify(user)); 
            setError(null);
            return true;
        } else {
            setError('INVALID USER OR PASSWORD');
            return false;
        }
    };

    const value = {
        error,
        setError,
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        login
    };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
};
