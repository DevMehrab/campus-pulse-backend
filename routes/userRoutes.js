const { Router } = require("express");
const {
  authMiddleware,
  protectedRoute,
} = require("../middlewares/authMiddleware");
const {
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const { validateId } = require("../validators/paramValidator");

const route = Router();

route.put("/update", authMiddleware, updateUserProfile);
route.get("/all", authMiddleware, protectedRoute("admin"), getAllUsers);
route.get("/:userId", authMiddleware, getUser);
route.delete("/:userId", validateId("userId"), authMiddleware, deleteUser);

module.exports = route;
