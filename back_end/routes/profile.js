const express = require("express");
const router = express.Router();
const usersController = require("../controllers/ProfileController");

// Update user's cover image
router.put("/:userId/cover-image", usersController.updateCoverImage);

// Update user's profile image
router.put("/:userId/user-image", usersController.updateUserImage);

module.exports = router;
