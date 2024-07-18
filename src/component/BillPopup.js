import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import emailjs from 'emailjs-com'; // Import emailjs-com library
import logoIcon from './Assets/bg-white.png';
import { toast } from 'react-toastify';
import { db, storage } from './Firebase'; // Import Firebase Firestore and Storage
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import phonePay from './Assets/phonepe-icon.webp'
import googlePay from './Assets/google pay.png'
import upi from './Assets/upi.png'
const BillPopup = ({ product, quantity, totalPrice, user, onClose }) => {
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  // Validation state
  const [locationDetailsError, setLocationDetailsError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [transactionDetailsError, setTransactionDetailsError] = useState('');

  // Effect to validate fields on input change
  useEffect(() => {
    validateFields();
  }, [locationDetails, mobileNo, transactionId, showPaymentSection]);

  // Function to validate fields
  const validateFields = () => {
    const regexMobile = /^[6-9]\d{9}$/;
    const regexLocation = /^[#.0-9a-zA-Z\s,-]+$/;
    const regexTransaction = /^[A-Z0-9]{11}((\w|[:-]){0,30}[A-Z0-9])?$/;
    let isValid = true;

    if (!regexLocation.test(locationDetails)) {
      setLocationDetailsError('Location details cannot be empty or invalid location details');
      isValid = false;
    } else {
      setLocationDetailsError('');
    }

    if (showPaymentSection && transactionId && !regexTransaction.test(transactionId)) {
      setTransactionDetailsError('Enter valid Transaction ID');
      isValid = false;
    } else {
      setTransactionDetailsError('');
    }

    if (!regexMobile.test(mobileNo)) {
      setMobileNoError('Mobile number is invalid');
      isValid = false;
    } else {
      setMobileNoError('');
    }

    return isValid;
  };

  // Handle make payment button click
  const handleMakePayment = () => {
    setShowPaymentSection(true);
  };

  // Handle confirm order button click
  const handleConfirmOrder = async () => {
    if (validateFields()) {
      try {
        const imageUrl = await uploadImageToStorage(product.image);
        await saveOrderToFirestore(imageUrl);
        sendEmail(); // Send email when order is confirmed
        toast.success('Order confirmed!', { position: "top-center" });
        downloadBill();
        onClose();
      } catch (error) {
        console.error('Error saving order:', error);
        toast.error('Failed to confirm order. Please try again.', { position: "top-center" });
      }
    } else {
      toast.error('Please fill in all required fields correctly.', { position: "top-center" });
    }
  };

  // Function to upload image to Firebase Storage
  const uploadImageToStorage = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${product.product_id}`);
    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
  };

  // Function to save order details to Firestore
  const saveOrderToFirestore = async (imageUrl) => {
    const ordersCollection = collection(db, 'Orders');
    const orderData = {
      product_id: product.product_id,
      product_name: product.product_name,
      product_image: imageUrl, // Use the image URL from storage
      quantity,
      total_price: totalPrice,
      user_name: user.name,
      user_email: user.email,
      mobile_no: mobileNo,
      location_details: locationDetails,
      payment_method: showPaymentSection ? 'Online' : 'Manual',
      transaction_id: showPaymentSection && transactionId ? transactionId : 'NA',
      order_date: new Date().toLocaleString(),
    };

    await addDoc(ordersCollection, orderData);
  };

  // Function to send email using emailJS
  const sendEmail = () => {
    // Configure emailJS parameters (replace with your own IDs)
    const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
    const USER_ID = process.env.REACT_APP_USER_ID;

    // Prepare template parameters
    const currentDate = new Date().toLocaleString();
    const templateParams = {
      currentDate: currentDate,
      user_name: user.name,
      user_email: user.email, // Replace with your recipient email address
      message: `
          Order Details 
          --------------------------------- 
          Product ID : ${product.product_id} 
          Product Name : ${product.product_name}
          Product Image: ${product.image}
          Total Quantity : ${quantity} 
          Total Price : ${totalPrice.toFixed(2)} 
          Customer Name : ${user.name}
          Customer EmailId : ${user.email}
          Mobile No.: ${mobileNo}
          Location Details : ${locationDetails} 
          Payment Method : ${showPaymentSection ? 'Online' : 'Manual'}
          Transaction ID : ${showPaymentSection && transactionId ? transactionId : 'NA'}
          Order Date : ${currentDate}
      `
    };

    // Send email
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Email send error:', error);
      });
  };

  // Function to download bill as PDF
  const downloadBill = () => {
    const doc = new jsPDF();

    // Add watermark
    doc.setFontSize(30);
    doc.setTextColor(150);
    doc.text('Handmade Haven', 35, 150, { angle: -45 });

    // Add logo (assuming logoIcon is a base64 string)
    const logo = logoIcon;
    doc.addImage(logo, 'PNG', 160, 10, 40, 40);

    // Order Summary
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('Order Summary', 20, 60);

    // Add details
    const currentDate = new Date().toLocaleString();
    const details = [
      { key: 'Product ID', value: product.product_id },
      { key: 'Product Name', value: product.product_name },
      { key: 'Total Quantity', value: quantity },
      { key: 'Total Price', value: `$${totalPrice.toFixed(2)}` },
      { key: 'User', value: user.name },
      { key: 'Email', value: user.email },
      { key: 'Order Date', value: currentDate },
      { key: 'Mobile No.', value: mobileNo },
      { key: 'Location Details', value: locationDetails },
    ];

    if (showPaymentSection) {
      details.push({ key: 'Payment Method', value: 'Online' });
      if (transactionId) {
        details.push({ key: 'Transaction ID', value: transactionId });
      }
    } else {
      details.push({ key: 'Payment Method', value: 'Manual' });
    }

    doc.autoTable({
      startY: 70,
      body: details.map(({ key, value }) => [key, value]),
      theme: 'grid',
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
      styles: { cellPadding: 1, fontSize: 12, textColor: [0, 0, 0] },
    });

    // Save PDF
    doc.save(`${product.product_name}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 pt-20 mt-20 mb-20 rounded-lg max-w-md w-full relative overflow-y-auto max-h-screen">
        <button className="absolute top-15 right-3 bg-gray-500 text-white p-2 rounded-full" onClick={onClose}>
          &times;
        </button>
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex items-center mb-4">
              <img src={product.image} alt={product.product_name} className="h-20 w-20 rounded-lg mr-4" />
              <div>
                <p className="text-sm">Product ID: {product.product_id}</p>
                <p className="text-sm">Product Name: {product.product_name}</p>
                <p className="text-sm">Total Quantity: {quantity}</p>
                <p className="text-sm">Total Price: Rs.{totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            {/* User and email details */}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Your current location details:</label>
          <textarea
            rows="3"
            value={locationDetails}
            onChange={(e) => setLocationDetails(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg mb-4 ${locationDetailsError ? 'border-red-500' : ''}`}
            placeholder="Enter your current location details"
          />
          {locationDetailsError && <p className="text-red-500 text-xs">{locationDetailsError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Mobile No:</label>
          <input
            type="text"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg mb-4 ${mobileNoError ? 'border-red-500' : ''}`}
            placeholder="Enter your mobile number"
          />
          {mobileNoError && <p className="text-red-500 text-xs">{mobileNoError}</p>}
        </div>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${showPaymentSection ? 'hidden' : ''}`}
          onClick={handleMakePayment}
        >
          Make Payment
        </button>
        {showPaymentSection && (
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="text-lg font-bold mb-2">Payment Section</h3>
            <QRCode value="payment-info" className="mb-4" />
            <div className="flex justify-between mb-4">
              <img src={upi} alt="UPI" className="h-10" />
              <img src={phonePay} alt="PhonePe" className="h-6" />
              <img src={googlePay} alt="Google Pay" className="h-6" />
            </div>
            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4"
            />
            {transactionDetailsError && <p className="text-red-500 text-xs">{transactionDetailsError}</p>}
            <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700" onClick={() => setShowPaymentSection(false)}>
              Close Payment
            </button>
          </div>
        )}
        <button
          disabled={!locationDetails || !mobileNo || (showPaymentSection && !transactionId)}
          className={`mt-4 mx-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 `}
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default BillPopup;
