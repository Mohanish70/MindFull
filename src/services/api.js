import axios from "axios";

// Create an axios instance with dynamic baseURL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api", // Use dynamic API URL from .env
  withCredentials: true, // ✅ Important for sending cookies/auth tokens
});

// Function to get a recommendation based on the user's mood
export const getRecommendation = async (mood) => {
  try {
    const response = await api.post('/recommendations/getRecommendation', { mood });
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendation:', error);
  }
};

// Function to join a meditation challenge
export const joinChallenge = async (challengeName) => {
  try {
    const response = await api.post('/recommendations/joinChallenge', { challengeName });
    return response.data;
  } catch (error) {
    console.error('Error joining challenge:', error);
  }
};

export default api;
