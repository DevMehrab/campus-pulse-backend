import express from "express";
import {
  getDashboardStats,
  updateIssueByAdmin,
  deleteIssueByAdmin,
  deleteUserByAdmin,
} from "../controllers/adminController.js";
import {
  protectedRoute,
  authMiddleware,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

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

export default router;
