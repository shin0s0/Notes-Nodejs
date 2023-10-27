const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique : true,
        required: true
    },
    password:{
        type:String,
        select: false,
        required: true
    }
},{ timestamps:true });

exports.User= mongoose.model("User", userSchema);