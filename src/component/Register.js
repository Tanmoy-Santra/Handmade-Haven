import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './login.css'; // Ensure correct CSS import if needed

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User Registered Successfully:", user);

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "" // Example field, adjust as per your database structure
        });
      }
      alert("User Registered Successfully!!")
      navigate("/home");     
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert(error.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  bg-color-login">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h3 className="text-2xl font-bold mb-4">Sign Up</h3>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">First name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Last name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Email address</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>

        <div className="mb-4">
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline btn-custom-color">
            Sign Up
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already registered? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
