import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
});

export const getCategories = async ()=>{

    const token = localStorage.getItem('admin_token');
    try {
        const response = await api.get('/admin/getCategory', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        return {
            success: true,
            category: response.data.categories,
        };

    }catch(error){
        return {
            success: false,
            error
        }
    }
}


export const addCategory = async(data) => {
    try {

        console.log('getting token');
        const token = localStorage.getItem('admin_token');
        console.log('Token: ', token);

        const response = await api.post('/admin/addCategory', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log('Response from Controller: ', response);
        
        if(response){
            console.log(response);
            if(response.data.success){
                console.log('Category Added ');
                return {
                    success: true,
                    message: response.data.message,
                    category: response.data.categories,
                }
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.response.data.error
        }
    }
}


export const addSubCategory = async(data, id) => {
    try {

        console.log('getting token');
        const token = localStorage.getItem('admin_token');
        console.log('Token: ', token);

        const response = await api.put(`/admin/addSubCategory/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log('Response from Controller: ', response);
        
        if(response){
            console.log(response);
            if(response.data.success){
                console.log('Category Added ');
                return {
                    success: true,
                    message: response.data.message,
                    category: response.data.categories,
                }
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.response.data.error
        }
    }
}


export const getSubCategories = async (id)=>{

    const token = localStorage.getItem('admin_token');
    try {
        const response = await api.get(`/admin/getSubCategories/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        return {
            success: true,
            subCategory: response.data.subCategories,
        };

    }catch(error){
        return {
            success: false,
            error
        }
    }
}



//Fields API
export const getFields = async (categoryId, subcategoryId)=>{

    const token = localStorage.getItem('admin_token');
    try {
        const response = await api.get(`/admin/${categoryId}/subcategories/${subcategoryId}/getFields`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        return {
            success: true,
            fields: response.data.fields,
        };

    }catch(error){
        return {
            success: false,
            error
        }
    }
}



export const addFields = async(categoryId, subcategoryId, fields) => {
    try {

        console.log('getting token');
        const token = localStorage.getItem('admin_token');
        console.log('Token: ', token);

        const response = await api.post(`/admin/${categoryId}/subcategories/${subcategoryId}/addField`, {fields}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log('Response from Controller: ', response);
        
        if(response){
            console.log(response);
            if(response.data.success){
                console.log('Category Added ');
                return {
                    success: true,
                    message: response.data.message,
                    // category: response.data.categories,
                }
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.response.data.error
        }
    }
}
// export const deleteService = async(id) => {
//     try {
//         const token = localStorage.getItem('admin_token');
    
//         const response = await api.delete(`/admin/deleteService/${id}`, {
//             headers : {
//                 Authorization: `Bearer ${token}`,
//             }
//         })

//         console.log(response)
//         return {
//             success: true,
//             message: response.data.message,
//         }

//     } catch (error) {
//         return {
//             success: false,
//             message: error.message,
//         }
//     }

// }

// export const updateService = async  (id, updated) => {
//     try {
//         const token = localStorage.getItem('admin_token');
//         console.log('Token: ', token);
//         const response = await api.put(`/admin/updateService/${id}`, updated, {
//             headers : {
//                 Authorization: `Bearer ${token}`,
//             }
//         })
//         console.log('Response after edit, ', response)
//         return {
//             success: true,
//             message: response.data.message,
//         }
//     } catch (error) {
//         return {
//             success: false,
//             message: error.message,
//         }
//     }
// }