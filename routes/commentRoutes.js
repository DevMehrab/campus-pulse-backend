const { Router } = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createComment,
  getCommentsByIssue,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const route = Router();

route.post("/create", authMiddleware, createComment);
route.get("/:issueId", getCommentsByIssue);
route.put("/:commentId", authMiddleware, updateComment);
route.delete("/:commentId", authMiddleware, deleteComment);

module.exports = route;
