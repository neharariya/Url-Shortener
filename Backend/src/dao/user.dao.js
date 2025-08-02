import User from "../models/user.model.js";

export const findUserByEmail = async (email) =>{ 

    try{
        return await
         User.findOne({email}).select('+password');
    }catch(err){
        throw new Error(err);
    }
}

export const findUserById = async (id) =>{
    try{
        return await User.findById(id);
    }catch(err){
        throw new Error(err);
    }
}

export const createUser = async (name,email,password) =>{
    try{
        const newUser = new User({
            name,
            email,
            password,
        });
        await newUser.save();
        return newUser;
    }catch(err){
        console.error("Error in createUser DAO:", err);
        throw new Error(err);
    }
}