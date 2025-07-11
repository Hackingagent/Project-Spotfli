import express from "express";
import { addService, deleteService, getService, updateService } from "../controllers/admin/services/service.controller.js";
import adminAuthenticate from '../middlewares/adminAuthenticate.middleware.js';
import { loginAdmin, logoutAdmin } from "../controllers/admin/auth/auth.controller.js";
import { getApprovedProviders, getPendingProviders, getRejectedProviders } from "../controllers/admin/serviceProvider/admin-service-provider.controller.js";

const adminRoutes = express.Router();

//Authentication Routes
adminRoutes.post("/login", loginAdmin);
adminRoutes.post("/logout", logoutAdmin);

//Services Routes
adminRoutes.post('/addService', adminAuthenticate, addService)
adminRoutes.get('/getService', adminAuthenticate, getService)
adminRoutes.delete('/deleteService/:id', adminAuthenticate, deleteService);
adminRoutes.put('/updateService/:id', adminAuthenticate, updateService)


//Service Providers Routes
adminRoutes.get('/getPendingProvider', adminAuthenticate, getPendingProviders);
adminRoutes.get('/getApprovedProvider', adminAuthenticate, getApprovedProviders);
adminRoutes.get('/getRejectedProvider', adminAuthenticate, getRejectedProviders);


export default adminRoutes;