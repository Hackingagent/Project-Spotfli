import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const UserProtectedRoute = ({children}) => {
    
    const token = localStorage.getItem('user_token');

    if(!token){
        return <Navigate to='/login' replace />
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return children

}

export default UserProtectedRoute