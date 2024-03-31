import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, TextField, Typography, Container, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LoginModal = ({ isOpen, onClose }) => {
  const { login, error, fetchLoginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const success = await login(email, password);
    if(success){
    await fetchLoginUser()
    onClose(); // Close the modal after attempting to log in
    navigate('/')
    }
  };


/* 
  const handleLogin = () => {
    if (!username || !password) {
      alert('Please fill in both username and password!');
      return;
    }

    // Call the login function from AuthContext
    login(username, password)
    if(login){
        onClose(); // Close the modal after attempting to log in
        navigate('/')
    
    }else {
        alert('INVALID USER OR PASSWORD');
        
    }

      } */
      


  const handleRegister = () =>{
    onClose()
    navigate('/signup')
  } 


  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ padding: '1rem', backgroundColor: 'white' }}>
      <IconButton 
          onClick={onClose} 
          style={{ position: 'absolute', top: '0', right: '0' }}
        >
          <CloseIcon />
        </IconButton>

      <Container maxWidth="xs">
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
        <Typography variant="h5">Login</Typography>
        </Grid>

        {error && <Typography color="error">{error}</Typography>}
        <Grid item>
        <TextField
          label="email"
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
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth style={{ width: '300px' }} >
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
      </div>
    </Modal>
  );
};

export default LoginModal;