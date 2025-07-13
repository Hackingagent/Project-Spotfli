import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminProtectedRoute = ({children}) => {
    
    const token = localStorage.getItem('admin_token');

    if(!token){
        return <Navigate to='/admin/login' replace />
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return children

}

export default AdminProtectedRoute