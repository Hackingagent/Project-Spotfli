import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your backend base URL

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('user_token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

export const createBooking = async (hotelId, roomId, bookingData) => {
    try {
        const response = await axios.post(
            `${API_URL}/hotels/${hotelId}/rooms/${roomId}/book`,
            bookingData,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
};

export const getUserBookings = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/user/bookings`,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
};

export const cancelUserBooking = async (hotelId, roomId, bookingId) => {
    try {
        const response = await axios.put(
            `${API_URL}/hotels/${hotelId}/rooms/${roomId}/bookings/${bookingId}/cancel`,
            {},
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to cancel booking');
    }
};