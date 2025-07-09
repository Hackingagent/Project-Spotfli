import Service from "../../../models/service.model.js";
import mongoose from "mongoose";


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