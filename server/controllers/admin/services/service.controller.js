import Service from "../../../models/service.model.js";
import mongoose from "mongoose";

// add new service
export const addService = async(req, res) => {
    try {
        const {name, fee} = req.body;
        console.log(req.admin);

        const newService = new Service({
            name:name,
            fee:fee,
            addedBy: req.admin,
        })

        await newService.save();

        res.status(200).json({
            message: 'Service Added Successfully',
            success: true,
            newService
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
}
// get all services
// controllers/service.controller.js
export const getService = async (req, res) => {
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

export const deleteService = async(req, res) => {
    try {
        const {id} = req.params;

        const deletedService  = await Service.findByIdAndDelete(id);

        if(!deletedService) {
            return res.status(404).json({
                message: 'Service not Found',
            })
        }

        res.status(200).json({
            message: 'Service deleted Successfully',
        })

    } catch (error) {
        console.log('Delete Error', error);
        res.status().json({
            message: 'Server Error',
        })
    }
}


export const updateService = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, fee} = req.body;

        //Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid service ID'
            });
        }

        //Find and update service
        const updatedService = await Service.findByIdAndUpdate(id,
            {name, fee},
            {new: true, runValidators: true}
        );

        if(!updatedService) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service updated successfully',
        })

    }catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};