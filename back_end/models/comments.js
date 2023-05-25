const {default:mongoose}=require("mongoose");

const CommentSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{tamestamps:true});

module.exports=mongoose.model("comments",CommentSchema);