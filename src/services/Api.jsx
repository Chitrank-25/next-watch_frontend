import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get or create user ID
export const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// Get movie recommendations
export const getRecommendations = async (userQuery) => {
  try {
    const userId = getUserId();
    const response = await api.post('/recommend', {
      userQuery,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

// Get user search history
export const getSearchHistory = async () => {
  try {
    const userId = getUserId();
    const response = await api.get(`/history/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting search history:', error);
    throw error;
  }
};

// Get saved recommendations
export const getSavedRecommendations = async () => {
  try {
    const userId = getUserId();
    const response = await api.get(`/recommendations/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting saved recommendations:', error);
    throw error;
  }
};

// Get recommendation by ID
export const getRecommendationById = async (id) => {
  try {
    const response = await api.get(`/recommendation/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting recommendation:', error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error with health check:', error);
    throw error;
  }
};

export default api;