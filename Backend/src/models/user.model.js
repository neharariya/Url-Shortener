import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

function getGravatarUrl(email){
    const hash = crypto
        .createHash('md5')
        .update(email.trim().toLowerCase())
        .digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique : true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        type: String,
        default : function(){
            return getGravatarUrl(this.email);
        }
    }
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.set('toJSON', {
    transform: function(doc, ret) {
    delete ret.__v;
    delete ret.password;
    return ret;
    }
  });

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

const User = mongoose.model("User",userSchema);
export default User;
