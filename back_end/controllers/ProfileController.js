const User = require("../models/profile");
// here User i mean profile user

// Update user's cover image
const updateCoverImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { coverImage } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.coverImage = coverImage;
    await user.save();

    res.json({ message: "Cover image updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update user's profile image
const updateUserImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userImage } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.userImage = userImage;
    await user.save();

    res.json({ message: "User image updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  updateCoverImage,
  updateUserImage,
};
