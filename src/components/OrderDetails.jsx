import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const OrderDetails = ({ updateProducts }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const { loggedIn, user, fetchLoginUser } = useContext(AuthContext);

    useEffect(() => {
        // Fetch user details when the component mounts
        fetchUserDetails();
        //fetchLoginUser();
    }, []);

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

    const orderDetails = JSON.parse(localStorage.getItem('orders')) || [];
            console.log("Localstrage orders: ", orderDetails)
            const lastOrder = orderDetails[orderDetails.length - 1];

    useEffect(() => {
        // Calculate total amount when userDetails is fetched
        if (userDetails) { //userDetails
            let total = 0;
            
            if (lastOrder) {
                lastOrder.products.forEach((product) => {
                    total += product.quantity * product.price; // Calculate total amount based on quantity and price
                });
            }
            setTotalAmount(total);
        }
    }, [userDetails]);//userDetails

 
     /* const handleOrderComplete = async () => {
        try {
            if (!loggedIn) {
                navigate('/login');
                return;
            }
    
            setIsLoading(true);

            await fetchLoginUser(); // Fetch user info after successful login
           
            const userId = userDetails.id;//Backend customerId userDetails.id
            // lastOrder.products in orderDetails(localStrage, 'orders')
            const products ={products: lastOrder.products} //convert the lastOrder.products array into a JavaScript object
            
            await axios.post(`http://localhost:8080/orders/add/${userId}`, products, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            clearShoppingBag();
            navigate('/ordercomplete');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };  */

    const handleOrderComplete = async () => {
        
            if (!loggedIn) {
                setIsLoading(false);
                navigate('/login');
                return;
            } else{
                await fetchLoginUser(); // Fetch user info after successful login
                const userId = user.id
                const products ={products: lastOrder.products}
                await axios.post(`http://localhost:8080/orders/add/${userId}`, products, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            clearShoppingBag();
            navigate('/ordercomplete');
            }
    
            setIsLoading(true);
    };

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
                        <Button variant="contained" color="primary" fullWidth onClick={handleOrderComplete}>
                            End of Purchase
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderDetails;
