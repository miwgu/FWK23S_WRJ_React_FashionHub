import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

const OrderDetails = () => {
    // Retrieve user information from localStorage
    const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUserData'));
    console.log(loggedInUserData)
    const { firstname, lastname, email } = loggedInUserData || {};

    console.log(loggedInUserData.firstName)

    // Retrieve order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orders')) || [];
    const lastOrder = orderDetails[orderDetails.length - 1]; // Assuming you want to display details of the last order
    
    const price = 100; 

    // Calculate total amount
    let totalAmount = 0;
    lastOrder.products.forEach((product) => {
        totalAmount += product.quantity * price; // Calculate total amount based on quantity and price
    });

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    My Information
                </Typography>
                <Typography variant="body1" gutterBottom>
                    First Name: {firstname}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Last Name: {lastname}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Email: {email}
                </Typography>

                <Typography variant="h4" sx={{ mt: 4 }} gutterBottom>
                    Order Details
                </Typography>
                {/* Render order details */}
                {lastOrder && (
                    <Box>
                        {lastOrder.products.map((product, index) => (
                            <Box key={index} sx={{ mt: 2 }}>
                                <Typography variant="body1" gutterBottom>
                                    Product: {product.strMeal}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Quantity: {product.quantity}
                                </Typography>
                                {/* Add a placeholder price */}
                                <Typography variant="body1" gutterBottom>
                                    Price: 100 kr {/* Placeholder price */}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Total: {product.quantity * 100} kr {/* Placeholder calculation */}
                                </Typography>
                            </Box>
                        ))}
                        <Typography variant="h4" sx={{ mt: 4 }} gutterBottom>
                            Total: {totalAmount} kr
                        </Typography>
                    </Box>
                )}
                <Button variant="contained" color="primary" sx={{ mt: 4 }}>
                    End of Purchase
                </Button>
            </Box>
        </Container>
    );
};

export default OrderDetails;
