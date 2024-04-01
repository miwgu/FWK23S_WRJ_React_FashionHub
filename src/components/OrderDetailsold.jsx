import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderDetails = ({ updateProducts }) => {
    // Retrieve user information from localStorage
    const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUserData'));
    const { firstname, lastname, email, telephone, address, city, postcode  } = loggedInUserData || {};
    const navigate = useNavigate();


    // Retrieve order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orders')) || [];
    const lastOrder = orderDetails[orderDetails.length - 1]; 

    // Calculate total amount
    let totalAmount = 0;
    lastOrder.products.forEach((product) => {
        totalAmount += product.quantity * product.price; // Calculate total amount based on quantity and price
    });

    const handleOrderComplete = () =>{
        clearShoppingBag();  
        navigate('/ordercomplete');
    }

    const clearShoppingBag = () => {
        localStorage.removeItem('products');
        const storedProducts = JSON.parse(localStorage.getItem('products'))||[];
        updateProducts(storedProducts);
        window.dispatchEvent(new Event('shoppingBagUpdated'));
    };

    return (
        <Container>
          <Grid container spacing ={2}>
            <Grid item xs={8}>
            <Box sx={{ mt: 4 }}>
                <Box>
                <Typography variant="h4" gutterBottom>
                    My Information
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Your Name: {firstname}{" "}{lastname}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Email: {email}
                </Typography>
                </Box>

                <Box>
                <Typography variant="h4" gutterBottom>
                    Invoice /Delivery address
                </Typography>
                <Typography variant="body1" gutterBottom>
                {firstname}{" "}{lastname}
                </Typography>
                <Typography variant="body1" gutterBottom>
                {telephone}
                </Typography>
                <Typography variant="body1" gutterBottom>
                {address}
                </Typography>  
                <Typography variant="body1" gutterBottom>
                {postcode}{" "}{city}
                </Typography>  


                </Box>

                <Typography variant="h4" sx={{ mt: 4 }} gutterBottom>
                    Order Details
                </Typography>
                {/* Render order details */}
                {lastOrder && (
                    <Box>
                        {lastOrder.products.map((product, index) => (
                            <Box key={index} sx={{ mt: 2 }}>
                                <Typography variant="body1" gutterBottom>
                                    Product: {product.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Quantity: {product.quantity}
                                </Typography>
                                {/* Add a placeholder price */}
                                <Typography variant="body1" gutterBottom>
                                    Price: {product.price}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Total: {product.quantity * product.price} kr 
                                </Typography>
                            </Box>
                        ))}
                        
                    </Box>
                  
                )}
               
            </Box>
            </Grid>
            <Grid item xs={4}>
               <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom >
                            Total: {totalAmount} kr
                </Typography>
                <Button variant="contained" color="primary"  fullWidth   onClick={handleOrderComplete} >
                    End of Purchase
                </Button>
               </Box>
            </Grid>
        </Grid>
        </Container>
    );
};

export default OrderDetails;
