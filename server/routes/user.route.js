import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user/auth/auth.controller.js";

const userRoutes = express.Router();
// const verifyToken = require('../middlewares/validationmidleware');

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);


export default userRoutes;

