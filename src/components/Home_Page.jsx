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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import { Col, Row, Card, Container } from 'react-bootstrap';
//import { fetchMeals } from '../api/getMeals';
//import { FaRegHeart } from "react-icons/fa";
//import { FaHeart } from "react-icons/fa6";

const Home = ({searchTerm}) => {
    
    //const storedFavorites = JSON.parse(localStorage.getItem('favorites'))||[];
    const [data, setData]= useState(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);
    //const [fahandleAddtobagvoritesData, setFavoritesData] = useState(favorites);
    //const [hoveredMealId, setHoveredMealId] = useState(null);


   const handleAddtobag =() =>{
     console.log("Need to Fix")
   }




/* move to App.jsx
    const toggleFavorite = (meal) =>{
        const {idMeal, strMealThumb, strMeal}=meal;
        // Check if the meal is already in favorites
        const isFavorite = favoritesData.some((fav) => fav.idMeal === idMeal);

        let updatedFav;

        if (isFavorite){

          updatedFav = favoritesData.filter((fav) => fav.idMeal !== idMeal);
        } else {
          updatedFav = [...favoritesData, { idMeal, strMealThumb, strMeal }];
        }

        setFavoritesData(updatedFav); 
        localStorage.setItem('favorites',JSON.stringify(updatedFav));
        //onToggleFavorite(idMeal); // Call onToggleFavorite after updating favorites
    };

    console.log(favorites)
*/

    useEffect(()=>{
        axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then((response)=>{

            if(response.status >= 200 && response.status < 300){
                console.log(response.data.meals)
                setData(response.data.meals);
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

        /* const fetchData = async() =>{
            try {
                const mealsData =  await fetchMeals(searchTerm);
                setData(mealsData);
                setError(null);

            }catch (error){
                console.error('Error fetching meals: ',error);
                setError(error.message);
                setData(null);

            } finally{
                setLoading(false);
            }
        };

        fetchData(); */

        //Load favorites from localStrage on component mount
        //const storedFavorites = JSON.parse(localStorage.getItem('favorites'))||[];
        //setFavoritesData(favoritesData);
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
         data.map(({idMeal, strMeal, strMealThumb})=>(
        
            <Grid item xs={data.length <= 1 ? 6 : 4}  key ={idMeal}>

                
                <Card 
                    sx={{ maxWidth: 345 }}
                    key={idMeal}
                    
                >
                {/* <CardHeader
                    title= {strMeal} /> */}
              <Link to ={`/product-details/${idMeal}`} style={{textDecoration: 'none'}}>
                <CardMedia
                    component = "img"
                    height="300"
                    image={strMealThumb}
                    alt="Paella dish"
                   />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                  {strMeal}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   100kr
                  </Typography>
                </CardContent>
                </Link>
                  <Button variant="contained" color="primary" onClick={handleAddtobag} fullWidth>
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

export default Home