import express from "express";
import { addService } from "../controllers/admin/services/service.controller.js";
import adminAuthenticate from '../middlewares/adminAuthenticate.middleware.js';

const adminRoutes = express.Router();

adminRoutes.post('/addService', adminAuthenticate, addService)


export default adminRoutes;