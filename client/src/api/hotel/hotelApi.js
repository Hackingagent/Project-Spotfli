import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hotel'; // This will proxy to http://localhost:5000/api/hotel


// Set up axios instance with auth token
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
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
        const response = await api.post('/hotel/login', credentials);
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
        const response = await api.get('/hotel/me', {
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

// update hotel profile
export const updateHotelProfile = async (hotelId, hotelData) => {
  const token = localStorage.getItem('hotel_token');
  try{
      const response = await api.put(`/hotel/editProfile/${hotelId}`, hotelData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data; 
  }catch(error){
    throw new Error(error.response?.data?.message || 'Failed to update hotel profile');
  }
}
// update hotel password 
export const updatePassword = async (passwordData) => {
  const token = localStorage.getItem('hotel_token');
  
  try {
    const response = await api.put('/hotel/update-password', passwordData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update password');
  }
};
// get hotel overview
export const getHotelOverview = async () => {
  const token = localStorage.getItem('hotel_token');
  
  try {
    const response = await api.get('/hotel/overview', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch hotel overview');
  }
};
//add hotel room
export const addRoom = async (roomData) => {
  const token = localStorage.getItem('hotel_token');
  
  try {
    const response = await api.post('/hotel/rooms', roomData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add room');
  }
};

// delete hotel room 
export const deleteRoom = async (roomId) => {
  const token = localStorage.getItem('hotel_token');

  try{
    const response = await api.delete(`/hotel/rooms/${roomId}`,{
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
    return response.data
  }catch(error){
    throw new Error(error.message?.data?.message || 'Failed to delet room')
  }
};

//update hotel room
export const updateRoom = async (roomId, roomData) => {
  const token = localStorage.getItem('hotel_token');
  
  try {
    const response = await api.put(`/hotel/rooms/${roomId}`, roomData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update room');
  }
};

// hotel bookings management calls

export const getHotelBookings = async (status = '') => {
    const token = localStorage.getItem('hotel_token');
    try {
        const response = await axios.get(`${API_URL}/bookings?status=${status}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
};

export const updateBookingStatus = async (roomId, bookingId, statusData) => {
    const token = localStorage.getItem('hotel_token');
    try {
        const response = await axios.put(
            `${API_URL}/rooms/${roomId}/bookings/${bookingId}/status`,
            statusData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update booking status');
    }
};

export const createWalkInBooking = async (bookingData) => {
    const token = localStorage.getItem('hotel_token');
    try {
        const response = await axios.post(
            `${API_URL}/walk-in-booking`,
            bookingData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create walk-in booking');
    }
};

export const deleteHotelBooking = async (roomId, bookingId) => {
    const token = localStorage.getItem('hotel_token');
    try {
        const response = await axios.delete(
            `${API_URL}/rooms/${roomId}/bookings/${bookingId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete booking');
    }
};

// Get all hotels (public)
export const getAllHotels = async (queryParams = {}) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/?${queryString}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch hotels');
    }
};

// Get hotel details (public)
export const getHotelDetails = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch hotel details');
    }
};
