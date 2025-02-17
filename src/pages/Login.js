import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();  // Get the login function from AuthContext
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // State for displaying errors

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Attempt to log in with the email and password
      await login(email, password); 
      
      // After successful login, navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      // If an error occurs, display a message
      setErrorMessage('Invalid credentials!'); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>

        {/* Show error message if there's any */}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
