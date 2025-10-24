const { Router } = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createIssue,
  getIssueByUser,
  getIssueById,
  getIssues,
  voteIssue,
  deleteIssue,
} = require("../controllers/issueController");

const route = Router();

route.get("/", getIssues);
route.get("/issue/:issueId", getIssueById);
route.get("/user/:userId", getIssueByUser);
route.post("/create", authMiddleware, createIssue);
route.put("/vote/:issueId", authMiddleware, voteIssue);
route.delete("/:issueId", authMiddleware, deleteIssue);

module.exports = route;
