import express from "express"
import userAuthenticate from "../middlewares/userAuthenticate.middleware.js";
import { createService, getAvailableServices, getMyService } from "../controllers/user/service-provider/service-provider.controller.js";
import { deleteService, updateService } from "../controllers/admin/services/service.controller.js";
import { 
  createOffer, 
  getOffer, 
  getOfferById, 
  updateOffer, 
  deleteOffer 
} from "../controllers/user/service-provider/service-provider.controller.js";
import { upload } from "../utils/serviceFilesUpload.js";

const serviceProviderRoutes = express.Router();

// Service routes
serviceProviderRoutes.post('/', userAuthenticate, upload.single('thumbnail'), createService);
serviceProviderRoutes.get('/my-service', userAuthenticate, getMyService);
serviceProviderRoutes.get('/available-services', userAuthenticate, getAvailableServices);
serviceProviderRoutes.put('/:id', userAuthenticate, updateService);
serviceProviderRoutes.delete('/:id', userAuthenticate, deleteService);

// Offer routes
serviceProviderRoutes.post('/offers', userAuthenticate, upload.array('images', 5), createOffer);
serviceProviderRoutes.get('/offers', userAuthenticate, getOffer);
serviceProviderRoutes.get('/offers/service/:serviceId', userAuthenticate, getOfferById);
serviceProviderRoutes.patch('/offers/:id', userAuthenticate, upload.array('images', 5), updateOffer);
serviceProviderRoutes.delete('/offers/:id', userAuthenticate, deleteOffer);

export default serviceProviderRoutes;