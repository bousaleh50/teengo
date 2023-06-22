const FollowingModel=require("../models/followings");
const User = require("../models/users");


const getRequests=async (req,res)=>{
    try {

        const requests=await FollowingModel.aggregate([
            
            {
                $lookup:{
                    from:"users",
                    localField:"sender_id",
                    foreignField:"_id",
                    as:"sender"
                }
            },
            {
                $project:{
                    _id:0,
                    sender:1
                }
            }

        ]);

        if(requests) return res.status(200).json({requests});
        return res.status(400).json({message:"no requests"});
    } catch (e) {
        res.status(500).json({message:"server error"});
    }
}

const followUser=async(req,res)=>{
    try {
        const {sender_id,receptor_id}=req.params;
        const followRequest=await FollowingModel.create({sender_id,receptor_id});
        followRequest.save()
        .then(()=>res.status(200).json({message:"follow request send"}))
        .catch(()=>res.status(400).json({message:'error has accured'}))
    } catch (e) {
        res.status(500).json({message:e});
    }
}


const acceptFollow=async (req,res)=>{
    try {
        const receptor_id=req.params.receptor_id;
        const sender_user=req.params.sender_id;
        const receptor_user=await User.findOne({_id:receptor_id});
        const updatedUser=await User.findByIdAndUpdate({_id:receptor_id},
         {followers:[...receptor_user.followers,sender_user]}
        );

        const  request=await FollowingModel.findOneAndDelete({receptor_id,sender_id:sender_user});

        if(updatedUser && request)return res.status(200).json({user:updatedUser});
        return res.status(400).json({message:"user not found"});
    } catch (e) {
        res.status(200).json({message:"server error"}); 
    }
}

const unFollowUser=async(req,res)=>{

}

const dismissRequest=async(req,res)=>{
    try {
        const receptor_id=req.params.receptor_id;
        const sender_id=req.params.sender_id;
        const dissmissed=await FollowingModel.findOneAndDelete({receptor_id,sender_id})
        if(dissmissed)return res.status(200).json({message:"dissmissed"});
        return res.status(400).json({message:"no request found"});
    } catch (e) {
        res.status(500).json({message:"server error"});
    }
}

module.exports={
    followUser,
    acceptFollow,
    unFollowUser,
    getRequests,
    dismissRequest
}