import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Box, Button } from '@mui/material';


const Details = ({addProduct}) => {
   const {id} =useParams();
   
   const [details, setDetails] = useState(null);
   const [loading, setLoading]= useState(true);
   const [error, setError]= useState(null);

   useEffect(()=>{
    
       axios
       .get(`http://localhost:8080/product/byid/${id}`)
       .then((response)=>{

        if(response.status >= 200 && response.status < 300){
            console.log(response.data[0])
            setDetails(response.data[0]);
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
            setDetails(null);

    })
    .finally(()=>{
        setLoading(false);
    })
   },[id]);


   const handleAddToBag = () => {
    addProduct(details);
};


  return (
   <Box pt={6}>
    <Container >
      {loading && <div>Loading...</div>}
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}
      {details && (
    <Grid container spacing={2}>
        <Grid item xs={6} >
        <Box>
          <img 
          src={details.image} 
          
          className="img-fluid" 
          style={{ maxWidth: '450px', maxHeight: '600px' }}  
          />
        </Box>
        </Grid>
        
        <Grid item xs={6} >
         <Box>
          <h1>{details.title}</h1>
          <h4>{details.price}</h4>
          <p style={{ textAlign: 'left' }}>{details.description}</p>
            <div>
              <Button variant="contained" color="primary" 
                       onClick={handleAddToBag} fullWidth>
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