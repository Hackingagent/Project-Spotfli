import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
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


export const loginUser = async (email, password) => {
  try {
    console.log('Starting Login');
    const response = await api.post('/user/login', { email, password });
    
    // Store token in localStorage or cookies
    if (response.data.token) {
      localStorage.setItem('user_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Set default Authorization header for future requests

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      return {
        success: true,
        user: response.data.user,
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


//Logout User
export const logoutUser = async() => {
  try {
    const response = await api.post('/user/logout');
    if(response){
      localStorage.removeItem('user_token');
      localStorage.removeItem('user');

      return {
        success: true,
        // user: response.data.user
      };
    }else{
      console.log('Error Processing Logout');
    }
    
  } catch (error) {
    console.error(error);
    let errorMessage = 'Logout Failed';
    return {
      success: false,
      message: errorMessage
    }
  }
}

// Add more API calls as needed