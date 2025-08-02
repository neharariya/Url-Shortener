import express from "express";
import connectToDB from "./src/config/mongodb.config.js";
import dotenv from "dotenv";
import shortUrlRouter from "./src/routes/shortUrl.route.js";
import authRouter from "./src/routes/auth.routes.js";
import { globalErrorHandler } from "./src/utils/errorHandler.utils.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config("./.env");

const app = express();

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            https://url-shortener-frontend-ll3m.vercel.app/
        ].filter(Boolean);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", shortUrlRouter);
app.use("/auth", authRouter);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    connectToDB();
    console.log(`Server running on port ${PORT}`);
});