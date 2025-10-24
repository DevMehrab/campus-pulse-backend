const User = require("../models/User");

async function updateUserProfileService(userId, userData) {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

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
  if (!user) throw new Error("User not found");
  res.json(user);
}

async function deleteUserService(userId) {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");
  if (user.role === "admin") throw new Error("Cannot delete an admin");
  if (userId !== user.id) throw new Error("Not allowed");
  await user.deleteOne();
}

module.exports = {
  updateUserProfileService,
  deleteUserService,
  getUserService,
};
