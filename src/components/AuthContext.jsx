import { createContext, useState, useEffect } from 'react';
import mockUserData from './mockData/customer.json';
import axios  from 'axios';
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /* const users = [
        {email: 'miwa.g@example.com', password: '1234'},
        {email: 'oskar.g@example.com', password: '2345'},
    ]; */

    /* useEffect(() => {
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
    }; */

    const login = async (email, password) =>{
        try{
          const response = await axios.post('http://localhost:8080/login', {email,password});
          console.log('Response data:', response.data);

          const token = response.data; // Get the token directly from response data
          console.log('Token:', token);
        
          setUser(null);//set the user to null since it's not provided in the response
          
          //----Store null user--------------------
          //const user =await fetchLoginUser();// Fetch and update user data after login
          //console.log("User: ", user);

          localStorage.setItem('access_token', token);
          localStorage.setItem('loggedInUserData',user );//// No need to store user data
    
          setLoggedIn(true);
          setError(null); //Clear any previous error

          return true;

        } catch (error){
            setError('INVALID USER OR PASSWORD');
            return false;
        }
    }

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null); //old ''
        localStorage.removeItem('loggedInUserData'); // Remove the logged-in user data from localStorage
        localStorage.removeItem('access_token');//Remove the access token
        navigate("/login");
    };

    const fetchLoginUser = async () =>{
         try{
            //get the JWT token from localStrage
            const token = localStorage.getItem('access_token');

            console.log('Token:', token);// 1st null :2nd token

            
            if (!token) {  // Unauthorized
                  handleLogout();
                  console.log(user)
                  console.log(email)
                  alert('1:Session expired. Please login again!');//When user click this show the akart...why
                  return;
             }
                //throw new Error('Failed to fetch data from backend');
            console.log('Fetching user data...');
            const response = await axios.get('http://localhost:8080/customer/me',{
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Response:', response);

            // Check if response data is available
            if (response.status === 200) {
                const userData = response.data;
                localStorage.setItem('loggedInUserData', JSON.stringify(userData));
                setUser(userData);
                return userData;
            } else {
                handleLogout();
                alert('2:Session expired. Please login again!');
                return null;
                //throw new Error('Failed to fetch user data');
            }

         }catch(error){
            console.error('Error fetching user data:', error);
            setError('Error fetching customer data')
            handleLogout();
            alert('3:Session expired. Please login again!');
            return null;
         }
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
