// controllers/hotel/bookingController.js
import Hotel from '../../models/Hotel.model.js';
import User from '../../models/user.model.js';

export const createHotelBooking = async (req, res) => {
    try {

        // console.log('Request: ', req.body);
        const { hotelId, roomId } = req.params;
        const { checkInDate, checkOutDate, guests, specialRequests } = req.body;
        const userId = req.user._id;

        // Validate dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        
        if (checkIn >= checkOut) {
            return res.status(400).json({ 
                message: 'Check-out date must be after check-in date' 
            });
        }

        if (checkIn < new Date()) {
            return res.status(400).json({ 
                message: 'Check-in date cannot be in the past' 
            });
        }

        // Find the hotel and room
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const room = hotel.rooms.find(r => r._id.toString() === roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check room availability
        if (!room.isAvailable || room.numAvailable < 1) {
            return res.status(400).json({ message: 'Room is not available' });
        }

        // Check for overlapping bookings
        const overlappingBooking = room.bookings.some(booking => {
            const existingCheckIn = new Date(booking.checkInDate);
            const existingCheckOut = new Date(booking.checkOutDate);
            
            return (
                (checkIn >= existingCheckIn && checkIn < existingCheckOut) ||
                (checkOut > existingCheckIn && checkOut <= existingCheckOut) ||
                (checkIn <= existingCheckIn && checkOut >= existingCheckOut)
            );
        });

        if (overlappingBooking) {
            return res.status(400).json({ 
                message: 'Room is already booked for the selected dates' 
            });
        }

        // Calculate total price
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = room.pricePerNight * nights;

        // Create new booking WITH ROOM ID
        const newBooking = {
            guest: userId,
            room: room._id,  // STORE THE ROOM ID
            checkInDate: checkIn,
            checkOutDate: checkOut,
            totalPrice,
            specialRequests,
            status: 'confirmed',
            checkedStatus: 'not checked',
            paymentStatus: 'pending'
        };

        // Add booking to room
        room.bookings.push(newBooking);

        // Update room availability
        room.numAvailable -= 1;
        if (room.numAvailable <= 0) {
            room.isAvailable = false;
        }

        // Save changes
        await hotel.save();

        // Get the newly created booking with ID
        const savedBooking = room.bookings[room.bookings.length - 1];

        // Populate guest details for response
        const populatedBooking = {
            ...savedBooking.toObject(),
            guest: await User.findById(userId).select('first_name last_name email')
        };

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking: populatedBooking
        });

    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({
            message: error.message || 'Server error while creating booking'
        });
    }
};

export const getBookingsForUser = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Find all hotels that have bookings by this user
        const hotels = await Hotel.find({
            'rooms.bookings.guest': userId
        }).select('hotelName city address rooms.$');

        // Extract bookings for the user
        const userBookings = [];
        
        hotels.forEach(hotel => {
            hotel.rooms.forEach(room => {
                room.bookings.forEach(booking => {
                    if (booking.guest.toString() === userId.toString()) {
                        userBookings.push({
                            _id: booking._id,
                            hotel: {
                                _id: hotel._id,
                                name: hotel.hotelName,
                                city: hotel.city,
                                address: hotel.address
                            },
                            room: {
                                _id: room._id,
                                type: room.roomType,
                                number: room.roomNumber,
                                pricePerNight: room.pricePerNight
                            },
                            checkInDate: booking.checkInDate,
                            checkOutDate: booking.checkOutDate,
                            totalPrice: booking.totalPrice,
                            status: booking.status,
                            checkedStatus: booking.checkedStatus,
                            paymentStatus: booking.paymentStatus,
                            createdAt: booking.createdAt
                        });
                    }
                });
            });
        });

        res.status(200).json({
            success: true,
            count: userBookings.length,
            data: userBookings
        });

    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({
            message: error.message || 'Server error while fetching bookings'
        });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const { hotelId, roomId, bookingId } = req.params;
        const userId = req.user._id;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const room = hotel.rooms.find(r => r._id.toString() === roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const booking = room.bookings.find(b => b._id.toString() === bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Verify the booking belongs to the user
        if (booking.guest.toString() !== userId.toString()) {
            return res.status(403).json({ 
                message: 'Unauthorized to cancel this booking' 
            });
        }

        // Check if booking can be cancelled
        if (booking.status === 'cancelled') {
            return res.status(400).json({ 
                message: 'Booking is already cancelled' 
            });
        }

        // Check if check-in date is in the future
        const checkInDate = new Date(booking.checkInDate);
        if (checkInDate <= new Date()) {
            return res.status(400).json({ 
                message: 'Cannot cancel booking after check-in date' 
            });
        }

        // Update booking status
        booking.status = 'cancelled';
        
        // Update room availability
        room.numAvailable += 1;
        if (room.numAvailable > 0) {
            room.isAvailable = true;
        }

        await hotel.save();

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully'
        });

    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            message: error.message || 'Server error while cancelling booking'
        });
    }
};

export const getHotelBookings = async (req, res) => {
    try {
        const hotelId = req.hotel._id;
        console.log("I'm Here", hotelId);
        // const { status } = req.params;

        const hotel = await Hotel.findById(hotelId)
            .select('hotelName rooms')
            .populate('rooms.bookings.guest', 'first_name last_name email phone');

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Extract all bookings with room info
        const bookings = [];
        hotel.rooms.forEach(room => {
            room.bookings.forEach(booking => {
                // if (!status || booking.status === status) {
                    bookings.push({
                        _id: booking._id,
                        roomId: room._id,  // This is crucial!
                        roomNumber: room.roomNumber,
                        roomType: room.roomType,
                        guest: booking.guest,
                        checkInDate: booking.checkInDate,
                        checkOutDate: booking.checkOutDate,
                        totalPrice: booking.totalPrice,
                        specialRequests: booking.specialRequests,
                        status: booking.status,
                        checkedStatus: booking.checkedStatus,
                        paymentStatus: booking.paymentStatus,
                        createdAt: booking.createdAt
                    });
                // }
            });
        });

        // Sort by check-in date (ascending)
        bookings.sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));

        // console.log('Booking: ', bookings);

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings: bookings
        });

    } catch (error) {
        console.error('Get hotel bookings error:', error);
        res.status(500).json({
            message: error.message || 'Server error while fetching bookings'
        });
    }
};
export const updateBookingStatus = async (req, res) => {
    try {
        const hotelId = req.hotel._id;
        const { roomId, bookingId } = req.params;
        const { status, checkedStatus } = req.body; 

        console.log('Attempting to update booking status:', {
            hotelId,
            roomId,
            bookingId,
            status,
            checkedStatus
        });

        // Validate input
        if (!hotelId || !roomId || !bookingId) {
            console.error('Missing required parameters');
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        // Find the hotel
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            console.error('Hotel not found with ID:', hotelId);
            return res.status(404).json({ message: 'Hotel not found' });
        }

        console.log(`Found hotel with ${hotel.rooms.length} rooms`);

        // Find the room
        const room = hotel.rooms.find(r => r._id.toString() === roomId);
        if (!room) {
            console.error('Room not found in hotel. Provided roomId:', roomId);
            console.error('Available room IDs:', hotel.rooms.map(r => r._id.toString()));
            return res.status(404).json({ message: 'Room not found' });
        }

        console.log(`Found room with ${room.bookings.length} bookings`);

        // Find the booking
        const booking = room.bookings.id(bookingId);
        if (!booking) {
            console.error('Booking not found in room. Provided bookingId:', bookingId);
            console.error('Available booking IDs:', room.bookings.map(b => b._id.toString()));
            return res.status(404).json({ message: 'Booking not found' });
        }

        console.log('Current booking status:', booking.status);

        // Validate status transition
        const validTransitions = {
            'confirmed': ['cancelled', 'checked-in'],
            'checked-in': ['checked-out'],
            'checked-out': [],
            'cancelled': []
        };

        if (status && !validTransitions[booking.status]?.includes(status)) {
            const message = `Invalid status transition from ${booking.status} to ${status}`;
            console.error(message);
            return res.status(400).json({ message });
        }

        // Update status if provided
        if (status) {
            console.log(`Updating status from ${booking.status} to ${status}`);
            booking.status = status;
        }

        if (checkedStatus) {
            console.log(`Updating checkedStatus to ${checkedStatus}`);
            booking.checkedStatus = checkedStatus;
        }

        // Update room availability if needed
        if (status === 'checked-out' || status === 'cancelled') {
            console.log('Increasing room availability');
            room.numAvailable += 1;
            if (room.numAvailable > 0) {
                room.isAvailable = true;
            }
        }

        // Save changes
        await hotel.save();

        console.log('Booking updated successfully');
        return res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            booking: {
                _id: booking._id,
                status: booking.status,
                checkedStatus: booking.checkedStatus,
                roomId: room._id,
                roomNumber: room.roomNumber
            }
        });

    } catch (error) {
        console.error('Error in updateBookingStatus:', {
            message: error.message,
            stack: error.stack,
            requestParams: req.params,
            requestBody: req.body
        });
        return res.status(500).json({
            message: error.message || 'Server error while updating booking status'
        });
    }
};

export const createWalkInBooking = async (req, res) => {
    try {
        const hotelId = req.hotel._id;
        const { roomId, guestInfo, checkInDate, checkOutDate, guests, specialRequests } = req.body;

        // Validate dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        
        if (checkIn >= checkOut) {
            return res.status(400).json({ 
                message: 'Check-out date must be after check-in date' 
            });
        }

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Find the room using string comparison
        const room = hotel.rooms.find(r => r._id.toString() === roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check room availability
        if (!room.isAvailable || room.numAvailable < 1) {
            return res.status(400).json({ message: 'Room is not available' });
        }

        // Calculate total price
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = room.pricePerNight * nights;

        // Create new booking
        const newBooking = {
            guest: null, // No user account associated
            guestInfo, // Store guest details directly
            checkInDate: checkIn,
            checkOutDate: checkOut,
            totalPrice,
            specialRequests,
            status: 'checked-in',
            checkedStatus: 'checked in',
            paymentStatus: 'paid'
        };

        // Add booking to room
        room.bookings.push(newBooking);

        // Update room availability
        room.numAvailable -= 1;
        if (room.numAvailable <= 0) {
            room.isAvailable = false;
        }

        // Save changes
        await hotel.save();

        res.status(201).json({
            success: true,
            message: 'Walk-in booking created successfully',
            booking: room.bookings[room.bookings.length - 1]
        });

    } catch (error) {
        console.error('Create walk-in booking error:', error);
        res.status(500).json({
            message: error.message || 'Server error while creating walk-in booking'
        });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const hotelId = req.hotel._id;
        const { roomId, bookingId } = req.params;

        console.log('Deleting booking:', { hotelId, roomId, bookingId });

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            console.log('Hotel not found');
            return res.status(404).json({ message: 'Hotel not found' });
        }

        // Find the room using string comparison
        const room = hotel.rooms.find(r => r._id.toString() === roomId);
        if (!room) {
            console.log('Room not found in hotel:', { hotelRooms: hotel.rooms.map(r => r._id.toString()) });
            return res.status(404).json({ message: 'Room not found' });
        }

        // Find the booking using string comparison
        const booking = room.bookings.find(b => b._id.toString() === bookingId);
        if (!booking) {
            console.log('Booking not found in room');
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Remove the booking using filter
        room.bookings = room.bookings.filter(b => b._id.toString() !== bookingId);

        // Update room availability if booking was active
        if (booking.status === 'confirmed' || booking.status === 'checked-in') {
            room.numAvailable += 1;
            if (room.numAvailable > 0) {
                room.isAvailable = true;
            }
        }

        await hotel.save();

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        });

    } catch (error) {
        console.error('Delete booking error:', error);
        res.status(500).json({
            message: error.message || 'Server error while deleting booking'
        });
    }
};