import {CreateShortUrlserviceWithoutUser,CreateShortUrlserviceWithUser, verifyPasswordService, getUserUrlsService} from "../services/shortUrl.service.js";
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
        const url = await findUrlObject(id);
        if (!url) throw new AppError("Short URL not found", 404);

        if(url.isPasswordProtected){

              return res.redirect(`${process.env.FRONTEND_URL}/verify-password/${id}`);
        }
        
        res.redirect(url.fullUrl);
});

export const createCustomShortUrl = wrapAsync(async (req,res)=>{

        const {url, customUrl, isPasswordProtected, password} = req.body;
        if (!url) throw new AppError("URL is required", 400);

        const userID = req.user._id;

        const shortUrl = await CreateShortUrlserviceWithUser(url, userID, customUrl, isPasswordProtected, password);

        const fullUrl = process.env.APP_URL + shortUrl;

        res.status(200).json({shortUrl: fullUrl});
});

export const getUserUrls = wrapAsync(async (req,res)=>{
    const urls = await getUserUrlsService(req.user._id);
    res.status(200).json(urls);
});

export const verifyPasswordAndRedirect = wrapAsync(async (req,res)=>{

  const {id} = req.params;
  const {password} = req.body;

  if(!password) throw new AppError("Password is required", 400);

    const redirectUrl = await verifyPasswordService(id, password);
    res.status(200).json({redirectUrl});
});