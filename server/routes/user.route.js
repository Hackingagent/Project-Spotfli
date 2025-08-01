import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user/auth/auth.controller.js";
import userAuthenticate from "../middlewares/userAuthenticate.middleware.js";
import { becomeServiceProvider, userGetService } from "../controllers/user/service-provider/service-provider.controller.js";
import { getCategory } from "../controllers/admin/category/category.controller.js";

const userRoutes = express.Router();
// const verifyToken = require('../middlewares/validationmidleware');

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);

userRoutes.post("/becomeServiceProvider", userAuthenticate, becomeServiceProvider);
userRoutes.get("/getService", userAuthenticate, userGetService);

userRoutes.get('/getCategory', userAuthenticate, getCategory );



export default userRoutes;

