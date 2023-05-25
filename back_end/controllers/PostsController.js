
const PostModel=require("../models/posts");
const LikesModel=require("../models/likes");

const afficherPosts=async (req,res)=>{
    //const posts=await PostModel.find({});
    try{
      const posts = await PostModel.aggregate([
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "post_id",
            as: "likes",
          },
        },
        {
          $lookup:{
            from:"comments",
            localField:"_id",
            foreignField:"post_id",
            as:"comments"
          }
        },
        {
          $addFields: {
            nb_likes: { $size: "$likes" },
            nb_comments:{$size:"$comments"},
          }
        },
        {
          $project: {
            _id: 1,
            content: 1,
            date_post: 1,
            media:1,
            username:1,
            nb_likes: 1,
            nb_comments:1,
          },
        },
      ]);
      if(posts){
        //res.json(posts);
        res.status(200).json(posts);
      }else{
        res.status(400).json({message:"no posts found"})
      }
    }catch(e){
      console.log(e);
      res.status(500).json({message:"server error"});
    }
    
}



const getPostInfo=async(req,res)=>{
    const {post_id,user_id}=req.params;
    try{
        const isLiked=await LikesModel.findOne({post_id,user_id});
        isLiked?res.status(200).json({liked:true}):res.status(200).json({liked:false});
    }catch(e){
        console.log(e)
        res.status(500).json({message:"server error"})
    }
}

module.exports={
    afficherPosts,
    getPostInfo
}