const express=require("express");
const { afficherPosts, getPostInfo, savePost, unSavePost, getSavedPosts } = require("../controllers/PostsController");

const router=express.Router();

router.get("/",afficherPosts);
router.get("/hasLiked/:post_id/:user_id",getPostInfo);
router.get("/save/:post_id/:user_id",savePost);
router.delete("/unsave/:post_id/:user_id",unSavePost)
router.get("/savedposts/:user_id",getSavedPosts);
module.exports=router;