import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

//import Image from 'react-bootstrap/Image';
//import { getMealById } from '../api/getMeals';
import { Container, Grid, Box, Button } from '@mui/material';


const Details = ({addProduct}) => {
   const {id} =useParams();
   
   const [details, setDetails] = useState(null);
   const [loading, setLoading]= useState(true);
   const [error, setError]= useState(null);

   useEffect(()=>{
    
       axios
       .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
       .then((response)=>{

        if(response.status >= 200 && response.status < 300){
            console.log(response.data.meals[0])
            setDetails(response.data.meals[0]);
            setError(null);   
            
        } else{
        throw new Error(
            `This is an HTTP error: The status is ${response.status}`
        );
    }
    })
    .catch((error)=>{
        console.log('Error: ', error);
            setError(error.message);
            setData(null);

    })
    .finally(()=>{
        setLoading(false);
    })
/*
    const fetchData = async() =>{
      try{
        const mealDataById = await getMealById(mealId);
        setMealdetails(mealDataById);
        setError(null);

      } catch (error){
        console.error('Error fetching a meal by ID: ', error)
        setError(error.message);
        setdetails(null);

      } finally{
        setLoading(false);
      }
    } ;

    fetchData();
*/
   },[id]);


  return (
   <Box pt={6}>
    <Container >
      {loading && <div>Loading...</div>}
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}
      {details && (
    <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
        <Box>
          <img 
          src={details.strMealThumb} 
          
          className="img-fluid" 
          style={{ maxWidth: '3500px', maxHeight: '350px' }}  
          />
        </Box>
        </Grid>
        
        <Grid item xs={6} md={8}>
         <Box>
          <h1>{details.strMeal}</h1>
          <p style={{ textAlign: 'left' }}>{details.strInstructions}</p>
            <div>
              <Button variant="contained" color="primary" 
                       onClick={()=>addProduct(details)} fullWidth>
                  Add to bag
              </Button>
            </div>
          </Box>
          </Grid>
        </Grid>
      )}
    </Container>
 </Box>
  )
}

export default Details