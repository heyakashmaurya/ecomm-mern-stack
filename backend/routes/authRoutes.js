import express from "express"
import { adminLogin, googleLogin, login, logout, register } from "../controllers/authController.js"


const authRoutes = express.Router()

authRoutes.post("/registration", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/googlelogin", googleLogin);
authRoutes.post("/adminlogin", adminLogin);


export default authRoutes;