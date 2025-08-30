import PropertyRoomBooking from '../../../models/property/property-rooms-booking.model.js';
import PropertyRoom from '../../../models/property/property-rooms.model.js';
import fs from 'fs';
import User from '../../../models/user.model.js';


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



export const updatePropertyRoom = async (req, res) => {
    try {
        const {id} = req.params;

        console.log(req.body);
        const {livingRoom, bedRoom, toilet, kitchen, price, description, quantityAvailable, amenities, deletedFiles = []} = req.body;


        const uploadFiles = req.files || []

        const existingRoom = await PropertyRoom.findById(id);

        if (!existingRoom) {
            // Clean up uploaded files if room not found
            if (uploadFiles.length > 0) {
                uploadFiles.forEach(file => fs.unlinkSync(file.path));
            }
            return res.status(404).json({ 
                success: false, 
                message: 'Room not found' 
            });
        }

        // Handle file deletions
        let updatedFiles = existingRoom.files;
        if (deletedFiles && deletedFiles.length > 0) {
            // Parse if it's a JSON string
            const filesToDelete = typeof deletedFiles === 'string' 
                ? JSON.parse(deletedFiles) 
                : deletedFiles;
                
            updatedFiles = existingRoom.files.filter(file => 
                !filesToDelete.includes(file._id.toString())
            );
            
            // Delete the actual files from server
            existingRoom.files.forEach(file => {
                if (filesToDelete.includes(file._id.toString())) {
                try {
                    fs.unlinkSync(file.path); // Delete from filesystem
                } catch (err) {
                    console.error('Error deleting file:', err);
                }
                }
            });
        }


        const newFiles = uploadFiles.map(file => ({
            url: `/uploads/properties/rooms/${file.filename}`,
            path: file.path,
            originalName: file.originalname,  // Fixed property name
            mimeType: file.mimetype,         // Fixed property name
            size: file.size
        }));

        const updateData = {
            livingRoom: parseInt(livingRoom) || 0,
            bedRoom: parseInt(bedRoom) || 0,
            toilet: parseInt(toilet) || 0,
            kitchen: parseInt(kitchen) || 0,
            price: parseFloat(price) || 0,
            description,
            quantityAvailable: parseInt(quantityAvailable),
            amenities: Array.isArray(amenities) ? amenities : [],
            files: [...updatedFiles, ...newFiles]
        };

            
         // 5. Update the room
        const updatedRoom = await PropertyRoom.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );


        // 6. Clean up deleted files from filesystem
        // if (deletedFiles.length > 0) {
        //     existingRoom.files.forEach(file => {
        //         if (deletedFiles.includes(file._id.toString())) {
        //             try {
        //                 fs.unlinkSync(file.path);
        //             } catch (err) {
        //                 console.error('Error deleting file:', err);
        //             }
        //         }
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            data: updatedRoom
        });


    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({
        success: false,
        message: error.message || 'Failed to update room'
        });
  
    }
}


export const bookPropertyRoom = async(req, res) => {
    try {

        const {propertyId, roomId} = req.params;

        const {checkInMonth, number, specialRequests} = req.body;

        console.log(propertyId, roomId, checkInMonth, number, specialRequests)


        const newBooking = new PropertyRoomBooking({
            checkInMonth: checkInMonth,
            number: number,
            specialRequests: specialRequests,
            room: roomId,
            user: req.user,
        })

        await newBooking.save();

        res.status(200).json({
            success: true,
            message: 'Bookings Created Successfully',
        })


        
    } catch (error) {
        console.log('Error Booking this room', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to book room',
        });
    }
}


export const getPropertyRoomBookings = async(req, res) => {
    try {
        const {roomId} = req.params;

        const bookings = await PropertyRoomBooking.find({room: roomId}).populate({
            path: 'user',
            select: 'first_name last_name email tell profile',
            model: User
        })
        .sort({ createdAt: -1 }).lean();


        const formattedBookings = bookings.map(booking => ({
            _id: booking._id,
            month: booking.checkInMonth,
            number: booking.number,
            specialRequests: booking.specialRequests,
            status: booking.status,
            user: booking.user ? {
                _id: booking.user._id,
                first_name: booking.user.first_name,
                last_name: booking.user.last_name,
                email: booking.user.email,
                tell: booking.user.tell,
                profile: booking.user.profile
            } : null,

        }))


        res.status(200).json({
            success: true,
            bookings: formattedBookings
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}