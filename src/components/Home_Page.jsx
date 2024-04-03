import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Box, Container, Card, Grid, Button } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';


const Home_Page = ({searchTerm, addProduct}) => {
    
    const [data, setData]= useState([]);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);

    const handleAddtobag = (product) => {
      if (product && product.id) {
        addProduct(product);
      } else {
        console.error('No valid product data available.');
      }
    }

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/product/all/${searchTerm}`)
        .then((response)=>{

            if(response.status >= 200 && response.status < 300){
                console.log(response.data)
                setData(response.data);
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
        });
    }, [searchTerm]);



  return (
    <Box pt={6}>
    <Container >
        {loading && <div>A moment please ...</div>}
        {error && (
            <div>{`There is a problem fetching the data -${error}`}</div>
        )}

        <Grid container spacing={2}>
         {data &&
         data.map(({id, title, image, price})=>(
        
            <Grid item xs={data.length <= 1 ? 6 : 4}  key ={id}>

                
                <Card 
                    sx={{ maxWidth: 345 }}
                    key={id}
                    
                >

              <Link to ={`/product-details/${id}`} style={{textDecoration: 'none'}}>
                <CardMedia
                    component = "img"
                    height="500"
                    image={image}
                    alt={title}
                   />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                  {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   {price}
                  </Typography>
                </CardContent>
                </Link>
                  <Button variant="outlined" color="primary" onClick={() => handleAddtobag({id, title, image, price})} fullWidth>
                  Add to bag
                 </Button>
                

                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  
                </CardActions>
                     
                    
                    
                </Card>
                
            
            </Grid>
            
         ))
         }

        </Grid>
    </Container>
  </Box>
  )
}

export default Home_Page