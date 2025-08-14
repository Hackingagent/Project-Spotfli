import PropertyRoom from '../../../models/property-rooms.model.js';
import fs from 'fs';


export const getPropertyRooms = async (req, res) => {
    try {
        const {propertyId} = req.params;

        const propertyRooms = await PropertyRoom.find({property: propertyId}).sort({ createdAt: -1 }).lean();

        console.log('Property Rooms: ', propertyRooms);

        
        res.status(200).json({
            success: true,
            propertyRooms: propertyRooms,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const addPropertyRoom = async (req, res) => {
    try {
        
        const {propertyId} = req.params;
        const {roomType, livingRoom, bedRoom, toilet, kitchen, price, description, quantityAvailable, amenities} = req.body;
        
        const uploadFiles = req.files || [];


        const files = uploadFiles.map(file => ({
            url: `/uploads/properties/rooms/${file.filename}`,
            path: file.path,
            originalName: file.originalName,
            mimeType: file.mimeType,
            size: file.size
        }));

        const newPropertyRoom = new PropertyRoom({
            property: propertyId,
            roomType: roomType,
            livingRoom: parseInt(livingRoom) || 0,
            bedRoom: parseInt(bedRoom) || 0,
            toilet: parseInt(toilet) || 0,
            kitchen: parseInt(kitchen) || 0,
            price: parseFloat(price) || 0,
            description: description,
            quantityAvailable: parseInt(quantityAvailable),
            amenities: amenities || [],
            files: files,
        })

        await newPropertyRoom.save();

        return res.status(200).json({
            success: true,
            message: 'Room Uploaded successfully',
        })



    } catch (error) {
        if (req.files) {
            req.files.forEach(file => {
            fs.unlinkSync(file.path);
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}