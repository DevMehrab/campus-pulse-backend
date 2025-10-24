const { param } = require("express-validator");

function validateId(name = "id") {
  return [
    param(name).isMongoId().withMessage(`${name} must be a valid Mongo ID`),
  ];
}

module.exports = {
  validateId,
};
