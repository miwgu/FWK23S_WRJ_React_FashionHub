import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login_Page from './components/Login_Page';
import MyNav from './components/nav/MyNav';
import Home_Page from './components/Home_Page';
import Signup from './components/Signup';
import Details from './components/Details';


function App() {
  const [searchTerm, setSearchTerm]= useState('');

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
        <Route path="/product-details/:id" element={<Details/>} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;