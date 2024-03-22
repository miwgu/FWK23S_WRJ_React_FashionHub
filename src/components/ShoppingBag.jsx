import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Card, Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Delete } from '@mui/icons-material';

const ShoppingBag = ({ products, deleteProduct }) => {
    const navigate = useNavigate();

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
            quantitiesObject[product.idMeal] = product.quantity || 1;
        });
        console.log("Quantities object:", quantitiesObject);

        setQuantities(quantitiesObject);
    };

    /*  The "Current quantities" log shows the correct quantities before the update.
        The "Updated quantities" log shows the updated quantities as expected.
        However, the quantities in the local storage (localStorage) are not consistent with the updated quantities.  -> I changed rad 53 it works know! */ 

    const handleChangeQuantity = (idMeal, quantity) => {

        console.log("Current quantities:", quantities);

        //Update local state
        //By using the callback form of setQuantities, ensuring that you're working with the most up-to-date state when updating it.
        setQuantities(prevQuantities => {
        const updatedQuantities = { ...prevQuantities, [idMeal]: quantity };
        console.log("Updated quantities:", updatedQuantities);
        return updatedQuantities;
        });

        // Get items from localStrage and update localStrage
        //By directly updating the products from the local storage and then setting them back, the products state in this component reflects the most up-to-date data from the local storage.
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];// get itefrom localStrage.m
        const updatedProducts = storedProducts.map((product) => {
            if (product.idMeal === idMeal) {
                return { ...product, quantity };
            }
            return product;
        });

        localStorage.setItem('products', JSON.stringify(updatedProducts));
        console.log("Products in localStorage updated:", updatedProducts);
    };

     
    const checkout = () => {
        const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUserData'));
        const userId = loggedInUserData.id;
        
        const shoppingBag = JSON.parse(localStorage.getItem('products')) || [];
        const order = {
            userId: userId,
            products: shoppingBag
        };
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        // Optionally clear the shopping bag after checkout
        clearShoppingBag();
    };

    const clearShoppingBag = () => {
        localStorage.removeItem('products');
    };



    const price = 100;

    const totalAmount = products.reduce((total, product) => total + (price * quantities[product.idMeal]), 0);

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
                                <Card key={product.idMeal} sx={{ marginBottom: '10px', display: 'flex' }} spacing={1}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={product.strMealThumb}
                                        alt={product.strMeal}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '10px' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <Typography variant="h5" component="div">{product.strMeal}</Typography>
                                            <IconButton aria-label="delete" onClick={() => deleteProduct(product.idMeal)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                        <p>{price} kr</p>
                                        <Box>
                                            <Typography component="div" variant="h9">
                                                Total amount: {price * quantities[product.idMeal]} 
                                            </Typography>
                                        </Box>
                                        <Select
                                            value={quantities[product.idMeal] || 1}
                                            onChange={(e) => handleChangeQuantity(product.idMeal, e.target.value)}
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
                                    <Button variant="contained" color="primary" onClick={checkout} fullWidth>
                                        Checkout
                                    </Button>
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
