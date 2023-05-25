require("dotenv").config();
const UserModel=require("../models/users");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const register=async(req,res)=>{
    try{
      //check the user if already exist
      const duplicateUser= await UserModel.exists({email:req.body.email});
      if(duplicateUser){
        res.status(500).json({message:"the user already exist"});
      }else{
        //generate the salt and creat a hasehd password
        const salt= await bcrypt.genSalt(10);
        const cryptedPass=await bcrypt.hash(req.body.password,salt);

        //create new user
        const {first_name,last_name,email}=req.body;
        const newUser=new UserModel({
          first_name,
          last_name,
          email,
          password:cryptedPass
        });
        //creating token
        const token=jwt.sign({...newUser},process.env.SECRET_KEY)
        await newUser.save().then(()=>res.status(200).json({user:newUser,token})).catch(e=>res.status().json(e));
    
      }
    }catch(e){
      //console.log(e)
      e=>res.status(500).json({message:"An error accured while creating new account"})
    }
}

 
module.exports={ 
  register
}
