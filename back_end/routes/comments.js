const express=require("express");
const { createComment,displayComments } = require("../controllers/CommensControllers");
const router=express.Router();

router.post('/create_comment',createComment)
router.get('/show_comments/:post_id/:limit',displayComments)

module.exports=router