import User from "../models/user.model.js";
import { AppError} from "../utils/errorHandler.utils.js";
import {findUserByEmail, createUser} from "../dao/user.dao.js";
import { signToken } from "../utils/helper.utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUserService = async (name, email, password) => {
  try { 
    const user = await findUserByEmail(email);
    if(user){
        throw new AppError("User already exists", 400);
    }
    const newUser = await createUser(name,email,password);
    const token = await signToken({id:newUser._id});
    return token;
  } catch (err) {
    console.error("Error in registerUserService:", err);
    throw err;
  }
};

export const loginUserService = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    if(!user) throw new AppError("invalid email or password", 400);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new AppError("invalid email or password", 400);
    const token = await signToken({id:user._id});
    return {token, user};
  } catch (err) {
    console.error("Error in loginUserService:", err);
    throw err;
  }
};













































