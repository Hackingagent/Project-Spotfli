import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/admin';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

export const getHotels = async () => {
    const token = localStorage.getItem('admin_token');
  try {
    const response = await api.get('/admin/',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch hotels');
  }
};

export const registerHotel = async (hotelData) => {
  const token = localStorage.getItem('admin_token');
  try {
    const response = await api.post('/admin/registerhotel', hotelData ,{
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to register hotel');
  }
};