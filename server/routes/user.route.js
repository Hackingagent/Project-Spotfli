import express from "express"
import { registerUser } from "../controllers/user/auth/auth.controller.js";

const userRoutes = express.Router();

router.post("/register", registerUser);


export default userRoutes;