const mongoose=require("mongoose");

const volunteerschema=new mongoose.Schema({
    name : String,
    phone:Number, 
    email : String, 
    city:String,
    interest: String
});
module.exports=mongoose.model("volunteer" , volunteerschema);