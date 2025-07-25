//import asynchronous in nature 
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
app.use(cors({
    origin: 'http://localhost:5173', // Allow all origins for development
    credentials: true // Allow cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", shortUrlRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(globalErrorHandler);

app.listen(3000, ()=>{
    connectToDB();
    console.log("running on port 3000");
})