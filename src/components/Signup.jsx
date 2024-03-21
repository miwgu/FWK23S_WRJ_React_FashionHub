import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, Container, Typography, Alert } from '@mui/material';
import { AuthContext } from './AuthContext';
import mockUserData from './mockData/customer.json';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
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

  const addUserToMockData = (newUser) => {
    // Find max id from mockUserData to generate a unique id for the new user
    const maxId = Math.max(...mockUserData.map(user => user.id));
    console.log('maxId:', maxId); 
    const newId = maxId + 1;
    console.log('newId:', newId);
    // This is object and assign the new id to the new user 
    const userWithId = { ...newUser, id: newId };
    console.log('userWithId:', userWithId);
    // Add the user with the new id to the mockUserData
    const updatedMockData = [...mockUserData, userWithId];
    console.log('updatedMockData:', updatedMockData); 
    localStorage.setItem('mockUserData', JSON.stringify(updatedMockData));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    addUserToMockData(formData);
    setShowAlert(true); // Show alert message

    // Navigate to the "/login" route after successful signup
    /* setTimeout(() => {
      setShowAlert(false); // Hide alert message after 3 seconds
      navigate("/login"); // Navigate to "/login" route
    }, 3000); */
    alert("You successfully sign up!")
    navigate("/login")
    //addUser(formData);
    //setUser(formData);
    console.log("You successfully sign up!")
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