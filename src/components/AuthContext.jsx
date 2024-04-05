import { createContext, useState, useEffect } from 'react';
import axios  from 'axios';
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there is a logged-in user on component mount
        fetchLoginUser()
        if (fetchLoginUser()) {
          setLoggedIn(true);
        }
      }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });
            const token = response.data;
    
            // Store the token in localStorage
            localStorage.setItem('access_token', token);
    
            // Set the logged-in state to true
            setLoggedIn(true);
            setError(null);
    
            return true;
        } catch (error) {
            setError('INVALID USER OR PASSWORD');
            return false;
        }
    };
    
    const fetchLoginUser = async () => {
        try {
            // Get the JWT token from localStorage
            const token = localStorage.getItem('access_token');
    
            // Check if the token is valid
            if (!token) {
                handleLogout();
                //alert('1.Session expired. Please log in again.');
                console.log("Session expired")
                return null;
            }
    
            // Fetch user data from the server using the token
            const response = await axios.get('http://localhost:8080/customer/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Extract user data from the response
            const userData = response.data;
    
            // Update the user state with the fetched user data
            setUser(userData);
    
            return userData;
        } catch (error) {
            console.error('Error fetching user data:', error);
            handleLogout();
            alert('Session expired. Please log in again.');
            return null;
        }
    };
    

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null); //old ''
        localStorage.removeItem('access_token');//Remove the access token
        navigate("/login");
    };

    const value = {
        error,
        setError,
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        login,
        fetchLoginUser //Here userinfo
    };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
};
