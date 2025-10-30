const { body } = require("express-validator");

const registerValidator = [
  body("username")
    .trim()
    .matches(/^[a-zA-Z0-9_]+$/)
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email").trim().isEmail().withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = registerValidator;
