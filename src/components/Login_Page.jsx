import React, { useState, useContext } from 'react'; 
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import {AuthContext} from "./AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

const Login_Page = () => {
  const {login, error, fetchLoginUser} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () =>{
    navigate('/signup')
  } 

  const handleLogin = async (event) => {
    event.preventDefault();
    const success = await login(email, password);
    if(success){
    await fetchLoginUser()
    //onClose(); // Close the modal after attempting to log in
    navigate('/cart')
    }
  };


  return (
    <Container maxWidth="xs">
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h4">Login</Typography>
        </Grid>

        {error && <Typography color="error">{error}</Typography>}

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