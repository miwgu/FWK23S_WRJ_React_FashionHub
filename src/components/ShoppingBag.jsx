import { Box, Button, Card, Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import { AuthContext } from './AuthContext';


const ShoppingBag = ({products, deleteProduct}) => {

    //const { login, error } = useContext(AuthContext);
    const [shoppingBagData, setShoppingBagData] =useState(products);
    const [quantities, setQuantities] = useState({}); //Object to tract quantities
    const navigate = useNavigate();

    const handleGotoHome = () =>{
        navigate('/');
      };


    useEffect (()=>{
        setShoppingBagData(products || []);
        initializeQuantities(products);
      }, [products])

      //count occurrences of each item ID in the shopping bag
      /* const countItems =(arr) =>{
        return arr.reduce((acc, curr)=>{
          acc[curr.idMeal] =(acc[curr.idMeal] || 0) +1;
          return acc;
        }, {});
      };
      
      const itemCounts = countItems(shoppingBagData); */
      
      const initializeQuantities = (products) =>{
        const initQuantities ={};
        products.forEach((p)=>{
          initQuantities[p.idMeal]=1; //Default quantity is 1
        })
        setQuantities(initQuantities);
      };

      const handleChangeQuantity = (id, quantity) =>{
         setQuantities({...quantities, [id]: quantity});
         console.log("Q: ",quantities )
      };

      const price =100;

  return (
    <>
    <Container>
    {!shoppingBagData.length &&
    <>
     <h3>Your shoppingbag is empty</h3>
     <Button variant="contained" color="primary" onClick={handleGotoHome} fullWidth style={{ width: '300px' }} >Check products!</Button>
    </>
    }
    
    {shoppingBagData.length>0 &&
    <>
    <h3>Your shoppingbag</h3>
    <Grid>
      <Grid item xs={6} md={8}>
        <Box>
        {shoppingBagData.map((pro)=>(
            <Card 
                 key={pro.idMeal}
                 sx={{ display: 'flex' }}>
            <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={pro.strMealThumb}
            alt={pro.strMeal}
            />
        
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                 {pro.strMeal}
              </Typography>
              <p>{price}{" kr"}</p>

              <Select 
                   
                   value={quantities[pro.idMeal]||''} 
                   onChange={(e)=> handleChangeQuantity(pro.idMeal, e.target.value)}
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
            </Card>
        ))}
        </Box>
       </Grid>
      <Grid item xs={6} md={4}>
        <Box>
        <h1>Total</h1>
          <p style={{ textAlign: 'left' }}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
            <div>
              <Button variant="contained" color="primary"  fullWidth>
                  Checkout
              </Button>
            </div>
        </Box>
      </Grid>

    </Grid>

    </>
    }
    </Container>
    </>
  )
}

export default ShoppingBag