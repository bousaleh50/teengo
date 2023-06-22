const express=require("express");
const multer = require("multer");
const { afficherPosts, getPostInfo, savePost, unSavePost, getSavedPosts, createPost} = require("../controllers/PostsController");

const router=express.Router();


// Multer configuration for file uploads
const upload = multer({ dest: "uploads/" });

router.post("/create-post/:user_id", upload.single("media"), createPost);
router.get("/",afficherPosts);
router.get("/hasLiked/:post_id/:user_id",getPostInfo);
router.get("/save/:post_id/:user_id",savePost);
router.delete("/unsave/:post_id/:user_id",unSavePost)
router.get("/savedposts/:user_id",getSavedPosts);

module.exports=router;