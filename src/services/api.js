// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Add `/api` to match backend routes
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
