import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { MenuItem, Typography } from '@mui/material';

const Logout = () => {
    const { setLoggedIn, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null); //old ''
        localStorage.removeItem('loggedInUserData'); // Remove the logged-in user data from localStorage
        localStorage.removeItem('access_token');//Remove the access token
        navigate("/");
    };

    return (
        <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
        </MenuItem>
    );
};

export default Logout;