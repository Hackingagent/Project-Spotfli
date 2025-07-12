import UserService from "../../../models/pivots/UserService.model.js";
import mongoose from "mongoose";
import Service from "../../../models/service.model.js";
import jwt from 'jsonwebtoken';
import User from "../../../models/user.model.js";


export const getPendingProviders = async(req, res) => {
    try {
        const providers = await UserService.find({status: 'pending'}).populate({
           path: 'user',
           select: 'first_name email',
           model: User,
        }).populate({
            path: 'service',
            select: 'name',
            model: Service,
        }).sort({ createdAt: -1 });

        const formattedProvider = providers.map(provider => ({
            id : provider._id,
            service: provider.service?.name,
            status: provider.status,
            user: provider.user?.first_name,
            name: provider.name,
            tell: provider.tell,
            experience: provider.experience,
            website: provider.website,
            appliedOn: provider.createdAt,
            userDetails: {
                first_name: provider.user?.first_name,
                last_name: provider.user?.last_name,
                email: provider.user?.email,
                phone: provider.user?.tell,
            },
            
        }))

        console.log('Pending Providers: ', formattedProvider);

        res.status(200).json({
            success: true,
            provider:formattedProvider
        })


    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
}

export const getApprovedProviders = async(req, res) => {
    try {
        const providers = await UserService.find({status: 'approved'}).populate({
           path: 'user',
           select: 'first_name email',
           model: User,
        }).populate({
            path: 'service',
            select: 'name',
            model: Service,
        }).sort({ createdAt: -1 });

        const formattedProvider = providers.map(provider => ({
            id : provider._id,
            service: provider.service?.name,
            status: provider.status,
            user: provider.user?.first_name,
        }))

        console.log('Approved Providers: ', formattedProvider);

        res.status(200).json({
            success: true,
            provider:formattedProvider
        })


    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
}

export const getRejectedProviders = async(req, res) => {
    try {
        const providers = await UserService.find({status: 'rejected'}).populate({
           path: 'user',
           select: 'first_name email',
           model: User,
        }).populate({
            path: 'service',
            select: 'name',
            model: Service,
        }).sort({ createdAt: -1 });

        const formattedProvider = providers.map(provider => ({
            id : provider._id,
            service: provider.service?.name,
            status: provider.status,
            user: provider.user?.first_name,
            userDetails: {
                first_name: provider.user?.first_name,
                last_name: provider.user?.last_name,
            }
        }))

        console.log('Rejected Providers: ', formattedProvider);

        res.status(200).json({
            success: true,
            provider:formattedProvider
        })


    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
}


export const approveProvider = async(req, res) => {
    try {
        const {id} = req.params;
        // const {name, fee} = req.body;

        //Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid service ID'
            });
        }

        //Find and update service
        const approveProvider = await UserService.findByIdAndUpdate(id,
            {status: 'approved'},
            {new: true, runValidators: true}
        );

        if(!approveProvider) {
            return res.status(404).json({
                success: false,
                message: 'Service Provider application not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service Provider Approved successfully',
        })

    }catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}