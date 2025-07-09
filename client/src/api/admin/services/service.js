import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
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
    }}

export const addService = async(serviceData) => {
    try {

        console.log('getting token');
        const token = localStorage.getItem('admin_token');
        console.log('Token: ', token);

        await api.post('/admin/addService', serviceData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
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
        });
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}