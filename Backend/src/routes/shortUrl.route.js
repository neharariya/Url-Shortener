import express from "express";
import {createShortUrl, redirectfromShortUrl, createCustomShortUrl} from "../controller/shortUrl.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/createShortUrl", createShortUrl);
router.post("/createCustomShortUrl" , authMiddleware, createCustomShortUrl);

router.get("/:id", redirectfromShortUrl);


export default router;