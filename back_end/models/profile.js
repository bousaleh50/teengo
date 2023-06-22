const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: "/src/assets/cover.jpg", // Default cover image path
  },
  userImage: {
    type: String,
    default: "/src/assets/user.png", // Default user image path
  },
});

module.exports = mongoose.model("Profiles", profileSchema);
