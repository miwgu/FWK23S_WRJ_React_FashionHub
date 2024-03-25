import { Grid,Typography, Button  } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const OrderComplete = () => {
    const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUserData'));
    const { firstname, lastname, email } = loggedInUserData || {};
    const navigate = useNavigate();
    
    const handleGotoHome = () => {
      navigate('/');
  };

  return (

    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '70vh' }}>
      <Grid item xs={12} textAlign="center">
            <Typography component="div" variant="h5"> {firstname}{"! "} Thank you for your Order. </Typography>
            <Button variant="contained" color="primary" onClick={handleGotoHome} fullWidth style={{ width: '300px', marginTop: '20px' }}>Check products!</Button>
      </Grid>
    </Grid>
  )
}

export default OrderComplete