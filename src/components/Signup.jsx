import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
 
  const navigate = useNavigate();
  //all attributes in the formData object are essential
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    address: '',
    city: '',
    postcode: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try{
     const response = await axios.post('http://localhost:8080/customer/signup', formData);
     console.log("Response:", response.data);
      
    setShowAlert(true); // Show alert message
    alert("You successfully sign up!")
    navigate("/login")

    console.log("You successfully sign up!")
  } catch(error){
    console.error('Error', error)
  }
  };


  return (
  <Container > 
   <Grid container direction="column" alignItems="center" spacing={4} style={{ marginTop: '40px' }}>
    <Grid item>
        <Typography variant="h5" alignItems="center" maxWidth="xs">Sign up</Typography>
    </Grid>
    <Grid item>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Sign up
      </Button>
    </form>
    </Grid>
    {showAlert && (
          <Grid item>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">You successfully signed up!</Alert>
          </Grid>
        )}
  </Grid>

  </Container>
  );
};

export default Signup