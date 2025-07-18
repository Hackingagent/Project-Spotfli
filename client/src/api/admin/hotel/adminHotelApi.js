import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const api = axios.create({
    baseURL: API_URL,
});

export const getHotels = async () => {
    const token = localStorage.getItem('admin_token');
  try {
    const response = await api.get('/',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch hotels');
  }
};