import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./component/Firebase";
import { CartProvider } from './component/CartContext';
import './App.css';

import Home from './component/Home';

import Product from './component/Product';
import Login from "./component/Login";
import SignUp from "./component/Register";
import Error from './component/Error';
import Loading from './component/Loding';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Set loading to false once auth state is determined
    },
    (error) => {
      setError(error); // Handle error during authentication
      setLoading(false); // Set loading to false on error
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading></Loading>; // Placeholder for loading state
  }

  if (error) {
    // Handle error state, such as showing an error message or redirecting to an error page
    return <div><Error></Error></div>;
  }

  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/product" /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />        
            
            <Route path="/product" element={user ? <Product /> : <Navigate to="/login" />} />
            <Route path="/product/:id" element={user ? <Product /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
      </CartProvider>
       <ToastContainer />
    </div>
  );
}

export default App;
