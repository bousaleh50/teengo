const { Timestamp } = require("mongodb");
const {default:mongoose}=require("mongoose");

const FollowingSchema=new mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    receptor_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
},{Timestamp:true});

module.exports=mongoose.model("followings",FollowingSchema);