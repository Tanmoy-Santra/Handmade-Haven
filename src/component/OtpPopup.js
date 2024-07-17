import React, { useState, useEffect } from 'react';

const OtpPopup = ({ otp, setOtp, handleOtpSubmit, setGeneratedOtp, sendOtpEmail, setIsOtpPopupOpen }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleResendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`in otppopup = ${newOtp}`)
    setGeneratedOtp(newOtp);
    sendOtpEmail(newOtp);
    setTimer(60);
  };

  const handleClose = () => {
    setIsOtpPopupOpen(false); // Close the popup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-6 rounded shadow-md w-full max-w-sm">
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-700 text-2xl">&times;</button>
        <h3 className="text-2xl font-bold mb-4">OTP Verification</h3>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Enter OTP</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <button onClick={handleOtpSubmit} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline btn-custom-color">
            Submit
          </button>
          <button onClick={handleResendOtp} className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline btn-custom-color" disabled={timer > 0}>
            Resend OTP
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          {timer > 0 ? `Resend OTP in ${timer}s` : 'You can resend OTP now'}
        </p>
      </div>
    </div>
  );
};

export default OtpPopup;
