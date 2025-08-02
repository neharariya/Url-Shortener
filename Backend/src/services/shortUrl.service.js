import {generateNanoId} from "../utils/helper.utils.js";
import {saveShortUrl,exist,getShortUrls, getUrlWithPassword, incrementUrlClicks} from "../dao/shortUrl.dao.js";
import { AppError } from "../utils/errorHandler.utils.js"; 


export const CreateShortUrlserviceWithoutUser =async (url)=>{

    console.log("🔍 URL received:", url);

     try{

        const shortUrl =  generateNanoId(6)
        await saveShortUrl(shortUrl,url);
        return shortUrl;
     }catch(err){
        throw new AppError("Failed to create short URL", 500);
     }
}

export const CreateShortUrlserviceWithUser = async(url, userid, customUrl=null, isPasswordProtected=false, password='')=>{

    try{
        console.log("🔍 CreateShortUrlserviceWithUser called with:", {url, userid, customUrl, isPasswordProtected, password});

        if(customUrl && customUrl.trim() !== ""){
            // console.log("🔍 Checking if custom URL exists:", customUrl);
            const existingUrl = await exist(customUrl);
            if(existingUrl){
                // console.log("❌ Custom URL already exists:", existingUrl);
                throw new AppError("Custom URL already exists", 400);
            }
            // console.log("✅ Custom URL is available, saving...");
            await saveShortUrl(customUrl, url, userid, isPasswordProtected, password);
            console.log("✅ Custom URL saved successfully");
            return customUrl;
        }

        // console.log("🔍 Generating random short URL...");
        const shortUrl = generateNanoId(6);
        await saveShortUrl(shortUrl, url, userid, isPasswordProtected, password);
        console.log("✅ Random short URL saved successfully");
        return shortUrl;
    }catch(err){
        // console.error("❌ Error in CreateShortUrlserviceWithUser:", err);
        // console.error("❌ Error details:", {
            // message: err.message,
            // stack: err.stack,
            // name: err.name
        // });

        // Re-throw the original error if it's already an AppError
        if(err instanceof AppError) {
            throw err;
        }

        // Otherwise, throw a generic error
        throw new AppError(`Failed to create short URL: ${err.message}`, 500);
    }
}


export const getUserUrlsService = async (userId) => {
    try {
        const urls = await getShortUrls(userId);
        return urls;
    }catch(error){
        throw new AppError(`Failed to fetch URLs: ${error.message}`, 500);
    }
}

export const verifyPasswordService = async (id, password) => {
    try {
        // Get URL with password field included
        const url = await getUrlWithPassword(id);
        
        if (!url) {
            throw new AppError("Short URL not found", 404);
        }
        
        // If URL is not password protected, just return the URL
        if (!url.isPasswordProtected) {
            // Increment clicks for non-protected URLs
            await incrementUrlClicks(id);
            return url.fullUrl;
        }
        
        // Verify password for protected URLs
        if (url.password !== password) {
            throw new AppError("Incorrect password", 401);
        }
        
        // Password is correct - increment clicks and return URL
        await incrementUrlClicks(id);
        return url.fullUrl;
        
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(`Failed to verify password: ${error.message}`, 500);
    }
};