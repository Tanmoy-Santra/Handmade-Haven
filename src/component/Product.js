import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import productDetails from './ProductDetails';

const Product = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center my-20">
        {productDetails.map(product => (
          <div key={product.product_id} className="w-64 p-2 m-4 bg-white shadow-lg rounded-2xl">
            <img src={product.image} alt={product.product_name} className="w-32 p-4 m-auto h-36"/>
            <div className="p-4 m-3 bg-pink-200 rounded-lg bg-color-model">
              <p className="text-xl font-bold text-white">{product.product_name}</p>
              <p className="text-xs text-gray-50">{product.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-white">${product.new_price.toFixed(2)}</p>
                <button type="button" className="w-10 h-10 text-base font-medium text-white bg-pink-500 rounded-full hover:bg-pink-700 addto-cart-color">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mx-auto" fill="white" viewBox="0 0 1792 1792">
                    <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Product;
