import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
});

export const getPendingProvider = async() => {
    const token = localStorage.getItem('admin_token');
    try {
        const response = await api.get('/admin/getPendingProvider', {
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

export const getApprovedProvider = async() => {
    const token = localStorage.getItem('admin_token');
    try {
        const response = await api.get('/admin/getApprovedProvider', {
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

export const getRejectedProvider = async() => {
    const token = localStorage.getItem('admin_token');
    try {
        const response = await api.get('/admin/getRejectedProvider', {
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


export const approveProvider = async(id) => {
    const token = localStorage.getItem('admin_token');
    try {
        const response = await api.get(`/admin/approveProvider/${id}`, {
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