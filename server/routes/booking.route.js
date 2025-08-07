// booking.routes.js
import express from 'express';
import { createBooking, getClientBookings, getProviderBookings, updateBookingStatus } from '../controllers/user/service-provider/booking.controller.js';
import userAuthenticate from '../middlewares/userAuthenticate.middleware.js';
import providerCheck from '../middlewares/providerCheck.js';

const router = express.Router();

// Client routes
router.post('/', userAuthenticate, createBooking);
router.get('/my-orders', userAuthenticate, getClientBookings);

// Provider routes
router.get('/my-bookings', [userAuthenticate, providerCheck], getProviderBookings);
router.patch('/:id/status', [userAuthenticate, providerCheck], updateBookingStatus);

export default router;