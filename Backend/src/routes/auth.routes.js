import express from "express";
import {registerUser, loginUser, logoutUser, getMe} from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();


router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", authMiddleware, logoutUser);

router.get("/me", authMiddleware, getMe);

export default router;