const  express=require("express");
const { login } = require("../controllers/LoginController");
const { afficherPosts } = require("../controllers/PostsController");
const router=express.Router();

router.post('/login',login,afficherPosts);

module.exports=router