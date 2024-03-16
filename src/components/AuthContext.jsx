import { createContext, useState } from 'react';

export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    const users = [
        {username: 'miwa', password: '1234'},
        {username: 'oskar', password: '1234'},
        {username: 'lotta', password: '1234'},
    ];

    const login = (username, password) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            setUser(user);
            setLoggedIn(true);
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
