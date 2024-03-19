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
        initializeQuantities();
    }, [products]);

    const initializeQuantities = () => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const quantitiesObject = {};
        storedProducts.forEach((product) => {
            quantitiesObject[product.idMeal] = product.quantity || 1;
        });
        setQuantities(quantitiesObject);
    };

    const handleChangeQuantity = (idMeal, quantity) => {
        const updatedQuantities = { ...quantities, [idMeal]: quantity };
        setQuantities(updatedQuantities);

        const updatedProducts = products.map((product) => {
            if (product.idMeal === idMeal) {
                return { ...product, quantity };
            }
            return product;
        });

        localStorage.setItem('products', JSON.stringify(updatedProducts));
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
        
                        <Typography justifyContent="center" component="div" variant="h5">Your shopping bag </Typography>

                    <Grid container spacing ={2}>
                        <Grid item xs={8}>
                            {products.map((product) => (
                                <Card key={product.idMeal} sx={{ marginBottom: '10px', display: 'flex' }}>
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
                                    <Button variant="contained" color="primary" fullWidth>
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
