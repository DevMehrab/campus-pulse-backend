const { Router } = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { registerValidator } = require("../validators/userValidator");
const validate = require("../middlewares/validate");

const route = Router();

route.post("/register", registerValidator, validate, register);
route.post("/login", login);
route.get("/me", authMiddleware, getMe);

module.exports = route;
