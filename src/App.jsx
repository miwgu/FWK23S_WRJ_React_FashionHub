import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login_Page from './components/Login_Page';
import MyNav from './components/nav/MyNav';
import Home_Page from './components/Home_Page';
import Signup from './components/Signup';
import Details from './components/Details';
import ShoppingBag from './components/ShoppingBag';
import OrderDetails from './components/OrderDetails';
import OrderComplete from './components/OrderComplete';


function App() {
  const storedProducts = JSON.parse(localStorage.getItem('products'))||[];
  const [products, setProducts] = useState(storedProducts);
  const [searchTerm, setSearchTerm]= useState('');
  const navigate = useNavigate();

  const updateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    // Check if there are products stored in localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    
    // If there are no products in state and there are stored products, set them in state
    if (products.length === 0 && storedProducts.length > 0) {
        setProducts(storedProducts);
    }
}, [products]);

useEffect(() => {
  // Log whenever localStorage products are updated
  console.log("LocalStorage products updated:", JSON.parse(localStorage.getItem('products')));
}, []);
  

 const addProduct = (product) => {
  const existingProductIndex = products.findIndex((p) => p.id === product.id);

  if (existingProductIndex !== -1) {
      // If the product already exists, update its quantity
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantity += 1;
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
  } else {
      // If the product is new, add it to the products array
      const updatedProducts = [...products, { ...product, quantity: 1 }];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
  }
   // Dispatch custom event to notify MyNav component
   window.dispatchEvent(new Event('shoppingBagUpdated'));
};


  const deleteProduct =(id) =>{
    const updatedPro = products.filter((product) => product.id !== id )
    
    setProducts(updatedPro);
    localStorage.setItem('products', JSON.stringify(updatedPro));

    // Dispatch custom event to notify MyNav component
    window.dispatchEvent(new Event('shoppingBagUpdated'));
  }

  const handleSearch = (term) =>{
    setSearchTerm(term);
    navigate('/');
  };

  return (
    <>
    <MyNav onSearch={handleSearch} products={products} />
    <Routes>

        <Route path="/" element={<Home_Page searchTerm={searchTerm} addProduct={addProduct} />} />
        <Route path="/login" element={<Login_Page/>} />
        <Route path="/product-details/:id" element={<Details addProduct={addProduct} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element ={<ShoppingBag products={products} updateProducts={updateProducts} deleteProduct={deleteProduct}/>} />
        <Route path="/orderdetails" element={<OrderDetails updateProducts={updateProducts} />} />
        <Route path="/ordercomplete" element={<OrderComplete />} />
    </Routes>
    </>
  );
}

export default App;