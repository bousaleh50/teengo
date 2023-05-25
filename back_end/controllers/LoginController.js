require("dotenv").config();
const {default:mongoose}=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const UserModel=require("../models/users");


const login=async(req,res)=>{
  try{
    //search on a user with the same email
    const user=await UserModel.findOne({email:req.body.email});
    if(!user){
      res.status(400).json({message:"incorrect login information"})
    }else{
        const isMatched=bcrypt.compare(req.body.password,user.password)
        if(!isMatched){
          return res.status(400).json({message:"incorrect login info"});
        }
        const token=jwt.sign({...user},process.env.SECRET_KEY)
        res.status(200).json({
          token,
          user,
        })
    }
    
  }catch(e){
    console.log(e)
    res.status(500).json({message:e});
  }
}

module.exports={
    login
}