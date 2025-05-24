import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend base URL
  timeout: 10000, // 10 seconds timeout
});

// User API endpoints
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/user/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/user/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

// Add more API calls as needed