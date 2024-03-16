import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Container, Card, Grid } from '@mui/material';
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

const Home = () => {
    
    //const storedFavorites = JSON.parse(localStorage.getItem('favorites'))||[];
    const [data, setData]= useState(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);
    //const [favoritesData, setFavoritesData] = useState(favorites);
    //const [hoveredMealId, setHoveredMealId] = useState(null);


    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };


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
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
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
    }, []);




  return (
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

                <CardMedia
                    component = "img"
                    height="194"
                    image={strMealThumb}
                    alt="Paella dish"
                   />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                  {strMeal}
                  </Typography>
                </CardContent>
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
  )
}

export default Home