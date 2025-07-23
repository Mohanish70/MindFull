import axios from "axios";

// Create axios instance with centralized configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for logging/token injection
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
      });
      
      // Customize error messages based on status code
      if (error.response.status === 401) {
        error.message = "Please login to continue";
      } else if (error.response.status === 403) {
        error.message = "You don't have permission for this action";
      } else if (error.response.status === 404) {
        error.message = "Resource not found";
      } else if (error.response.status >= 500) {
        error.message = "Server error, please try again later";
      }
    } else if (error.request) {
      // Request was made but no response received
      error.message = "Network error, please check your connection";
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
  },
  
  logout: async () => {
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Logout failed");
    }
  },
};

// Recommendation Service
export const recommendationService = {
  getRecommendation: async (mood) => {
    try {
      const response = await api.post("/recommendations/getRecommendation", { mood });
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to get recommendation");
    }
  },
  
  joinChallenge: async (challengeName) => {
    try {
      const response = await api.post("/recommendations/joinChallenge", { challengeName });
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to join challenge");
    }
  },
};

// Meditation Service
export const meditationService = {
  getSessions: async () => {
    try {
      const response = await api.get("/meditations");
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch sessions");
    }
  },
  
  startSession: async (sessionId) => {
    try {
      const response = await api.post(`/meditations/${sessionId}/start`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to start session");
    }
  },
};

export default api;