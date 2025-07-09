import Admin from "../../../models/admin.model.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';



// Admin login
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    console.log(req.body); // Check the incoming request data
    if (!email || !password) {
        return res.status(400).json({ 
            success: false,
            message: 'Email and password are required' 
        });
    }
    // 2. Check if Admin exists
    const admin = await Admin.findOne({ email }).select('+password');

    if(!admin){
        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials (1)',
        })
    }
   
    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);

    if(!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials',
        })
    }
    
  
    
    if(admin){
            // 4. Generate JWT token
        const admin_token = jwt.sign(
            { id: admin._id, email: admin.email },
            '3ae523ee38bfece8bbbfa327ac41f6ac5ec438db998b28ffb12662d2b77d87fb',
            { expiresIn: '2h' || '2h' }
        );
    
        // 5. Send response with token
        res.json({
            _id: admin._id,
            first_name: admin.name,
            last_name: admin.name,
            email: admin.email,
            admin_token,
        });
    }

});


//Admin Logout 
export const logoutAdmin = (req, res) => {
    try {
        res.status(200).json({
            message: 'Admin Logged Out Successfully',
        })
    } catch (error) {
        console.error('Unknown Error', error);
        res.status(500).json({
            message: 'Error Logging Out',
            error: error.message
        });
    }
}
    
