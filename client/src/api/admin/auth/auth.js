import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend base URL
  timeout: 10000, // 10 seconds timeout
});

export const loginAdmin = async (email, password) => {
    try {

        const response = await api.post('/admin/login', { email, password });
        
        // Store token in localStorage or cookies
        if (response.data.admin_token) {
            localStorage.setItem('admin_token', response.data.admin_token);
            localStorage.setItem('admin', JSON.stringify(response.data.admin));
            // Set default Authorization header for future requests
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            return {
                success: true,
                admin: response.data.admin,
            };
        }

        if(!response.data.success){
            console.log(response.data.message);
            return {
                success: false,
                message: response.data.message,
            }
        }
        
    } catch (error) {
        
        let errorMessage = 'Login failed';
        if (error.response) {
             errorMessage = error.response.data.message || errorMessage;
        }

        return {
            success: false,
            message: errorMessage
        };
    }
};
  