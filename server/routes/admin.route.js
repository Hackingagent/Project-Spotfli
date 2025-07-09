import express from "express";
import { addService, deleteService, getService } from "../controllers/admin/services/service.controller.js";
import adminAuthenticate from '../middlewares/adminAuthenticate.middleware.js';

const adminRoutes = express.Router();

adminRoutes.post('/addService', adminAuthenticate, addService)
adminRoutes.get('/getService', adminAuthenticate, getService)
adminRoutes.delete('/deleteService/:id', adminAuthenticate, deleteService);

export default adminRoutes;