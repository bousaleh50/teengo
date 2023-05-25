const express=require("express");
const { afficherPosts, getPostInfo } = require("../controllers/PostsController");

const router=express.Router();

router.get("/",afficherPosts);
router.get("/hasLiked/:post_id/:user_id",getPostInfo)

module.exports=router;