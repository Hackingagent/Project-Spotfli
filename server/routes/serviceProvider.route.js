import express from "express"
import userAuthenticate from "../middlewares/userAuthenticate.middleware.js";
import providerCheck from "../middlewares/providerCheck.js";
import { createService, getMyService } from "../controllers/user/service-provider/serviceController.js";
import { deleteService, updateService } from "../controllers/admin/services/service.controller.js";


const serviceProviderRoutes = express.Router();


//POST /api/gigs
// serviceProviderRoutes.post('/', [userAuthenticate, providerCheck], createService);
serviceProviderRoutes.post('/', userAuthenticate, createService);
//GET /api/gigs/my-gigs
serviceProviderRoutes.get('/my-service', userAuthenticate, getMyService);
//PATCH /api/gigs/:id
serviceProviderRoutes.patch('/:id', [userAuthenticate, providerCheck], updateService);
//DELETE /api/gigs/:id
serviceProviderRoutes.delete('/:id', [userAuthenticate, providerCheck], deleteService);


export default serviceProviderRoutes;