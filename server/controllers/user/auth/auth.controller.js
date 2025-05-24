import User  from "../../../models/user.model.js";
import Admin from "../../../models/admin.model.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'


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
            password: hashedPassword
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
    
