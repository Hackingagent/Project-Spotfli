import express from "express";
import userAuthenticate from "../middlewares/userAuthenticate.middleware.js";
import  providerCheck  from "../middlewares/providerCheck.js";
import { createBooking, getClientBookings, getProviderBookings, updateBookingStatus } from "../controllers/user/service-provider/bookingController.js";

const bookingRoutes = express.Router();

//POST /api/bookings
bookingRoutes.post('/', userAuthenticate, createBooking);
// GET /api/bookings/my-bookings
bookingRoutes.get('/my-bookings', [userAuthenticate, providerCheck], getProviderBookings);
//GET /api/bookings/my-orders
bookingRoutes.get('/my-orders', userAuthenticate, getClientBookings);
//PATCH /api/bookings/:id/status
bookingRoutes.patch('/:id/status', userAuthenticate, updateBookingStatus);

export default bookingRoutes;