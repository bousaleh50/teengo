const { json } = require('express');
var express = require('express');
const multer = require('multer');
const path=require("path");
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    console.log(file)
    cb(null,Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({storage:storage}); // Set the destination folder for uploaded files
const { findUser , updateUser} = require('../controllers/UserController');
const UserModel=require("../models/users");
const mongoose=require("mongoose");


var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next)=>{
   try {
    const users=await UserModel.find({},{});
    if(users){
      return res.status(200).json(users)
    }
   } catch (e) {
    console.log(e)
     return res.status(500).json({message:"server error"});
   }
});

router.get("/data/:id",findUser);

router.get('/:id',findUser)

router.put("/update/:id",updateUser);

module.exports = router;
