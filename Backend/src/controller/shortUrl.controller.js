import {CreateShortUrlserviceWithoutUser,CreateShortUrlserviceWithUser} from "../services/shortUrl.service.js";
import {findUrlObject} from "../dao/shortUrl.dao.js";
import { AppError} from "../utils/errorHandler.utils.js";
import wrapAsync from "../utils/TryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req,res)=>{

        let shortUrl;
        const {url} = req.body;
        if (!url) throw new AppError("URL is required", 400);
        if(req.user){
           shortUrl = await CreateShortUrlserviceWithUser(url,req.user._id);
        }else{
          shortUrl = await CreateShortUrlserviceWithoutUser(url);
        }
         res.status(200).json({shortUrl:process.env.APP_URL + shortUrl});

});
    
export const redirectfromShortUrl = wrapAsync(async (req,res)=>{

         const {id} = req.params;
        if (!id) throw new AppError("URL is required", 400);
        const url = await findUrlObject(id);
          if (!url) throw new AppError("Short URL not found", 404);
        res.redirect(url.fullUrl);
});

export const createCustomShortUrl = wrapAsync(async (req,res)=>{

        // console.log("🔍 createCustomShortUrl called");
        // console.log("🔍 Request body:", req.body);
        // console.log("🔍 User from middleware:", req.user);

        const {url, customUrl} = req.body;
        if (!url) throw new AppError("URL is required", 400);
        if (!customUrl) throw new AppError("Custom URL is required", 400);

        const userID = req.user._id;
        // console.log("🔍 User ID:", userID);

        // console.log("🔍 Calling service with:", {url, userID, customUrl});
        const shortUrl = await CreateShortUrlserviceWithUser(url, userID, customUrl);

        // console.log("✅ Service returned:", shortUrl);
        const fullUrl = process.env.APP_URL + shortUrl;
        // console.log("✅ Full URL:", fullUrl);

        res.status(200).json({shortUrl: fullUrl});
});