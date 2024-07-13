import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import productDetails from './ProductDetails';
import { useCart } from './CartContext'; // Import the Cart Context
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for routing
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // Import cart icon from Heroicons
import ProductPopup from './ProductPopup'; // Import ProductPopup component
import { toast } from 'react-toastify';

const Product = () => {
  const { dispatch } = useCart();
  const [popupProduct, setPopupProduct] = useState(null);

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success('One Item added into the Cart .. ')
  };

  const openPopup = (product) => {
    setPopupProduct(product);
  };

  const closePopup = () => {
    setPopupProduct(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center my-20">
        {productDetails.map(product => (
          <div key={product.product_id} className="w-64 p-2 m-4 bg-white shadow-lg rounded-2xl">
            <img src={product.image} alt={product.product_name} className="w-32 p-4 m-auto h-36" />
            <div className="p-4 m-3 bg-pink-200 rounded-lg bg-color-model">
              <p className="text-xl font-bold text-white">{product.product_name}</p>
              <p className="text-xs text-gray-50">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-white">${product.new_price.toFixed(2)}</p>
                <button
                  type="button"
                  className="w-10 h-10 text-base text-white bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-700 addto-cart-color mr-2"
                  onClick={() => handleAddToCart(product)} // Add onClick handler
                >
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <Link
                  to={`/product/${product.product_id}`} // Ensure this path is correct based on your routing setup
                  className="w-24 h-10 text-base font-medium text-white bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-700 btn-custom-color"
                  onClick={() => openPopup(product)} // Open popup on link click
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />

      {/* Render ProductPopup if popupProduct is not null */}
      {popupProduct && <ProductPopup product={popupProduct} onClose={closePopup} />}
    </div>
  );
};

export default Product;
