const express=require("express");
const { followUser, acceptFollow,getRequests,dismissRequest } = require("../controllers/FollowingController");
const router=express.Router();

router.get("/requests/:receptor_id",getRequests);
router.post("/follow/:sender_id/:receptor_id",followUser);
router.delete("/accept/:sender_id/:receptor_id",acceptFollow);
router.delete("/dissmiss/:sender_id/:receptor_id",dismissRequest);

module.exports=router;