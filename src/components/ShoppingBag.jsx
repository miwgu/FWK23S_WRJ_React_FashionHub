import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, IconButton, Card, Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { Delete } from '@mui/icons-material';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShoppingBag = ({ products, updateProducts, deleteProduct }) => {
    const navigate = useNavigate();
    const { user, loggedIn, fetchLoginUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleGotoLogin = () => {
        navigate('/login'); // Navigate to the login page when the user clicks on the Login button
    };

    const handleGotoHome = () => {
        navigate('/');
    };

    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        console.log("Products state changed, initializing quantities...");
        initializeQuantities();
    }, [products]);

    const initializeQuantities = () => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        console.log("Stored products from localStorage:", storedProducts);

        const quantitiesObject = {};
        storedProducts.forEach((product) => {
            quantitiesObject[product.id] = product.quantity || 1;
        });
        console.log("Quantities object:", quantitiesObject);

        setQuantities(quantitiesObject);
    };
        
    const handleChangeQuantity = (id, quantity) => {

        console.log("Current quantities:", quantities);

        //Update local state
        //By using the callback form of setQuantities, ensuring that you're working with the most up-to-date state when updating it.
        setQuantities((prevQuantities)=>({
            ...prevQuantities,
            [id]:quantity
        }));

        // Get items from localStrage and update localStrage
        //By directly updating the products from the local storage and then setting them back, the products state in this component reflects the most up-to-date data from the local storage.
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];// get item from localStrage
        const updated_Products = storedProducts.map((product) => {
            if (product.id=== id) {
                return { ...product, quantity };
            }
            return product;
        });
        console.log("Updated quantities:", quantities)

        //Update state inApp.jsx component using the passed function
        updateProducts(updated_Products);

        console.log("Products in localStorage updated:", updateProducts);

        // Dispatch a custom event to notify other components about the change
        window.dispatchEvent(new Event('shoppingBagUpdated'));
    };

     const handleCheckout = async () => {
        if (!loggedIn) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        
        try {
            await fetchLoginUser(); // Fetch user info after successful login
            const response = await axios.get('http://localhost:8080/customer/me', {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });

            // Assuming response.data contains user information
            const userData = response.data;

            // Proceed with checkout logic
            const shoppingBag = JSON.parse(localStorage.getItem('products')) || [];
            const order = {
                userId: userData.id,
                products: shoppingBag
            };
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            navigate('/orderdetails');
        } catch (error) {
            // Handle error
            console.error('Error fetching user data:', error);
            setIsLoading(false);
            alert('Failed to fetch user data. Please try again.');
        }
    };

    const totalAmount  = products.reduce((total, product) => total + (product.price * quantities[product.id]), 0);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            {!products.length ? (
                <>
                <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '70vh' }}>
                    <Grid item xs={12} textAlign="center">
                        <Typography component="div" variant="h5">Your shopping bag is empty</Typography>
                        <Button variant="contained" color="primary" onClick={handleGotoHome} fullWidth style={{ width: '300px', marginTop: '20px' }}>Check products!</Button>
                    </Grid>
                </Grid>
                </>
            ) : (
                <>
                   <Grid container spacing={4} justifyContent="center" alignItems="center">
                        <Grid item xs={12} textAlign="center">
                            <Typography component="div" variant="h4">Your shopping bag</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing ={2}>
                        <Grid item xs={8}>
                            {products.map((product) => (
                                <Card key={product.id} sx={{ marginBottom: '10px', display: 'flex' }} spacing={1}>
                                    
                                    <Link to ={`/product-details/${product.id}`} style={{textDecoration: 'none'}}>
                                    <CardMedia 
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={product.image}
                                        alt={product.title}
                                    />
                                    </Link>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '10px' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <Typography variant="h5" component="div">{product.title}</Typography>
                                            <IconButton aria-label="delete" onClick={() => deleteProduct(product.id)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                        <p>{product.price} kr</p>
                                        <Box>
                                            <Typography component="div" variant="h9">
                                                Total amount: {product.price * quantities[product.id]}{" kr"} 
                                            </Typography>
                                        </Box>
                                        <Select
                                            value={quantities[product.id] || 1}
                                            onChange={(e) => handleChangeQuantity(product.id, e.target.value)}
                                            fullWidth
                                        >
                                            {[...Array(20).keys()].map((num) => (
                                                <MenuItem key={num + 1} value={num + 1}>
                                                    {num + 1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                </Card>
                            ))}
                        </Grid>
                        <Grid item xs={4}>
                            <Box>
                                
                                <Typography variant="h5">
                                    Total {totalAmount} kr
                                </Typography>
                                <div>
                                    {/* Render either the Checkout button or the Login button based on the loggedIn state */}
                                    {!loggedIn ? (
                                        <Button variant="contained" color="primary" fullWidth onClick={handleGotoLogin}>
                                            Login to Checkout
                                        </Button>
                                    ) : (
                                        <Button variant="contained" color="primary" fullWidth onClick={handleCheckout}>
                                            Checkout
                                        </Button>
                                    )}
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default ShoppingBag;
