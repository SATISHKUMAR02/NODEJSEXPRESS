const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 1000 // just to say that all any person who 
            // log in is a user
        },
        Editor: Number,
        Admin: Number
    },

    password:{
        type:String,
        required:true,
    },
    refreshToken:[String],
    accessToken:String
});
module.exports = mongoose.model('User', userSchema); 