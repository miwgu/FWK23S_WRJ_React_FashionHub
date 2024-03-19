import { Box, Button, Card, Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import { AuthContext } from './AuthContext';


const ShoppingBag = ({products, deleteProduct}) => {

    //const { login, error } = useContext(AuthContext);
    const [shoppingBagData, setShoppingBagData] =useState({});//Object old: products
    const [quantities, setQuantities] = useState({}); //Object to track quantities
    const navigate = useNavigate();
    console.log(products)
    const handleGotoHome = () =>{
        navigate('/');
      };


    useEffect (()=>{
        //setShoppingBagData(products || []);
        //initializeQuantities(products);
        initializeShoppingBagData(products);
        console.log(products)
        console.log('Shopping Bag Data:', JSON.stringify(shoppingBagData, null, 2));
        console.log('Quantities:', JSON.stringify(quantities, null, 2));
      }, [products])

      const initializeShoppingBagData = (products) =>{
        const shoppingBagObject ={};
        const quantitiesObject = {};

        products.forEach((product)=>{
          const {idMeal} = product;
          if (shoppingBagObject[idMeal]){
            shoppingBagObject[idMeal].quantity += 1;
          } else {
            shoppingBagObject[idMeal] = {...product, quantity:1};
            quantitiesObject[idMeal] = 1;
          }
          quantitiesObject[idMeal] = shoppingBagObject[idMeal].quantity; // Update quantities;
        });
         setShoppingBagData(shoppingBagObject);
         setQuantities(quantitiesObject);
      }

      //count occurrences of each item ID in the shopping bag
      /* const countItems =(arr) =>{
        return arr.reduce((acc, curr)=>{
          acc[curr.idMeal] =(acc[curr.idMeal] || 0) +1;
          return acc;
        }, {});
      };
      
      const itemCounts = countItems(shoppingBagData); */
      
      /* const initializeQuantities = (products) =>{
        const initQuantities ={};
        products.forEach((p)=>{
          initQuantities[p.idMeal]=1; //Default quantity is 1
        })
        setQuantities(initQuantities);
      };
 */
      const handleChangeQuantity = (idMeal, quantity) =>{
         const updatedQuantities = {...quantities, [idMeal]: quantity};
         setQuantities(updatedQuantities);
         console.log("Updated Quantities: ", JSON.stringify(updatedQuantities, null, 2));

         const updatedShoppingBagData = {
          ...shoppingBagData,
          [idMeal]: { ...shoppingBagData[idMeal], quantity: quantity },
         };
         setShoppingBagData(updatedShoppingBagData);
         console.log('Updated Shopping Bag Data:', JSON.stringify(updatedShoppingBagData, null, 2));
      };

      const price =100;

  return (
    <>
    <Container>
    {!Object.keys(shoppingBagData).length &&
    <>
     <h3>Your shoppingbag is empty</h3>
     <Button variant="contained" color="primary" onClick={handleGotoHome} fullWidth style={{ width: '300px' }} >Check products!</Button>
    </>
    }
    
    {Object.keys(shoppingBagData).length>0 &&
    <>
    <h3>Your shoppingbag</h3>
    <Grid>
      <Grid item xs={6} md={8}>
        <Box>
        {Object.keys(shoppingBagData).map((idMeal)=>(
            <Card 
                 key={idMeal}
                 sx={{ display: 'flex' }}>
            <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={shoppingBagData[idMeal].strMealThumb}
            alt={shoppingBagData[idMeal].strMeal}
            />
        
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                 {shoppingBagData[idMeal].strMeal}
              </Typography>
              <p>{price}{" kr"}</p>

              <Select 
                   
                   value={quantities[idMeal]||''} 
                   onChange={(e)=> handleChangeQuantity(idMeal, e.target.value)}
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