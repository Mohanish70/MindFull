import axios from 'axios';

// Create axios instance with centralized configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://mindfull-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor for token injection and logging
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('mindwell_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          errorMessage = error.response.data?.message || 'Invalid request';
          break;
        case 401:
          errorMessage = 'Your session has expired. Please login again.';
          // Clear token and redirect if needed
          localStorage.removeItem('mindwell_token');
          break;
        case 403:
          errorMessage = 'You don\'t have permission to access this resource';
          break;
        case 404:
          errorMessage = 'Requested resource not found';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = error.response.data?.message || 'Request failed';
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'Network error. Please check your internet connection.';
    }

    console.error('API Error:', errorMessage);
    return Promise.reject(errorMessage);
  }
);

// Authentication Services
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('mindwell_token', response.data.token);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('mindwell_token');
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Meditation Services
export const meditationAPI = {
  getAllSessions: async () => {
    const response = await api.get('/meditations');
    return response.data;
  },
  
  getSessionDetails: async (id) => {
    const response = await api.get(`/meditations/${id}`);
    return response.data;
  },
  
  startSession: async (id) => {
    const response = await api.post(`/meditations/${id}/start`);
    return response.data;
  },
  
  completeSession: async (id, duration) => {
    const response = await api.post(`/meditations/${id}/complete`, { duration });
    return response.data;
  },
  
  getSessionHistory: async () => {
    const response = await api.get('/meditations/history');
    return response.data;
  }
};

// Recommendation Services
export const recommendationAPI = {
  getMoodRecommendation: async (mood) => {
    const response = await api.post('/recommendations/mood', { mood });
    return response.data;
  },
  
  joinChallenge: async (challengeName) => {
    const response = await api.post('/recommendations/challenges/join', { challengeName });
    return response.data;
  },
  
  getActiveChallenges: async () => {
    const response = await api.get('/recommendations/challenges');
    return response.data;
  },
  
  getChallengeProgress: async (challengeId) => {
    const response = await api.get(`/recommendations/challenges/${challengeId}/progress`);
    return response.data;
  }
};

// User Profile Services
export const profileAPI = {
  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },
  
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/profile/password', { currentPassword, newPassword });
    return response.data;
  },
  
  getActivityStats: async () => {
    const response = await api.get('/profile/stats');
    return response.data;
  }
};

export default api;