
import express from "express";
import { createBooking, getBookingsForUser, cancelBooking } from "../controllers/hotel/bookingController.js";
import userAuthenticate from "../middlewares/userAuthenticate.middleware.js";

const router = express.Router();

router.post('/hotels/:hotelId/rooms/:roomId/book', userAuthenticate, createBooking);
router.get('/user/bookings', userAuthenticate, getBookingsForUser);
router.put('/hotels/:hotelId/rooms/:roomId/bookings/:bookingId/cancel', userAuthenticate, cancelBooking);

export default router;