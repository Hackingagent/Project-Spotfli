import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user/auth/auth.controller.js";
import userAuthenticate from "../middlewares/userAuthenticate.middleware.js";
import { becomeServiceProvider, userGetService } from "../controllers/user/service-provider/service-provider.controller.js";
import { getCategory } from "../controllers/admin/category/category.controller.js";
import { addProperty, getPropertySubcategory, getSingleProperty, getUserProperties } from "../controllers/user/property/property.controller.js";
import { upload } from "../utils/propertyFIleUpload.js";

const userRoutes = express.Router();
// const verifyToken = require('../middlewares/validationmidleware');

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);

userRoutes.post("/becomeServiceProvider", userAuthenticate, becomeServiceProvider);
userRoutes.get("/getService", userAuthenticate, userGetService);

userRoutes.get('/getCategory', userAuthenticate, getCategory );



//Property Routes
userRoutes.get('/getUserProperties', userAuthenticate, getUserProperties);
userRoutes.get('/getSingleProperty/:id', userAuthenticate, getSingleProperty );
userRoutes.get('/getPropertySubcategory/:id', userAuthenticate, getPropertySubcategory);

userRoutes.post('/addProperty', userAuthenticate, upload.array('files', 5), addProperty);



export default userRoutes;

