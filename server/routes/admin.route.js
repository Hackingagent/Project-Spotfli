import express from "express";
import { addService, deleteService, getService, updateService } from "../controllers/admin/services/service.controller.js";
import adminAuthenticate from '../middlewares/adminAuthenticate.middleware.js';
import { loginAdmin, logoutAdmin } from "../controllers/admin/auth/auth.controller.js";
import {  getProviders, toggleProvider, } from "../controllers/admin/serviceProvider/admin-service-provider.controller.js";
import { addCategory, addMultipleFields, addSubCategory, deleteField, getCategory, getFields, getSubCategories, reorderFields, updateField } from "../controllers/admin/category/category.controller.js";

import { registerHotel, getHotels} from "../controllers/hotel/hotelController.js";
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
adminRoutes.put('/addSubCategory/:id', adminAuthenticate, addSubCategory);
adminRoutes.get('/getSubCategories/:id', adminAuthenticate, getSubCategories);

//Service Providers Routes
adminRoutes.get('/getProviders/:status', adminAuthenticate, getProviders);
adminRoutes.get('/toggleProvider/:id/:status', adminAuthenticate, toggleProvider);
adminRoutes.post('/registerhotel', adminAuthenticate, registerHotel);
// Hotel Routes
adminRoutes.get('/',  adminAuthenticate, getHotels);

//Field Routes
adminRoutes.post('/:categoryId/subcategories/:subcategoryId/addField', adminAuthenticate, addMultipleFields);

adminRoutes.get('/:categoryId/subcategories/:subcategoryId/getFields', adminAuthenticate, getFields);

adminRoutes.put('/:categoryId/subcategories/:subcategoryId/reorderFields', adminAuthenticate, reorderFields);

adminRoutes.put('/:categoryId/subcategories/:subcategoryId/updateField/:fieldId', adminAuthenticate, updateField);

adminRoutes.delete('/:categoryId/subcategories/:subcategoryId/deleteField/:fieldId', adminAuthenticate, deleteField);



export default adminRoutes;