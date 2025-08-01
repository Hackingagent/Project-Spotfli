import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
});

export const getCategories = async ()=>{

    const token = localStorage.getItem('user_token');
    try {
        const response = await api.get('/user/getCategory', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        return {
            success: true,
            category: response.data.categories,
            categories: response.data.category,
        };

    }catch(error){
        return {
            success: false,
            error
        }
    }
}
