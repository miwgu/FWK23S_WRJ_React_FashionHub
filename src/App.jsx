import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login_Page from './components/Login_Page';
import Dashboard_Page from './components/Dashboard_Page';
import MyNav from './components/nav/MyNav';
import Home_Page from './components/Home_Page';
import Signup from './components/Signup';



function App() {
  return (
    <>
    <MyNav />
    <Routes>

        <Route path="/" element={<Home_Page/>} />
        <Route path="/login" element={<Login_Page/>} />
        <Route path="/dashboard" element={<Dashboard_Page/>} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  );
}

export default App;