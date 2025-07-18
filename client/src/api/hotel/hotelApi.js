import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hotel'; // This will proxy to http://localhost:5000/api/hotel

// Set up axios instance with auth token
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('admin_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// export const registerHotel = async (hotelData) => {
//   try {
//     const response = await api.post('/register', hotelData);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to register hotel');
//   }
// };

// export const getHotels = async () => {
//   try {
//     const response = await api.get('/');
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch hotels');
//   }
// };

// hotel login api calls

export const loginHotel  = async (credentials) => {
    try{
        const response = await api.post('/login', credentials);
        // Store token in localStorage or cookies
        if (response.data.hotel_token) {
            localStorage.setItem('hotel_token', response.data.hotel_token);
            localStorage.setItem('hotel', JSON.stringify(response.data.hotel));
            // Set default Authorization header for future requests
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            return {
                success: true,
                hotel: response.data.hotel,
            };
        }
    }catch(error){
        throw new Error(error.response?.data?.message || 'login failed');
    }
};

export const getCurrentHotel = async () => {
    const token = localStorage.getItem('hotel_token');
    console.log("Token", token);

    try {
        const response = await api.get('/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response);

        
      return {
        success: true,
        hotel: response.data.data,
      }
    }catch(error){
        throw new Error(error.response?.data?.message || 'Failed to fetch hotel data');
    }
};

// get hotel by id

export const getHotelById = async (id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer $(token)`,
    },
  };

  try{
    const response = await axios.get(`$(API_URL)/$(id)`, config);
    return response.data;
  }catch(error){
    throw error.response.data.message || 'Failed to fetch hotel';
  }
};
