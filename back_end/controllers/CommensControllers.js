const {default:mongoose}=require("mongoose");
const CommentModel=require("../models/comments");

const createComment=async (req,res)=>{
   try {
     const {post_id,user_id,content}=req.body

     const newComment=new CommentModel({
        post_id,
        user_id,
        content
     })
     await newComment.save().then(()=>res.status(200).json({newComment}))
     .catch(()=>res.status(400).json({message:"post cont be found"}))
   } catch (e) {
      console.log(e);
      res.status(500).json({message:"server error"});
   }
}


const displayComments=async (req,res)=>{
  try{
    const {post_id}=req.params;
    const limit=Number(req.params.limit)
    const postObjectId = new mongoose.Types.ObjectId(post_id);
    const comments=await CommentModel.aggregate([ 
        {
            $match:{
                post_id:postObjectId
            }
        },
    { 
        $lookup: {
             from: "users", 
             localField: "user_id", 
             foreignField: "_id", 
             as: "user"
        },
    },
    { $unwind: "$user" }, 
    { 
          $project: { 
                "_id": 1, 
                "content": 1, 
                "username": {$concat:["$user.first_name"," ","$user.last_name"]}
            } 
    }
    ]).limit(limit);
    if(comments){
        
        res.status(200).json(comments)
    }else{
        res.status(400).json({message:"no comments found"})
    }
  }catch(e){
       console.log(e)
        res.status(500).json({message:"server error"})
  }
}


module.exports={
    createComment,
    displayComments
}