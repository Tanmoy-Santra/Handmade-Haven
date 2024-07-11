import React, { useState } from 'react';
import { useCart } from './CartContext'; // Import CartContext for cart management

const ProductPopup = ({ product, onClose }) => {
  const { cart, dispatch } = useCart();
  const [quantity, setQuantity] = useState(1); // State for quantity

  // Function to handle increasing quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decreasing quantity (minimum 1)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Calculate total price based on the quantity and product price
  const totalPrice = product.new_price * quantity;

  // Function to handle adding the product to cart with selected quantity
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    onClose(); // Close the popup after adding to cart
  };

  // Function to handle making the payment (placeholder for now)
  const handleMakePayment = () => {
    alert(`You are making a payment for ${quantity} ${product.product_name}(s) totaling $${totalPrice.toFixed(2)}.`);
    onClose(); // Close the popup after making payment (replace with actual payment logic)
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button className="absolute top-3 right-3 bg-gray-500 text-white p-2 rounded-full" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{product.product_name}</h2>
        <div className="flex justify-between">
          <div className="w-1/2">
            <img src={product.image} alt={product.product_name} className="w-full rounded-lg mb-4" />
            <p className="text-sm">{product.description}</p>
          </div>
          <div className="w-1/2 px-4">
            <p className="text-xl font-bold mb-2">${product.new_price.toFixed(2)}</p>
            <div className="flex items-center mb-4">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-400"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-400"
              >
                +
              </button>
            </div>
            <p className="mt-4 text-lg font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 btn-custom-color"
              onClick={handleMakePayment}
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
