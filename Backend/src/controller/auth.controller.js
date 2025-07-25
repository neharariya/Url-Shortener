import {registerUserService,loginUserService} from "../services/auth.service.js";
import { AppError} from "../utils/errorHandler.utils.js";
import wrapAsync from "../utils/TryCatchWrapper.js";
import { cookieOptions } from "../config/config.js";

export const registerUser = wrapAsync(async (req,res)=>{

        const {name,email,password} = req.body;
        if (!name || !email || !password) throw new AppError("All fields are required", 400);
        const token = await registerUserService(name,email,password);
        res.cookie("accessToken",token,cookieOptions);
         res.status(200).json({message: "user registered successfully",token});

});

export const loginUser = wrapAsync(async (req,res)=>{

        const {email , password} = req.body;
        if (!email || !password) throw new AppError("all fields are required for login", 400);

        const token = await loginUserService(email, password);
        res.cookie("accessToken", token,cookieOptions);
        res.status(200).json({message: "user logged in successfully",token});

});


       

    