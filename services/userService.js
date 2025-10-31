const User = require("../models/User");

async function updateUserProfileService(userId, userData) {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  user.name = userData.name || user.name;
  user.email = userData.email || user.email;
  user.department = userData.department || user.department;

  if (userData.password) {
    user.password = await bcrypt.hash(userData.password, 10);
  }

  const { password: _, ...userWithoutPassword } = await user.save();
  return userWithoutPassword;
}

async function getUserService(userId) {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
}

async function deleteUserService(userId) {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  if (user.role === "admin") {
    const error = new Error("Cannot delete an admin");
    error.statusCode = 403;
    throw error;
  }
  if (userId !== user.id) {
    const error = new Error("Not allowed");
    error.statusCode = 403;
    throw error;
  }
  await user.deleteOne();
}

module.exports = {
  updateUserProfileService,
  deleteUserService,
  getUserService,
};
