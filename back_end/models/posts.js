const {default:mongoose}=require("mongoose");


const PostSchema=new mongoose.Schema({
    content:{
        type:String
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    media:{
        //type:Buffer 
        type:String,
        required:false
    }
}, {timestamps:true});



const Posts=mongoose.model("Posts",PostSchema);
module.exports=Posts;