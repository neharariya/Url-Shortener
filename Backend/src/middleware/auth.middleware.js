
import User from "../models/user.model.js";
import { AppError} from "../utils/errorHandler.utils.js";
import { verifyToken } from "../utils/helper.utils.js";

export const authMiddleware = async (req, res, next) => {
  try {

    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.accessToken;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    if (!token) throw new AppError("Not authorized - No token provided", 401);
    const decoded = verifyToken(token);

    // Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.log("❌ Token has expired");
      throw new AppError("Token expired", 401);
    }

    const user = await User.findById(decoded.id);

    if (!user) throw new AppError("Not authorized - User not found", 401);
    req.user = user;
    console.log("✅ Authentication successful");
    next();
  }catch(error){
    console.error("❌ Auth middleware error:", error.message);
    return res.status(401).json({message: "Not authorized", error: error.message});
  }

}