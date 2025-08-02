import ShortUrlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.utils.js";

export const saveShortUrl = async (shortUrl, longUrl, userId, isPasswordProtected=false, password='')=>{

    try{
        console.log("🔍 DAO: Saving URL with params:", {shortUrl, longUrl, userId});

        const newUrl = new ShortUrlSchema({
            fullUrl : longUrl,
            shortUrl : shortUrl,
            isPasswordProtected,
            password,
        })

        if(userId){
            newUrl.user = userId
        }

        console.log("🔍 DAO: About to save:", newUrl);
        await newUrl.save();
        console.log("✅ DAO: URL saved successfully");

    }catch(err){
        console.error("❌ DAO Error:", err);
        console.error("❌ DAO Error details:", {
            message: err.message,
            code: err.code,
            name: err.name
        });

        if(err.code === 11000){
            throw new ConflictError("Short URL already exists");
        }
        throw new ConflictError(`Database error: ${err.message}`);
    }
}

// export const findUrlObject = async (shortUrl)=>{

//     try{

//         return await ShortUrlSchema.findOneAndUpdate({
//         shortUrl : shortUrl,
//     }, {$inc : {clicks:1}});

//     }catch(err){

//         if(err.code = 11000){
//             throw new ConflictError("url already exist");
//         }
//         throw new Error(err);
//     }

// }


export const findUrlObject = async (shortUrl)=>{
    try{
        // Don't increment clicks here for protected URLs
        const url = await ShortUrlSchema.findOne({ shortUrl: shortUrl });
        
        // Only increment clicks for non-protected URLs
        if (url && !url.isPasswordProtected) {
            return await ShortUrlSchema.findOneAndUpdate({
                shortUrl : shortUrl,
            }, {$inc : {clicks:1}});
        }
        
        return url;
    }catch(err){
        if(err.code === 11000){
            throw new ConflictError("url already exist");
        }
        throw new Error(err);
    }
}

export const exist = async (customUrl)=>{

    try{

        return await ShortUrlSchema.findOne({shortUrl : customUrl});

    }catch(err){
        throw new Error(err);
    }
}

export const getShortUrls = async(userID)=>{

    try{
        return await ShortUrlSchema.find({user : userID});
    }catch(err){
        throw new Error(err);
    }
}

// Get URL object with password field included
export const getUrlWithPassword = async (shortUrl) => {
    try {
        return await ShortUrlSchema.findOne({ shortUrl: shortUrl }).select('+password');
    } catch (err) {
        throw new Error(`Database error: ${err.message}`);
    }
};

// Increment click count for a URL
export const incrementUrlClicks = async (shortUrl) => {
    try {
        return await ShortUrlSchema.findOneAndUpdate(
            { shortUrl: shortUrl },
            { $inc: { clicks: 1 } },
            { new: true }
        );
    } catch (err) {
        throw new Error(`Failed to increment clicks: ${err.message}`);
    }
};