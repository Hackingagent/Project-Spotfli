
import express from "express";
import { createBooking, getBookingsForUser, cancelBooking } from "../controllers/hotel/bookingController.js";
import userAuthenticate from "../middlewares/userAuthenticate.middleware.js";

const router = express.Router();

router.post('/hotels/:hotelId/rooms/:roomId/book', userAuthenticate, createBooking);
router.get('/user/bookings', userAuthenticate, getBookingsForUser);
router.put('/hotels/:hotelId/rooms/:roomId/bookings/:bookingId/cancel', userAuthenticate, cancelBooking);

export default router;// booking.routes.js
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