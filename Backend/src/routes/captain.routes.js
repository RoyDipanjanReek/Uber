import express from "express";
import { authCaptain } from "../middleware/auth.middleware.js";
import { 
    captainLoginValidator, 
    captainRegisterValidator 
} from "../validator/captain.validator.js";
import { 
    getCaptainProfile, 
    loginCaptain, 
    logoutCaptain, 
    registerCaptain 
} from "../controller/captain.controller.js";

const router = express.Router();

router.post("/register", captainRegisterValidator, registerCaptain)

router.post("/login", captainLoginValidator, loginCaptain)

router.post("/profile", authCaptain, getCaptainProfile)

router.get("/logout", authCaptain, logoutCaptain)

export default router