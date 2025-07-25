import {axiosInstance} from "../utils/axiosInstance";

export const registerUser = async(name,email,password)=>{
    const {data} = await axiosInstance.post("/auth/register", {name,email,password})
    return data.token;
}

export const loginUser = async(email,password)=>{
    const {data} = await axiosInstance.post("/auth/login", {email,password});
    return data.token;
}

export const logoutUser = async ()=>{
    const {data} = await axiosInstance.get("/auth/logout");
    return data.message;
}