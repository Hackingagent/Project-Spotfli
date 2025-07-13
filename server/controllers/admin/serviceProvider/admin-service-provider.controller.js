import UserService from "../../../models/pivots/UserService.model.js";
import mongoose from "mongoose";
import Service from "../../../models/service.model.js";
import jwt from 'jsonwebtoken';
import User from "../../../models/user.model.js";


export const getProviders = async (req, res) => {
    try {

        const {status} = req.params;
                
        const providers = await UserService.find({status: status}).populate({
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


export const toggleProvider = async(req, res) => {
    try {
        const {id, status} = req.params;
        // const {name, fee} = req.body;
        console.log('id: ', id, 'Status: ', status);

        //Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid service ID'
            });
        }
        //Find and update service
        const provider = await UserService.findByIdAndUpdate(id,
            {
                status: status,
                toggledBY: req.admin
            },
            {new: true, runValidators: true}
        );

        if(!provider) {
            return res.status(404).json({
                success: false,
                message: 'Service Provider application not found'
            });
        }

        if(status == 'approved'){
            const message = 'Service Provider Approved successfully'
        }else if(status == 'declined'){
            const message = 'Service Provider Rejected successfully'
        }

        res.status(200).json({
            success: true,
            message
        })

    }catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const rejectProvider = async(req, res) => {
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
            {
                status: 'rejected',
                toggledBY: req.admin
            },
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

