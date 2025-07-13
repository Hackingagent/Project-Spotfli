import User  from "../../../models/user.model.js";
import Admin from "../../../models/admin.model.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


//user registration,
export const registerUser = async(req, res) => {
    console.log(req);
    
    try {

        const { first_name, last_name, email, gender, dob, password } = req.body;

        // 2. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create new user
        const newUser = new User({
            first_name,
            last_name,
            email,
            gender,
            dob,
            password: hashedPassword,
            is_service_provider: 'no',
        });

        // 5. Save user to database
        const savedUser = await newUser.save();

        // 6. Prepare response (exclude password)
        const userResponse = {
            _id: savedUser._id,
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            gender: savedUser.gender,
            dob: savedUser.dob,
            email: savedUser.email,
            createdAt: savedUser.createdAt
        };

        // 7. Send response
        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
};

// User login
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    console.log(req.body); // Check the incoming request data
    if (!email || !password) {
        return res.status(400).json({ 
            success: false,
            message: 'Email and password are required' 
        });
    }
    // 2. Check if user exists
    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials',
        })
    }
   
    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials',
        })
    }
    
  
    
    if(user){
            // 4. Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            '3ae523ee38bfece8bbbfa327ac41f6ac5ec438db998b28ffb12662d2b77d87fb',
            { expiresIn: '2h' || '2h' }
        );
    
        // 5. Send response with token
        res.json({
            _id: user._id,
            first_name: user.name,
            last_name: user.name,
            email: user.email,
            token,
            user:  await User.findOne({ email }),
        });
    }

});

//User Logout 

export const logoutUser = (req, res) => {
    try {
        res.status(200).json({
            message: 'User Logged Out Successfully',
        })
    } catch (error) {
        console.error('Unknown Error', error);
        res.status(500).json({
            message: 'Error Logging Out',
            error: error.message
        });
    }
}
    
