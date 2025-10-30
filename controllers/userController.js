const User = require("../models/User.js");
const {
  deleteUserService,
  getUserService,
  updateUserProfileService,
} = require("../services/userService.js");
const asyncHandler = require("../utils/asyncHandler.js");
const generateToken = require("../utils/generateToken.js");

const updateUserProfile = asyncHandler(async (req, res) => {
  const result = await updateUserProfileService(req.user.id, req.body);
  res.json({
    result,
    token: generateToken(updatedUser._id),
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await getUserService(userId);
  res.json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  await deleteUserService(req.params.userId);
  res.json({ message: "User deleted" });
});

module.exports = {
  updateUserProfile,
  getAllUsers,
  getUser,
  deleteUser,
};
