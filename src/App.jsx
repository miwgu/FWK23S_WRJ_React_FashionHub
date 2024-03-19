import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login_Page from './components/Login_Page';
import MyNav from './components/nav/MyNav';
import Home_Page from './components/Home_Page';
import Signup from './components/Signup';
import Details from './components/Details';
import ShoppingBag from './components/ShoppingBag';


function App() {
  const storedProducts = JSON.parse(localStorage.getItem('Products'))||[];
  const [products, setProducts] = useState(storedProducts);
  const [searchTerm, setSearchTerm]= useState('');
  const navigate = useNavigate();

  /* const addProduct = (product) =>{
    //TODO: Add price
    const{idMeal, strMealThumb, strMeal} = product; 

    let update = [...products, {idMeal, strMealThumb, strMeal }]
    
    setProducts(update);
    localStorage.setItem('products', JSON.stringify(update));

  } */

  
  const addProduct = (product) => {
    const { idMeal } = product;
    const updateProducts = [...products];
    const existingProductIndex = updateProducts.findIndex((p) => p.idMeal === idMeal);

    console.log("Product:", product);
    console.log("Existing product index:", existingProductIndex);
    console.log("Update products:", updateProducts);

    if (existingProductIndex !== -1) {
        // If the product already exists, update its quantity from local storage
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const storedProduct = storedProducts.find((p) => p.idMeal === idMeal);
        const quantity = storedProduct ? storedProduct.quantity : 0;

        console.log("Stored product:", storedProduct);
        console.log("Quantity from local storage:", quantity);

        updateProducts[existingProductIndex].quantity = quantity + 1;

        console.log("Updated quantity:", updateProducts[existingProductIndex].quantity);
    } else {
        // If product is new, add it with quantity: 1
        updateProducts.push({ ...product, quantity: 1 });
    }

    console.log("Updated products:", updateProducts);

    setProducts(updateProducts);
    localStorage.setItem('products', JSON.stringify(updateProducts));

    console.log("Products in local storage:", JSON.parse(localStorage.getItem('products')));
};

    


  const deleteProduct =(idMeal) =>{
    const updatedPro = products.filter((product) => product.idMeal !== idMeal )
    
    setProducts(updatedPro);
    localStorage.setItem('products', JSON.stringify(updatedPro));
  }

  const handleSearch = (term) =>{
    setSearchTerm(term);
    navigate('/');
  };

  return (
    <>
    <MyNav onSearch={handleSearch} />
    <Routes>

        <Route path="/" element={<Home_Page searchTerm={searchTerm} />} />
        <Route path="/login" element={<Login_Page/>} />
        <Route path="/product-details/:id" element={<Details  addProduct={addProduct} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element ={<ShoppingBag products={products} deleteProduct={deleteProduct}/>} />
    </Routes>
    </>
  );
}

export default App;