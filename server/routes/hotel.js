import express from "express";
import { registerHotel, getHotels, loginHotel, getCurrentHotel } from "../controllers/hotel/hotelController.js";
import adminAuthenticate from "../middlewares/adminAuthenticate.middleware.js";
import hotelAuthenticate from "../middlewares/hotelAuthenticate.middleware.js";

const hotelRoutes = express.Router();

// Correct route paths
// hotelRoutes.post('/register', adminAuthenticate, registerHotel);
hotelRoutes.post('/login', loginHotel);

// hotelRoutes.get('/:id', getHotelByID);
hotelRoutes.get('/me', hotelAuthenticate, getCurrentHotel);
// hotelRoutes.get('/',  adminAuthenticate, getHotels);


export default hotelRoutes;