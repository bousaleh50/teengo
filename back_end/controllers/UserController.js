const express=require("express");
const UserModel=require("../models/users");
const mongoose=require("mongoose");

const findUser=async(req,res)=>{
    try{
        const user=await UserModel.findOne({_id:req.params.id});
        if(!user){
            return res.status(400).json({message:"no user found"})
        }
        res.status(200).json({user});
    }catch(e){
        console.log(e)
        res.status(500).json({message:"server error"})
    }
}

module.exports={
    findUser
};