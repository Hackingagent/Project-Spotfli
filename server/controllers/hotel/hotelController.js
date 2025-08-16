import jwt from "jsonwebtoken";
const { JsonWebTokenError, sign, verify } = jwt;
import Hotel from "../../models/Hotel.model.js";
import Admin from "../../models/admin.model.js";


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loginHotel = async (req, res) => {
    try{
        const {email, password} = req.body;

        //check if hotel exists
        const hotel = await Hotel.findOne({ email }).select('+password');

        if(!hotel){
            return res.status(401).json({message: 'Ivalid Credentials'});
        }

        // check password
        const isMatch = await hotel.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Generate token

        const hotel_token = jwt.sign(
            {id: hotel._id, role: 'hotel'},
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        return res.status(200).json({
            success: true,
            hotel_token,
            hotel: await Hotel.findOne({ email }),
        });
    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({message: 'Server error during login'});
    }
};


export const registerHotel = async (req, res) => {
    try{
        const {hotelName, email, password, phone, address, city, description, amenities } = req.body;
        
        const addedBy = req.admin;  // Get admin ID from authenticated request
        //check if hotel with this email already exists
        const hotelExists = await Hotel.findOne({ email });
        if(hotelExists){
            return res.status(400).json({message: 'Hotel already Exists with the same email'});
        }

        const newHotel = await Hotel.create({
            hotelName,
            email,
            password,
            phone,
            address,
            city,
            description,
            amenities,
            addedBy
        });
        
        newHotel.save();

        res.status(201).json({
            success: true,
            data: newHotel
        });

    }catch(error){
        console.error('Hotel Registration error: ', error);
        res.status(500).json({
            message: error.message || 'Server error during registration'
        });
    }
};
//get hotel overview
export const getHotelOverview = async (req, res) => {
    try {
        const hotelId = req.hotel._id;
        
        if (!hotelId) {
            return res.status(400).json({ message: 'Hotel authentication failed' });
        }

        const hotel = await Hotel.findById(hotelId)
            .select('hotelName description images rooms')
            .lean();

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Calculate room statistics
        const roomStats = {
            totalRooms: hotel.rooms.length,
            availableRooms: hotel.rooms.filter(room => room.isAvailable).length,
            occupiedRooms: hotel.rooms.filter(room => 
                room.bookings.some(booking => 
                    booking.status === 'confirmed' && 
                    new Date(booking.checkInDate) <= new Date() && 
                    new Date(booking.checkOutDate) >= new Date()
                )
            ).length,
            reservedRooms: hotel.rooms.filter(room => 
                room.bookings.some(booking => 
                    booking.status === 'confirmed' && 
                    new Date(booking.checkInDate) > new Date()
                )
            ).length
        };

        res.status(200).json({
            success: true,
            data: {
                ...hotel,
                ...roomStats
            }
        });

    } catch (error) {
        console.error('Get hotel overview error:', error);
        res.status(500).json({ 
            message: error.message || 'Server error while getting hotel overview',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

//update hotel profile
export const updateHotelProfile = async (req, res) => {
    try {
        const { hotelName, email, phone, address, city, description, amenities } = req.body;
        const hotelId = req.hotel._id;
        
        if (!hotelId) {
            return res.status(400).json({ message: 'Hotel authentication failed' });
        }

        // Get existing hotel 
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Handle new images
        let updatedImages = [...hotel.images];
        if (req.files && req.files.length > 0) {
            updatedImages = [...updatedImages, ...req.files.map(file => file.path)];
        }

        // Update hotel data
        const updatedHotel = await Hotel.findByIdAndUpdate(
            hotelId,
            {
                hotelName,
                email,
                phone,
                address,
                city,
                description,
                amenities: amenities?.split(',').map(item => item.trim()) || [],
                images: updatedImages
            },
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: 'Hotel profile updated successfully',
            hotel: updatedHotel
        });

    } catch (error) {
        console.error('Update hotel profile error:', error);
        res.status(500).json({
            message: error.message || 'Server error while updating hotel profile',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

//update hotel passwore
export const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const hotelId = req.hotel._id;

        if (!hotelId) {
            return res.status(400).json({ message: 'Hotel authentication failed' });
        }

        const hotel = await Hotel.findById(hotelId).select('+password');
        
        // Verify current password
        const isMatch = await hotel.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update password
        hotel.password = newPassword;
        await hotel.save();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({ 
            message: error.message || 'Server error while updating password',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};


//add hotel rooms 

export const addRoom = async (req, res) => {
    try {
        console.log('Request received - addRoom');
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);
        console.log('Files:', req.files);
        
        if (!req.files) {
            console.warn('No files were uploaded');
        } else {
            console.log(`Received ${req.files.length} files`);
        }

        const { 
            roomNumber, 
            roomType, 
            pricePerNight, 
            numAvailable,
            capacity, 
            description, 
            amenities 
        } = req.body;
        
        const hotelId = req.hotel._id;
        
        if (!hotelId) {
            console.error('No hotel ID found in request');
            return res.status(400).json({ message: 'Hotel authentication failed' });
        }

        const newRoom = {
            roomNumber,
            roomType,
            pricePerNight,
            numAvailable: numAvailable ? Number(numAvailable) : 1, // Default to 1 if not provided
            capacity, 
            description,
            amenities: amenities?.split(',').map(item => item.trim()) || [],
            images: req.files?.map(file => file.path) || []
        };

        console.log('New room to be added:', newRoom);

        const updatedHotel = await Hotel.findByIdAndUpdate(
            hotelId,
            { $push: { rooms: newRoom } },
            { new: true }
        ).select('-password');

        console.log('Room added successfully');
        
        res.status(201).json({
            success: true,
            data: updatedHotel
        });
        
    } catch (error) {
        console.error('Add room error:', error);
        res.status(500).json({ 
            message: error.message || 'Server error while adding room',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Update Room
export const updateRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const hotelId = req.hotel._id;

        if (!hotelId || !roomId) {
            return res.status(400).json({ message: "Invalid request parameters" });
        }

        // Parse images to delete from the form data
        const imagesToDelete = JSON.parse(req.body.imagesToDelete || '[]');

        // Get the hotel
        const hotel = await Hotel.findById(hotelId);
        const roomIndex = hotel.rooms.findIndex(r => r._id.toString() === roomId);

        if (roomIndex === -1) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Handle image deletions - both from filesystem and database
        let updatedImages = hotel.rooms[roomIndex].images.filter(img => {
            const shouldKeep = !imagesToDelete.includes(img);
            
            // Delete file from filesystem if marked for deletion
            if (!shouldKeep) {
                const imagePath = path.join(__dirname, '../../..', img);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            
            return shouldKeep;
        });

        // Add new images if any
        if (req.files) {
            updatedImages = [...updatedImages, ...req.files.map(file => file.path)];
        }

        // Create updated room object
        const updatedRoom = {
            ...hotel.rooms[roomIndex].toObject(),
            roomNumber: req.body.roomNumber,
            roomType: req.body.roomType,
            pricePerNight: req.body.pricePerNight,
            capacity: req.body.capacity,
            description: req.body.description,
            amenities: req.body.amenities?.split(',').map(item => item.trim()) || [],
            images: updatedImages
        };

        // Update the room in the hotel
        hotel.rooms[roomIndex] = updatedRoom;
        const updatedHotel = await hotel.save();

        res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            room: updatedRoom,
            hotel: updatedHotel
        });

    } catch (error) {
        console.error('Update room error:', error);
        res.status(500).json({ 
            message: error.message || 'Server error while updating room',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    } 
};


// Delete Room

export const deleteRoom = async (req, res) => {
    try{
        const {roomId} = req.params;
        const hotelId = req.hotel._id;

        if (!hotelId || !roomId) {
            return res.status(400).json({message: "Ivalid request room id or hotel id"});
        }
            // find the hotel and remove the room
    const updatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        {$pull: { rooms: { _id: roomId } } },
        {new: true}
    ).select('-password');
    
    if (!updatedHotel) {
        return res.status(404).json({message: 'Hotel not found'});
    }

    res.status(200).json({
        success: true,
        message: 'Room deleted successfully',
        data: updatedHotel
    });


    }catch(error){
        console.error('Delete Room error:', error);
        res.status(500).json({
            message: error.message || 'Server error while deleting room',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }


}


export const getHotels = async (req, res) => {
    try{
        const hotels = await Hotel.find().select('-password').populate('addedBy', 'first_name');
        res.status(200).json({ success: true, data: hotels });
    }catch(error){
        console.log('Failed to get hotels', error);
        res.status(500).json({})
    }
}


// code to get current hoteluser (logged in hotel)

export const getCurrentHotel = async (req, res) =>{
    try{
        const hotel = await Hotel.findById(req.hotel._id).select('-password');
        res.status(200).json({success: true, data: hotel});
    }catch(error){
        console.error('Get current hotel error:', error);
        res.status(500).json({message: 'Server error'});
    }
};


// Get all hotels (for public listing)
export const getAllHotels = async (req, res) => {
    try {
        const { city, minPrice, maxPrice, rating, limit = 10, page = 1 } = req.query;
        
        const query = {};
        
        if (city) query.city = new RegExp(city, 'i');
        if (minPrice || maxPrice) {
            query['rooms.pricePerNight'] = {};
            if (minPrice) query['rooms.pricePerNight'].$gte = Number(minPrice);
            if (maxPrice) query['rooms.pricePerNight'].$lte = Number(maxPrice);
        }
        if (rating) query['ratings.average'] = { $gte: Number(rating) };

        const options = {
            limit: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            select: '-password -addedBy -__v -createdAt -updatedAt'
        };

        const hotels = await Hotel.find(query, null, options);
        const count = await Hotel.countDocuments(query);

        res.status(200).json({
            success: true,
            count: hotels.length,
            total: count,
            page: parseInt(page),
            pages: Math.ceil(count / parseInt(limit)),
            data: hotels
        });
    } catch (error) {
        console.error('Get all hotels error:', error);
        res.status(500).json({
            message: error.message || 'Server error while fetching hotels'
        });
    }
};

// Get single hotel details
export const getHotelDetails = async (req, res) => {
    try {
        const { id } = req.params;
        
        const hotel = await Hotel.findById(id)
            .select('-password -addedBy -__v')
            .populate('rooms.bookings.guest', 'firstName lastName email phone');

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Calculate min and max room prices
        let minPrice = Infinity;
        let maxPrice = 0;
        
        hotel.rooms.forEach(room => {
            if (room.pricePerNight < minPrice) minPrice = room.pricePerNight;
            if (room.pricePerNight > maxPrice) maxPrice = room.pricePerNight;
        });

        res.status(200).json({
            success: true,
            data: {
                ...hotel.toObject(),
                priceRange: {
                    min: minPrice !== Infinity ? minPrice : 0,
                    max: maxPrice
                }
            }
        });
    } catch (error) {
        console.error('Get hotel details error:', error);
        res.status(500).json({
            message: error.message || 'Server error while fetching hotel details'
        });
    }
};