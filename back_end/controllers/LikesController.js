const LikesModel=require("../models/likes");

const likePost=async (req,res)=>{
   const {user_id,post_id}=req.params;
        try{
            //const {post_id}=req.params;
            const like=new LikesModel(req.params);
            await like.save().then(()=>res.status(200).json({message:"post liked"}))
            .catch((e)=>res.status(400).json({message:"i dont know what's happened"})
            )
        }catch(e){
            res.status(500).json({message:"server error"});
        }
        
}


const unlikePost = async (req, res) => {
    const { user_id, post_id } = req.params;
    try {
        await LikesModel.deleteOne({ user_id, post_id });
        res.status(200).json({message:"unlike"});
    } catch (e) {
        res.status(500).json({ message: "server error" });
    }
};

module.exports={
    likePost,
    unlikePost
}