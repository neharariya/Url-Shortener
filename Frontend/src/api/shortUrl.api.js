import {axiosInstance} from "../utils/axiosInstance";

export const createShortUrl = async (url) =>{
    const {data} = await axiosInstance.post("/createShortUrl", {url});
    return data.shortUrl;
}

export const createCustomShortUrl = async (url,customUrl, isProtected= false, password= '') =>{

    const payload = {url, customUrl};
    if(isProtected && password){
        payload.isPasswordProtected = true;
        payload.password = password;
    }
    const {data} = await axiosInstance.post("/createCustomShortUrl", payload);
    return data.shortUrl;
}

export const verifyPassword = async (id, password) =>{
    const {data} = await axiosInstance.post(`/verify-password/${id}`, {password});
    return data.redirectUrl;
}

export const getUserUrls = async () =>{
    const {data} = await axiosInstance.get("/UserUrls");
    return data;
}