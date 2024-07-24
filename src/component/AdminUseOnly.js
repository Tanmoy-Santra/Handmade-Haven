import React, { useState } from 'react';
import { db, storage } from './Firebase'; // Import storage from Firebase
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

export default function AdminUseOnly() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      // Upload image to Firebase Storage
      let imageUrl = '';
      if (productImage) {
        const imageRef = ref(storage, `images/${productImage.name}`);
        await uploadBytes(imageRef, productImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Add product to Firestore
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
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="container mx-auto px-2 py-6 max-w-2xl text-white mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Admin Panel - Add Product</h1>
      <div className="space-y-4 text-white">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="productId">
            Product ID
          </label>
          <input
            id="productId"
            type="text"
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
            onchange="readURL(this);"
            accept=".jpg, .jpeg, .png"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddProduct}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn-custom-color"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
