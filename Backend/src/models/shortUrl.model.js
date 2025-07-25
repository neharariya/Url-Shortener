import {mongoose} from "mongoose";

const ShortUrlSchema = new mongoose.Schema({
    fullUrl:{
        type:String,
        required:true,
    },

    shortUrl:{
        type:String,
        required:true,
        index: true,
        unique:true,
    },

    clicks : {
        type: Number,
        required : true,
        default : 0,     
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

const shortUrlSchema = mongoose.model('shortUrl',ShortUrlSchema);

export default shortUrlSchema;