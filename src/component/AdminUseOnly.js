import React, { useState, useEffect } from 'react';
import { db, storage } from './Firebase'; // Import storage from Firebase
import { collection, addDoc, deleteDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import LocalLoader from '../Loders/LocalLoader';

export default function AdminUseOnly() {
  const [activeTab, setActiveTab] = useState('add');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [removeProductId, setRemoveProductId] = useState('');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [newDeliveryStatus, setNewDeliveryStatus] = useState('');

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
      fetchProducts();
    }
  }, [activeTab]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setSelectedImage(file.name);
    } else {
      setProductImage(null);
      setSelectedImage(null);
    }
  };

  const handleAddProduct = async () => {
    setLoading(true);
    try {
        let imageUrl = '';
        if (productImage) {
            const imageRef = ref(storage, `images/${productImage.name}`);
            await uploadBytes(imageRef, productImage);
            imageUrl = await getDownloadURL(imageRef);
        }
        
        console.log({
            product_id: productId,
            product_name: productName,
            description: productDescription,
            old_price: parseFloat(oldPrice),
            new_price: parseFloat(newPrice),
            image: imageUrl,
        });

        await addDoc(collection(db, 'Products'), {
            product_id: productId,
            product_name: productName,
            description: productDescription,
            old_price: parseFloat(oldPrice),
            new_price: parseFloat(newPrice),
            image: imageUrl,
        });
        
        toast.success('Product added successfully');
        setProductId('');
        setProductName('');
        setProductDescription('');
        setOldPrice('');
        setNewPrice('');
        setProductImage(null);
    } catch (error) {
        console.error('Error adding product:', error.message);
        toast.error('Error adding product: ' + error.message);
    } finally {
        setLoading(false);
    }
};


  const handleRemoveProduct = async () => {
    setLoading(true);
    try {
      if (!removeProductId) {
        toast.error('Please provide Product ID');
        setLoading(false);
        return;
      }

      const q = query(collection(db, 'Products'), where('product_id', '==', removeProductId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error('Product not found');
        setLoading(false);
        return;
      }

      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, 'Products', docSnapshot.id));
        toast.success('Product removed successfully');
      });

      setRemoveProductId('');
    } catch (error) {
      console.error('Error removing product:', error.message);
      toast.error('Error removing product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Orders'));
      const ordersList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Order date from Firestore:', data.order_date);
        return {
          id: doc.id,
          ...data,
          order_date: data.order_date || null,
          delivery_date: data.delivery_date || null
        };
      });
      setOrders(ordersList);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      toast.error('Error fetching orders: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'Products'));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      toast.error('Error fetching products: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      console.error('No date provided.');
      return 'Invalid Date';
    }
    
    if (date.toDate && typeof date.toDate === 'function') {
      // Firestore Timestamp
      try {
        return new Date(date.toDate()).toLocaleDateString();
      } catch (error) {
        console.error('Error formatting Firestore Timestamp:', error);
        return 'Invalid Date';
      }
    } else if (date instanceof Date && !isNaN(date.getTime())) {
      // JavaScript Date object
      return date.toLocaleDateString();
    } else if (typeof date === 'string') {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString();
      } else {
        console.error('Invalid date string:', date);
        return 'Invalid Date';
      }
    } else {
      console.error('Unrecognized date format:', date);
      return 'Invalid Date';
    }
  };
  
  

  const handleUpdateDeliveryStatus = async () => {
    setLoading(true);
    try {
      if (!selectedOrderId || !newDeliveryStatus) {
        toast.error('Please provide Order ID and Delivery Status');
        setLoading(false);
        return;
      }

      const orderDocRef = doc(db, 'Orders', selectedOrderId);
      await updateDoc(orderDocRef, {
        delivery_status: newDeliveryStatus,
      });

      toast.success('Delivery status updated successfully');
      setSelectedOrderId('');
      setNewDeliveryStatus('');
      fetchOrders();
    } catch (error) {
      console.error('Error updating delivery status:', error.message);
      toast.error('Error updating delivery status: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductDetails = (productId) => {
    const product = products.find(product => product.product_id === productId);
    return product || {};
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-2 py-6 max-w-2xl text-white mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Admin Panel</h1>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 text-white font-bold rounded-l ${activeTab === 'add' ? 'bg-blue-500' : 'bg-gray-600'}`}
            onClick={() => setActiveTab('add')}
          >
            Add Product
          </button>
          <button
            className={`px-4 py-2 text-white font-bold rounded-r ${activeTab === 'remove' ? 'bg-red-500' : 'bg-gray-600'}`}
            onClick={() => setActiveTab('remove')}
          >
            Remove Product
          </button>
          <button
            className={`px-4 py-2 text-white font-bold rounded-r ${activeTab === 'orders' ? 'bg-green-500' : 'bg-gray-600'}`}
            onClick={() => setActiveTab('orders')}
          >
            Order Details
          </button>
        </div>

        {activeTab === 'add' && (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="productId">
                Product ID
              </label>
              <input
                id="productId"
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="productName">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="productDescription">
                Product Description
              </label>
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="oldPrice">
                Old Price
              </label>
              <input
                id="oldPrice"
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="newPrice">
                New Price
              </label>
              <input
                id="newPrice"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="productImage">
                Product Image
              </label>
              <input
                id="productImage"
                type="file"
                onChange={handleImageChange}
                className="block w-full text-white"
              />
              {selectedImage && <p className="text-white mt-2">{selectedImage}</p>}
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleAddProduct}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'remove' && (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold mb-4">Remove Product</h2>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="removeProductId">
                Product ID
              </label>
              <input
                id="removeProductId"
                type="text"
                value={removeProductId}
                onChange={(e) => setRemoveProductId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleRemoveProduct}
                disabled={loading}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Removing...' : 'Remove Product'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            {loading ? (
              <LocalLoader />
            ) : (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="orderId">
                    Select Order ID
                  </label>
                  <select
                    id="orderId"
                    value={selectedOrderId}
                    onChange={(e) => setSelectedOrderId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Order</option>
                    {orders.map((order) => (
                      <option key={order.id} value={order.id}>
                        {order.id}
                      </option>
                    ))}
                  </select>
                </div>
                {orders.length > 0 && (
                  <div className="text-white">
                    {orders.map((order) => {
                      const product = getProductDetails(order.product_id);
                      return (
                        <div key={order.id} className="border p-4 rounded mb-4">
                          <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
                          {product.image && <img src={product.image} alt={product.product_name} className="w-32 h-32 object-cover mt-2" />}
                          <p><strong>User Email:</strong> {order.user_email}</p>
                          <p><strong>Order Date:</strong> {formatDate(order.order_date)}</p>
                          <p><strong>Product ID:</strong> {order.product_id}</p>
                          <p><strong>Product Name:</strong> {product.product_name}</p>
                          <p><strong>Delivery Status:</strong> {order.delivery_status}</p>
                          <p><strong>Delivery Date:</strong> {formatDate(order.delivery_date)}</p>
                          {/* Add other fields as needed */}
                        </div>
                      );
                    })}
                  </div>
                )}
                {selectedOrderId && (
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="deliveryStatus">
                      Delivery Status
                    </label>
                    <input
                      id="deliveryStatus"
                      type="text"
                      value={newDeliveryStatus}
                      onChange={(e) => setNewDeliveryStatus(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={handleUpdateDeliveryStatus}
                        disabled={loading}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        {loading ? 'Updating...' : 'Update Status'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
