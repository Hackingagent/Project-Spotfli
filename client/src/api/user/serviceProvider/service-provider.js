import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 10000,
});

export const userGetServices = async () => {
    const token = localStorage.getItem('user_token');
    try {
        const response = await api.get('/user/getService', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('Raw API Response:', response.data); // Debug log
        
        // Handle different response structures
        const servicesData = response.data?.service || 
                           response.data?.services || 
                           response.data?.data?.services || 
                           response.data?.data || 
                           [];
        
        return {
            success: true,
            services: Array.isArray(servicesData) ? servicesData : [],
            rawData: response.data // For debugging
        };
    } catch (error) {
        console.error('Error fetching services:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to fetch services',
            status: error.response?.status
        };
    }
};

export const becomeServiceProvider = async (data) => {
    const token = localStorage.getItem('user_token');
    try {
        const response = await api.post('/user/becomeServiceProvider', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('Registration Response:', response.data); // Debug log
        
        return {
            success: true,
            message: response.data.message,
            user: response.data.user || response.data.data,
            status: response.status
        };
    } catch (error) {
        console.error('Error becoming service provider:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to submit application',
            status: error.response?.status,
            validationErrors: error.response?.data?.errors
        };
    }
};