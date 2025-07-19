import express from "express";
import { addService, deleteService, getService, updateService } from "../controllers/admin/services/service.controller.js";
import adminAuthenticate from '../middlewares/adminAuthenticate.middleware.js';
import { loginAdmin, logoutAdmin } from "../controllers/admin/auth/auth.controller.js";
import {  getProviders, toggleProvider, } from "../controllers/admin/serviceProvider/admin-service-provider.controller.js";
import { addCategory, getCategory } from "../controllers/admin/category/category.controller.js";

const adminRoutes = express.Router();

//Authentication Routes
adminRoutes.post("/login", loginAdmin);
adminRoutes.post("/logout", logoutAdmin);

//Services Routes
adminRoutes.post('/addService', adminAuthenticate, addService)
adminRoutes.get('/getService', adminAuthenticate, getService)
adminRoutes.delete('/deleteService/:id', adminAuthenticate, deleteService);
adminRoutes.put('/updateService/:id', adminAuthenticate, updateService)

//Category Routes
adminRoutes.get('/getCategory', adminAuthenticate, getCategory );
adminRoutes.post('/addCategory', adminAuthenticate, addCategory );

//Service Providers Routes
adminRoutes.get('/getProviders/:status', adminAuthenticate, getProviders);
adminRoutes.get('/toggleProvider/:id/:status', adminAuthenticate, toggleProvider);


export default adminRoutes;