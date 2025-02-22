import React, { useState } from "react";
import "./Register.css"; // Correct path if the CSS is in the same folder
 // Import Register.css (adjust path if necessary)
import { register } from "../services/authActions"; // Import register action

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password }); // Trigger the register action
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="mb-4 p-2 border w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-2 border w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 p-2 border w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
