import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = ({ updateProducts }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
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

        // Fetch user details when the component mounts
        fetchUserDetails();
    }, []);

    const orderDetails = JSON.parse(localStorage.getItem('orders')) || [];
            console.log("Localstrage orders: ", orderDetails)
            const lastOrder = orderDetails[orderDetails.length - 1];

    useEffect(() => {
        // Calculate total amount when userDetails is fetched
        if (userDetails) {
            //const orderDetails = JSON.parse(localStorage.getItem('orders')) || [];
            //console.log("Localstrage orders: ", orderDetails)
            //const lastOrder = orderDetails[orderDetails.length - 1];
            let total = 0;
            
            if (lastOrder) {
                lastOrder.products.forEach((product) => {
                    total += product.quantity * product.price; // Calculate total amount based on quantity and price
                });
            }
            setTotalAmount(total);
        }
    }, [userDetails]);

   // I need to make backend
/*     const handleOrderComplete = async () => {
        try {
            // Assuming lastOrder.products contains the list of products in the last order
            const lastOrder = JSON.parse(localStorage.getItem('orders')) || [];
            const order = {
                userId: userDetails.id,
                products: lastOrder.products
            };
            await axios.post('http://localhost:8080/orders', order, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            clearShoppingBag();
            navigate('/ordercomplete');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    }; */

    const clearShoppingBag = () => {
        localStorage.removeItem('products');
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        updateProducts(storedProducts);
        window.dispatchEvent(new Event('shoppingBagUpdated'));
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box sx={{ mt: 4 }}>
                        {/* Render user details */}
                        <Typography variant="h4" gutterBottom>
                            My Information
                        </Typography>
                        {userDetails && (
                            <>
                            <Box>
                                <Typography variant="body1" gutterBottom>
                                    Your Name: {userDetails.firstname} {userDetails.lastname}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    Email: {userDetails.email}
                                </Typography>
                            </Box>

                            <Box>
                            <Typography variant="h4" gutterBottom>
                                Invoice /Delivery address
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            {userDetails.firstname}{" "}{userDetails.lastname}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            {userDetails.telephone}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            {userDetails.address}
                            </Typography>  
                            <Typography variant="body1" gutterBottom>
                            {userDetails.postcode}{" "}{userDetails.city}
                            </Typography>  
                            </Box>

                            </>
                        )}

                        {/* Render order details */}
                        <Typography variant="h4" sx={{ mt: 4 }} gutterBottom>
                            Order Details
                        </Typography>
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
                        <Typography variant="h4" gutterBottom>
                            Total: {totalAmount} kr
                        </Typography>
                        {/* <Button variant="contained" color="primary" fullWidth onClick={handleOrderComplete}> */}
                        <Button variant="contained" color="primary" fullWidth >
                            End of Purchase
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderDetails;
