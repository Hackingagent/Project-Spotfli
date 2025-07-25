import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
});

export const userGetServices = async ()=>{

    const token = localStorage.getItem('user_token');
    try {
        const response = await api.get('/user/getService', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
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



export const becomeServiceProvider = async(data) => {

    const token = localStorage.getItem('user_token');
    console.log('Token: ', token);

    try {
        const response = await api.post('/user/becomeServiceProvider', data, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })

        console.log(response);

        return {
            success: true,
            message: response.data.message,
            userService: response.data.userService,
        }
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}