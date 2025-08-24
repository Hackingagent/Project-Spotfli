import express from "express";
import { registerHotel, getHotels, loginHotel, getCurrentHotel, addRoom, deleteRoom, updateRoom, updateHotelProfile, getHotelOverview, updatePassword, getAllHotels, getHotelDetails } from "../controllers/hotel/hotelController.js";
import adminAuthenticate from "../middlewares/adminAuthenticate.middleware.js";
import hotelAuthenticate from "../middlewares/hotelAuthenticate.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { createWalkInBooking, deleteBooking, getHotelBookings, updateBookingStatus } from "../controllers/hotel/bookingController.js";


const hotelRoutes = express.Router();
 
hotelRoutes.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('Files:', req.files);
  next();
});
hotelRoutes.post('/login', loginHotel);
hotelRoutes.get('/me', hotelAuthenticate, getCurrentHotel);
hotelRoutes.delete('/rooms/:roomId', hotelAuthenticate, deleteRoom);
hotelRoutes.post('/rooms', hotelAuthenticate, upload.array('images', 5),addRoom);
hotelRoutes.put('/rooms/:roomId', hotelAuthenticate, upload.array('images', 5), updateRoom);
hotelRoutes.put('/editProfile/:hotelId', hotelAuthenticate,upload.array('images', 10), updateHotelProfile);
hotelRoutes.put('/update-password', hotelAuthenticate, updatePassword);
hotelRoutes.get('/overview', hotelAuthenticate, getHotelOverview);
hotelRoutes.get('/bookings', hotelAuthenticate, getHotelBookings);

hotelRoutes.put('/rooms/:roomId/bookings/:bookingId/status', hotelAuthenticate, updateBookingStatus);
hotelRoutes.post('/walk-in-booking', hotelAuthenticate, createWalkInBooking);
hotelRoutes.delete('/rooms/:roomId/bookings/:bookingId', hotelAuthenticate, deleteBooking);

hotelRoutes.get('/', getAllHotels);
hotelRoutes.get('/:id', getHotelDetails);






export default hotelRoutes; 