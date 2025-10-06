import express from "express"
import isAuth from "../middleware/isAuth.js";
import { getCurrentAdmin, getCurrentUser } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";

const userRoutes = express.Router();

userRoutes.get("/getcurrentuser",isAuth, getCurrentUser);
userRoutes.get("/getcurrentadmin",adminAuth, getCurrentAdmin);

export default userRoutes;