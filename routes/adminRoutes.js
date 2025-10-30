const { Router } = require("express");

const {
  getDashboardStats,
  updateIssueByAdmin,
  deleteIssueByAdmin,
  deleteUserByAdmin,
} = require("../controllers/adminController.js");
const {
  protectedRoute,
  authMiddleware,
} = require("../middlewares/authMiddleware.js");

const router = Router();

router.get(
  "/stats",
  authMiddleware,
  protectedRoute("admin"),
  getDashboardStats
);
router.put(
  "/issues/:id",
  authMiddleware,
  protectedRoute("admin"),
  updateIssueByAdmin
);
router.delete(
  "/issues/:id",
  authMiddleware,
  protectedRoute("admin"),
  deleteIssueByAdmin
);
router.delete(
  "/users/:id",
  authMiddleware,
  protectedRoute("admin"),
  deleteUserByAdmin
);

module.exports = router;
