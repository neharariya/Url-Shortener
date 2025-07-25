import {axiosInstance} from "../utils/axiosInstance";

export const createShortUrl = async (url) =>{
    const {data} = await axiosInstance.post("/createShortUrl", {url});
    return data.shortUrl;
}

export const createCustomShortUrl = async (url,customUrl) =>{
    const {data} = await axiosInstance.post("/createCustomShortUrl", {url,customUrl});
    return data.shortUrl;
}
