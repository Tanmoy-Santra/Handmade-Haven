import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './component/About';
import Home from './component/Home';
import Contact from './component/Contact';
import Product from './component/Product';


function App() {
  return (
    <>    
     <div>
    <Router>      
    <Routes> 
     <Route path='/' element={<Home/>}/> 
     <Route path='/about' element={<About/>} />               
     <Route path='/contact' element={<Contact/>} />          
     <Route path='/product' element={<Product/>} /> 
    </Routes>
    </Router>    
    </div>
    </>       
  );
}

export default App;
