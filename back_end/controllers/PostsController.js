
const PostModel=require("../models/posts");
const LikesModel=require("../models/likes");
const SaveModel=require("../models/savedPosts");
const savedPosts = require("../models/savedPosts");
const User = require("../models/users");
const Posts = require("../models/posts");

//using this piplien to get the posts with nb likes and nb comments
const postDetailAggrigation=[{
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
  }];

const afficherPosts=async (req,res)=>{
    //const posts=await PostModel.find({});
    try{
      const posts = await PostModel.aggregate([...postDetailAggrigation]);
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
        const isSaved=await SaveModel.findOne({post_id,user_id});
        const postInfo={
          liked:isLiked?true:false,
          saved:isSaved?true:false
        }
         
        res.status(200).json({...postInfo});
    }catch(e){
        console.log(e)
        res.status(500).json({message:"server error"})
    }
}

const savePost=async (req,res)=>{
  const {user_id,post_id}=req.params;
  try{
      //const {post_id}=req.params;
      const savedPost=new SaveModel(req.params);
      await savedPost.save().then(()=>res.status(200).json({message:"post saved",savedPost}))
      .catch((e)=>res.status(400).json({message:"i dont know what's happened"})
      )
  }catch(e){
      res.status(500).json({message:"server error"});
  }  
}

const unSavePost=async(req,res)=>{
  const { user_id, post_id } = req.params;
  try {
      await SaveModel.deleteOne({ user_id, post_id });
      res.status(200).json({message:"unsaved"});
  } catch (e) {
      res.status(500).json({ message: "server error" });
  }
}

const getSavedPosts=async(req,res)=>{
    try {
       const {user_id}=req.params;
       const posts_saved=await savedPosts.find({user_id},{post_id:1,_id:0});
       const posts_ids=posts_saved.map(p=>p.post_id);
       //const posts=await PostModel.find({_id:{$in:posts_ids}}).exec();
       const posts=await PostModel.aggregate([
        {
          $match:{
            _id:{$in:posts_ids}
          }
        },
        ...postDetailAggrigation
       ]);

       res.json({posts})
    } catch (e) {
      console.log(e)
      return res.status(500).json({message:"server error"});
    }
}

// Controller to handle saving a post
const createPost = async (req, res) => {
  try {
    const { content} = req.body;
    const user_id=req.params.user_id;
    //const { filename } = req.file; // Assuming you're using multer to handle file uploads
    const post = new Posts({
      content,
      user_id,
      //media: filename,
    });

    await post.save();

    res.status(200).json({ message: "Post created successfully", post });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "An error occurred while creating the post" });
  }
};


module.exports={
    afficherPosts,
    getPostInfo,
    savePost,
    unSavePost,
    createPost,
    getSavedPosts
}