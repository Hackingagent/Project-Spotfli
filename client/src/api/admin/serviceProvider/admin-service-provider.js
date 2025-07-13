import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
});

export const getProvider = async(status) => {
    const token = localStorage.getItem('admin_token');

    try {
        const response = await api.get(`/admin/getProviders/${status}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);

        return {
            success: true,
            provider: response.data.provider,
        };

    }catch(error){
        return {
            success: false,
            error
        }
    }
}


export const toggleProvider = async(id, status) => {
    const token = localStorage.getItem('admin_token');
    try {
        const response = await api.get(`/admin/toggleProvider/${id}/${status}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        return {
            success: true,
            message: response.data.message,
        };

    }catch(error){
        return {
            success: false,
            error
        }
    }
}