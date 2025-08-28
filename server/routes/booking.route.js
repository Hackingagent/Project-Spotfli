import express from 'express';
import { createBooking, getClientBookings, getProviderBookings, updateBookingStatus } from '../controllers/user/service-provider/service-booking.controller.js';
import userAuthenticate from '../middlewares/userAuthenticate.middleware.js';

const router = express.Router();

router.post('/hotels/:hotelId/rooms/:roomId/book', userAuthenticate, createBooking);
// router.get('/user/bookings', userAuthenticate, getBookingsForUser);
// router.put('/hotels/:hotelId/rooms/:roomId/bookings/:bookingId/cancel', userAuthenticate, cancelBooking);



// Client routes
router.post('/', userAuthenticate, createBooking);
router.get('/my-orders', userAuthenticate, getClientBookings);

// Provider routes
router.get('/my-bookings', userAuthenticate,  getProviderBookings);
router.patch('/:id/status', userAuthenticate, updateBookingStatus);

export default router;