import React, { useState, useContext } from 'react'; 
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import {AuthContext} from "./AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

//import { useHistory } from 'react-router-dom'; 

const Login_Page = () => {
  const {login, error} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const history = useHistory(); 
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

  const handleLogin = (event) => {
    event.preventDefault();
    const success = login(email, password);
    if(success){
      navigate('/cart');
    }
  };

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
  /*
  const handleLogin  = (event) => {
    event.preventDefault();
    login(email, password);
    navigate('/');
    console.log('User '+{email}+' logged in successfully')
};
*/

  



  return (
    
    <Container maxWidth="xs">
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h4">Login</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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