const {default:mongoose}=require("mongoose");

const likesSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
},{timestamps:true}); 


module.exports=mongoose.model("likes",likesSchema);