const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function registerUserService(requestBody) {
  const { username, email, password } = requestBody;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const nameCheck = await User.findOne({ username });
  if (nameCheck) {
    const error = new Error("Username already taken");
    error.statusCode = 400;
    throw error;
  }
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
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  return user;
}

async function getMeService(user, userId) {
  if (!user || !userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
  const findUser = await User.findById(userId).select("-password");
  if (!findUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return findUser;
}

module.exports = {
  registerUserService,
  loginUserService,
  getMeService,
};
