const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const authSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:false,
    },
    email:{
        type:String
    },
    userName:{
        type:String
    },
    image:{
        type:String
    },
    refreshToken: String,
});


// access token generate for 7 days only
authSchema.methods.getJwtAccessToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_ACCESS_TOKEN_KEY,{
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE  // 7 days;
    })
} 

const User = mongoose.model('User',authSchema);
module.exports = User;