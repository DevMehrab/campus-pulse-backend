const generateToken = require("../utils/generateToken");
const {
  registerUserService,
  loginUserService,
  getMeService,
} = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);
  res.status(201).json({
    message: "User registered successfully",
    token: generateToken(user._id, user.role),
  });
});

exports.login = asyncHandler(async (req, res) => {
  const user = await loginUserService(req.body.email, req.body.password);
  res.json({ token: generateToken(user._id, user.role), user });
});
exports.getMe = asyncHandler(async (req, res) => {
  const user = await getMeService(req.user, req.user.id);
  res.json(user);
});
