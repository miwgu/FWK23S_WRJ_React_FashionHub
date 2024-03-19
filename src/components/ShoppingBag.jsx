import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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

    return (
        <Container>
            {!products.length ? (
                <>
                    <h3>Your shopping bag is empty</h3>
                    <Button variant="contained" color="primary" onClick={handleGotoHome} fullWidth style={{ width: '300px' }}>Check products!</Button>
                </>
            ) : (
                <>
                    <h3>Your shopping bag</h3>
                    <Grid>
                        <Grid item xs={6} md={8}>
                            <Box>
                                {products.map((product) => (
                                    <Card
                                        key={product.idMeal}
                                        sx={{ display: 'flex' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 151 }}
                                            image={product.strMealThumb}
                                            alt={product.strMeal}
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {product.strMeal}
                                                </Typography>
                                                <p>{price}{" kr"}</p>
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
                                            </CardContent>
                                        </Box>
                                        <Box>
                                               <Typography component="div" variant="h9">
                                               Total amount:
                                                </Typography>
                                            <p> {price*quantities[product.idMeal]}{" kr"} </p>
                                        </Box>
                                    </Card>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Box>
                                <h1>Total</h1>
                                <p style={{ textAlign: 'left' }}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
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
