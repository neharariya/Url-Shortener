
import User from "../models/user.model.js";
import { AppError} from "../utils/errorHandler.utils.js";
import { verifyToken } from "../utils/helper.utils.js";

export const authMiddleware = async (req, res, next) => {
  try {
    console.log("🔐 Auth middleware called for:", req.method, req.url);
    console.log("🍪 All cookies:", req.cookies);
    console.log("🔑 Authorization header:", req.headers.authorization);

    // Try to get token from cookies first, then from Authorization header
    let token = req.cookies.accessToken;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    console.log("🎫 Token found:", token ? "Yes (length: " + token.length + ")" : "No");
    if (!token) throw new AppError("Not authorized - No token provided", 401);

    console.log("🔍 Verifying token...");
    const decoded = verifyToken(token);
    console.log("🔓 Token decoded successfully:", { id: decoded.id, exp: decoded.exp });

    // Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.log("❌ Token has expired");
      throw new AppError("Token expired", 401);
    }

    const user = await User.findById(decoded.id);
    console.log("👤 User found:", user ? user.email : "No user");

    if (!user) throw new AppError("Not authorized - User not found", 401);
    req.user = user;
    console.log("✅ Authentication successful");
    next();
  }catch(error){
    console.error("❌ Auth middleware error:", error.message);
    return res.status(401).json({message: "Not authorized", error: error.message});
  }

}