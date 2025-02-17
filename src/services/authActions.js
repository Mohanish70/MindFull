import api from './api'; // Axios instance for API calls

// Login action
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token); // Store JWT token in localStorage
    return response.data; // Return user data after successful login
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error('Invalid credentials');
  }
};

// Register action
export const register = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data; // Return user data after successful registration
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error('Registration failed');
  }
};
