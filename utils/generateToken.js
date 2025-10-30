const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  const payload = { id: userId, role };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "7d" };

  return jwt.sign(payload, secret, options);
};

module.exports = generateToken;
