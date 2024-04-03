import { Grid,Typography, Button  } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderComplete = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [orders, setOrders] =useState([]);


    useEffect(() => {
      // Fetch user details and orders when the component mounts
      fetchUserDetails();
  }, []);

  useEffect(() => {
    // Fetch orders when userDetails is updated
    fetchOrders();
}, [userDetails]);

  const fetchUserDetails = async () => {
      try {
          // Fetch user details from the backend
          const response = await axios.get('http://localhost:8080/customer/me', {
              headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
          });
          setUserDetails(response.data);
          setIsLoading(false);
      } catch (error) {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
      }
  };
  
  const fetchOrders = async () => {
    try {

      if (!userDetails) {
        // userDetails is not yet available, return or handle accordingly
        return;
    }

      const userId= userDetails.id;
        // Fetch user details from the backend
        const response = await axios.get( `http://localhost:8080/orders/bycustomerid/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        setOrders(response.data);
        setIsLoading(false);
    } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
    }
};
   
   const lastOrder = orders[orders.length-1]
   console.log("lastOrder",lastOrder)
    
    const handleGotoHome = () => {
      navigate('/');
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
}

  return (

    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '70vh' }}>
      <Grid item xs={12} textAlign="center">
            <Typography component="div" variant="h5"> {userDetails?.firstname ? `Hello, ${userDetails.firstname}! Thank you for your order.` : 'Thank you for your order.'} </Typography>
            <Typography component="div" variant="h5"> {lastOrder?.id?  `Your order number: ${lastOrder.id}`:''} </Typography>
            <Button variant="contained" color="primary" onClick={handleGotoHome} fullWidth style={{ width: '300px', marginTop: '20px' }}>Check products!</Button>
      </Grid>
    </Grid>
  )
}

export default OrderComplete