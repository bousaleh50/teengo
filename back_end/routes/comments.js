const express=require("express");
const { createComment,displayComments, deleteComment } = require("../controllers/CommensControllers");
const router=express.Router();

router.post('/create_comment',createComment)
router.get('/show_comments/:post_id/:limit',displayComments);
router.delete("/delete/:id",deleteComment);

module.exports=router