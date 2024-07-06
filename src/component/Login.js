import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from 'react-router-dom';
import SignInWithGoogle from "./SigninWithgoogle";
import { Link } from "react-router-dom";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully", userCredential.user);
      alert("logged in Successfully..")
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Failed to login !!")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-color-login">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h3 className="text-2xl font-bold mb-4">Login</h3>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Email address</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline btn-custom-color">
            Submit
          </button>
        </div>

        

        <p className="text-center text-sm text-gray-600">
          New user? <Link to="/register" className="text-blue-500 hover:underline">Register Here</Link>
        </p>

        <SignInWithGoogle />
      </form>
    </div>
  );
};

export default Login;
