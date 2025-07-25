import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api/service-provider',
    timeout: 10000,
});

// Get User Service
export const getMyService =async () => {
const token = localStorage.getItem('user_token');
 try {
        const response = await api.get('/my-service', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        return {
            success: true,
            service: response.data.service,
        };

    }catch(error){
        return {
            success: false,
            error
        }
    }
}

// Update user service
export const updateService = async  (id, updated) => {
    try {
        const token = localStorage.getItem('user_token');
        console.log('Token: ', token);
        const response = await api.put(`${id}`, updated, {
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
        console.log('Response after edit, ', response)
        return {
            success: true,
            message: response.data.message,
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}

//Delete a service
export const deleteService = async(id) => {
    try {
        const token = localStorage.getItem('user_token');
    
        const response = await api.delete(`${id}`, {
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })

        console.log(response)
        return {
            success: true,
            message: response.data.message,
        }

    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}

