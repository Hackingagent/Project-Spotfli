import express from 'express';
import { createBooking, getClientBookings, getProviderBookings, updateBookingStatus } from '../controllers/user/service-provider/service-booking.controller.js';
import userAuthenticate from '../middlewares/userAuthenticate.middleware.js';
import { cancelBooking, createHotelBooking, createWalkInBooking, getBookingsForUser } from '../controllers/hotel/bookingController.js';
import hotelAuthenticate from '../middlewares/hotelAuthenticate.middleware.js';

const router = express.Router();

router.post('/hotels/:hotelId/rooms/:roomId/book', userAuthenticate, createHotelBooking);
router.get('/user/bookings', userAuthenticate, getBookingsForUser);
router.put('/hotels/:hotelId/rooms/:roomId/bookings/:bookingId/cancel', userAuthenticate, cancelBooking);



// Client routes
router.post('/', userAuthenticate, createBooking);
router.get('/my-orders', userAuthenticate, getClientBookings);

// Provider routes
router.get('/my-bookings', userAuthenticate,  getProviderBookings);
router.patch('/:id/status', userAuthenticate, updateBookingStatus);

router.post('/walk-in-booking', hotelAuthenticate, createWalkInBooking );


export default router;