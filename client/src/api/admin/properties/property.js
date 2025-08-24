import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 10000,
});
export const getProperties = async(status) => {
    const token = localStorage.getItem('admin_token');

    try {
        const response = await api.get(`/admin/getProperties/${status}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("Response from Backend: ", response);

        return {
            success: true,
            properties: response.data.properties,
        };

    

    }catch(error){
        return {
            success: false,
            error
        }
    }
}


export const toggleProperty = async(id, status) => {

    try {

        const token = localStorage.getItem('admin_token');

        const response = await api.put(`/admin/toggleProperty/${id}/${status}`, {}, {
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