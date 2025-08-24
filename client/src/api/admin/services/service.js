import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 10000,
});

export const getServices = async ()=>{

    const token = localStorage.getItem('admin_token');
    try {
        const response = await api.get('/admin/getService', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        return {
            success: true,
            service: response.data.services,
        };

    }catch(error){
        return {
            success: false,
            error
        }
    }
}


export const addService = async(serviceData) => {
    try {

        console.log('getting token');
        const token = localStorage.getItem('admin_token');
        console.log('Token: ', token);

        const response = await api.post('/admin/addService', serviceData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        if(response){
            console.log(response);
            if(response.data.success){
                console.log('Service Added ');
                return {
                    success: true,
                    message: response.data.message,
                    service: response.data.newService,
                }
            }else{
                return {
                    success: false,
                    message: response.data.message
                }
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const deleteService = async(id) => {
    try {
        const token = localStorage.getItem('admin_token');
    
        const response = await api.delete(`/admin/deleteService/${id}`, {
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

export const updateService = async  (id, updated) => {
    try {
        const token = localStorage.getItem('admin_token');
        console.log('Token: ', token);
        const response = await api.put(`/admin/updateService/${id}`, updated, {
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