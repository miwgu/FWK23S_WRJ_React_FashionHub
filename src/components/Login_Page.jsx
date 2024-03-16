import React, { useState, useContext } from 'react'; 
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import {AuthContext} from "./AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

//import { useHistory } from 'react-router-dom'; 

const Login_Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const history = useHistory();
  const {user, login, loggedIn, error} = useContext(AuthContext);
  const navigate = useNavigate();

 /*  const handleLogin = (event) => {
    
      if (!username || !password) {
        alert('Please fill in both username and password!');
        return;
      } 
      
      console.log(login(username, password))
      console.log(login)
     if(login ){
        navigate('/');
        
        
        
     }else {
        event.preventDefault();
        navigate('/login');
      
     }

  }; */

/*   const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill in both username and password!');
      return;
    }
    
    await login(username, password); 
    navigate('/');
  };
*/
  const handleRegister = () =>{
    navigate('/signup')
  } 


  /* const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill in both username and password!');
      return;
    }

    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      navigate('/');
      // Handle login error, e.g., display error message to user
    }
  }; */
  
  const handleLogin  = (event) => {
    event.preventDefault();
    login(username, password);
    navigate('/');
    console.log('User '+{username}+' logged in successfully')
};

  



  return (
    
    <Container maxWidth="xs">
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h4">Login</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
        { error && <div >{error}</div>} 
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth style={{ width: '300px' }}>
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleRegister} fullWidth style={{ width: '300px' }}>
            Become a member
          </Button>
        </Grid>
      </Grid>
    </Container>
    
  );
};

export default Login_Page;