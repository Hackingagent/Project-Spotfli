import UserService from "../../../models/pivots/UserService.model.js";
import mongoose from "mongoose";
import Service from "../../../models/service.model.js";
import jwt from 'jsonwebtoken';
import User from "../../../models/user.model.js";





export const userGetService = async (req, res) => {
    try {
        const services = await Service.find()
            .populate({
                path: 'addedBy',
                select: 'first_name second_name' // Include whatever admin fields you want
            })
            .sort({ createdAt: -1 }); // Optional: sort by newest first

        // Transform the data for better frontend consumption
        const transformedServices = services.map(service => ({
            _id: service._id,
            name: service.name,
            fee: service.fee,
            addedby: service.addedBy 
                ? `${service.addedBy.first_name}` 
                : 'Unknown Admin',
            createdAt: service.createdAt
        }));

        res.status(200).json({
            success: true,
            services: transformedServices
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
}



export const becomeServiceProvider = async(req, res) => {
    try {
        console.log(req.body);
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const  user = await User.findById(decoded.id)
    
        const {name, email, tell, experience, service, website, termsAccepted} = req.body;

        const newUserService = new UserService({
            name: name,
            email: email,
            status: 'pending',
            tell: tell,
            experience: experience,
            service: service,
            website: website,
            termsAccepted: termsAccepted,
            user: user._id,
        })

        const userService = await newUserService.save();

        if(!userService) {
            return res.status(404).json({
                success: false,
                message: 'User Service not found'
            });
        }

        
        res.status(200).json({
            message: 'Service Application Submitted Successfully',
            userService,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}