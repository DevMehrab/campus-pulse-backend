const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function registerUserService(requestBody) {
  const { username, email, password } = requestBody;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const nameCheck = await User.findOne({ username });
  if (nameCheck) throw new Error("Username already taken");
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  return user;
}

async function loginUserService(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
}

async function getMeService(user, userId) {
  if (!user || !userId) throw new Error("Unauthorized");
  const findUser = await User.findById(userId).select("-password");
  if (!findUser) throw new Error("User not found");
  return findUser;
}

module.exports = {
  registerUserService,
  loginUserService,
  getMeService,
};
