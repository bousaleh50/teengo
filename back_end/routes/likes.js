const express=require("express");
const { likePost,unlikePost } = require("../controllers/LikesController");

const router=express.Router();

router.post('/like/:post_id/:user_id',likePost);
router.delete('/unlike/:post_id/:user_id',unlikePost);


module.exports=router;