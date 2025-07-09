import express from "express";
import { addService, deleteService, getService, updateService } from "../controllers/admin/services/service.controller.js";
import adminAuthenticate from '../middlewares/adminAuthenticate.middleware.js';
import { loginAdmin, logoutAdmin } from "../controllers/admin/auth/auth.controller.js";

const adminRoutes = express.Router();

adminRoutes.post("/login", loginAdmin);
adminRoutes.post("/logout", logoutAdmin);


adminRoutes.post('/addService', adminAuthenticate, addService)
adminRoutes.get('/getService', adminAuthenticate, getService)
adminRoutes.delete('/deleteService/:id', adminAuthenticate, deleteService);
adminRoutes.put('/updateService/:id', adminAuthenticate, updateService)

export default adminRoutes;