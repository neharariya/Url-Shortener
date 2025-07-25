import {generateNanoId} from "../utils/helper.utils.js";
import {saveShortUrl,exist} from "../dao/shortUrl.dao.js";
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

export const CreateShortUrlserviceWithUser = async(url, userid, customUrl=null)=>{

    try{
        console.log("🔍 CreateShortUrlserviceWithUser called with:", {url, userid, customUrl});

        if(customUrl){
            // console.log("🔍 Checking if custom URL exists:", customUrl);
            const existingUrl = await exist(customUrl);
            if(existingUrl){
                // console.log("❌ Custom URL already exists:", existingUrl);
                throw new AppError("Custom URL already exists", 400);
            }
            // console.log("✅ Custom URL is available, saving...");
            await saveShortUrl(customUrl, url, userid);
            console.log("✅ Custom URL saved successfully");
            return customUrl;
        }

        // console.log("🔍 Generating random short URL...");
        const shortUrl = generateNanoId(6);
        await saveShortUrl(shortUrl, url, userid);
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

