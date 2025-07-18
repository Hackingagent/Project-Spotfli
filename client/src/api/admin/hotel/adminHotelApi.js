import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';
const token = localStorage.getItem('admin_token');
const api = axios.create({
    baseURL: API_URL,
});

export const getHotels = async () => {
    
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

export const registerHotel = async (hotelData) => {
  try {
    const response = await api.post('/registerhotel', hotelData ,{
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to register hotel');
  }
};