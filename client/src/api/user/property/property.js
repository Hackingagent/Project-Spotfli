import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 100000,
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
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
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
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return {
            success: true,
            error: error.message
        }
    }
}

export const getSingleProperty = async (id) => {
    try {

        const token = localStorage.getItem('user_token');

        const response = await api.get(`user/getSingleProperty/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        console.log('Response: ', response.data.property);
        return {
            success: true,
            property: response.data.property,
        }
    } catch (error) {

        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return {
            success: false,
            error: error.message
        }
    }
}

export const getPropertySubcategory = async(id) => {
    try {
        const token = localStorage.getItem('user_token');

        const response = await api.get(`user/getPropertySubcategory/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return{
            success: true,
            subcategory: response.data.subcategory
        }


    } catch (error) {
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return {
            success: false,
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
            property: response.data.property,
        }

    } catch (error) {
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return {
            success: false,
            error: error.message
        }
    }
}


export const updateProperty = async(id, formData) => {
    try {
        const token = localStorage.getItem('user_token');

        const response = await api.put(`/user/updateProperty/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return {
            success: false,
            error: error.message
        }
    }
}

export const deletePropertyFile = async(id, fileId) => {
    try{
        const token = localStorage.getItem('user_token');

        const response = await api.delete(`user/${id}/deletePropertyFile/${fileId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return {
            success: true,
            message: response.data.message,
        }

    }catch(error){
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return {
            success: false,
            error: error.message
        }
    }
}



export const addPropertyRoom = async(formData, propertyId) => {

    try {
        const token = localStorage.getItem('user_token');

        const response = await api.post(`user/addPropertyRoom/${propertyId}`, formData, {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'

            }
        });

        return {
            success: false,
            message: response.data.message,
        }
    } catch (error) {
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return{
            success: false,
            error: error.message
        }
    }
}


export const getPropertyRooms = async (propertyId) => {
    try {
        const token = localStorage.getItem('user_token');

        const response = await api.get(`user/getPropertyRooms/${propertyId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        console.log('Response from backend: ', response);

        return {
            success: true,
            propertyRooms: response.data.propertyRooms,
        }
    } catch (error) {
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return {
            success: false,
            error: error.message,
        }
    }
}



export const getAllProperties = async() => {

    try {
        const response = await api.get('/user/getAllProperties');
        console.log(response);

        return {
            success: true,
            properties: response.data.properties,
        };

    

    }catch(error){
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return {
            success: false,
            error
        }
    }
}




export const UpdatePropertyRoom = async(formData, propertyId) => {

    try {
        const token = localStorage.getItem('user_token');

        const response = await api.post(`user/updatePropertyRoom/${propertyId}`, formData, {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'

            }
        });

        return {
            success: false,
            message: response.data.message,
        }
    } catch (error) {
        if (error.response && error.response.data.redirectTo) {
            // Redirect user to login page
            window.location.href = error.response.data.redirectTo;
        }
        return{
            success: false,
            error: error.message
        }
    }
}
