import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { db, auth } from './Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import LocalLoader from '../Loders/LocalLoader';
import ProductPopup from './ProductPopup';
import { Link } from 'react-router-dom';

const OrderHistory= ({ isOpen, onClose, userEmail }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShopNow = (order) => {
    
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'Orders'), where('user_email', '==', userEmail));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchOrders();
    }
  }, [userEmail]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-60 overflow-y-auto bg-gray-800 bg-opacity-50 mt-10">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Order Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {loading ? (
            <LocalLoader></LocalLoader>
          ) : (
            <div>
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <ul>
                {orders.map((order, index) => (
                <li key={index} className="border-b py-2">
                    <div className="flex items-center space-x-4">
                    <img 
                        src={order.product_image} 
                        alt={order.product_name} 
                        className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                        <div className="text-sm font-medium">Product Name: {order.product_name}</div>
                        <div className="text-sm">Product Id: {order.product_id}</div>
                        <div className="text-sm">Quantity: {order.quantity}</div>
                        <div className="text-sm">Total Price: ₹{order.total_price}</div>
                        <div className="text-sm">Order Date: {order.order_date}</div>
                        <br></br>
                        <Link
                         to={`/product/${order.product_id}`}
                        className="button bg-purple-500 text-white p-2 rounded-lg mt-10"
                    >
                    Repeat Order
                  </Link>
                  <br></br><br></br>
                    </div>
                    </div>
                </li>
                ))}

                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      
      {loading && <LocalLoader></LocalLoader>}
      
    </Dialog>
  );
};

export default OrderHistory;
