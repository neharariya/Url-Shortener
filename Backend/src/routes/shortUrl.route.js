import express from "express";
import {createShortUrl, redirectfromShortUrl, createCustomShortUrl, getUserUrls} from "../controller/shortUrl.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { verifyPasswordAndRedirect } from "../controller/shortUrl.controller.js";

const router = express.Router();

router.post("/createShortUrl", createShortUrl);
router.post("/createCustomShortUrl" , authMiddleware, createCustomShortUrl);

router.get("/UserUrls", authMiddleware, getUserUrls);

router.get("/:id", redirectfromShortUrl);

router.post("/verify-password/:id", verifyPasswordAndRedirect);

export default router;