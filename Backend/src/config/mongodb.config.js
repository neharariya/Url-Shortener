import mongoose from "mongoose";
import shortUrlSchema from "../models/shortUrl.model.js";

const connectToDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,}).then(() => {
  console.log("MongoDB connected ✅");
})
        console.log("Mongodb coonected");
        await shortUrlSchema.syncIndexes();

    }catch(err){

        console.error(`error: ${err.message}`)
    }
}

export default connectToDB;