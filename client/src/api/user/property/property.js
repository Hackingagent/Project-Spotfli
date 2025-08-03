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

export const getUserProperties = async() => {
    const token = localStorage.getItem('user_token');

    try {
        const response = await api.get('user/getUserProperties', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        console.log('Response', response);
        return {
            success: true,
            properties: response.data.properties

        };
    } catch (error) {
        return {
            success: true,
            error: error.message
        }
    }
}


export const addProperty = async(formData) => {

    console.log(formData);
    const token = localStorage.getItem('user_token');
    console.log('Get Token: ', token);

    try {
        const response = await api.post('/user/addProperty', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(response);

        return {
            success: true,
            message: response.data.message,

        }
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}
