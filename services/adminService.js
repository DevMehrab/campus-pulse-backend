const User = require("../models/User.js");
const Issue = require("../models/Issue.js");

async function getDashboardStatsService() {
  const totalUsers = await User.countDocuments();
  const totalIssues = await Issue.countDocuments();
  const resolvedIssues = await Issue.countDocuments({ status: "resolved" });
  const pendingIssues = await Issue.countDocuments({ status: "pending" });
  const inProgressIssues = await Issue.countDocuments({
    status: "in-progress",
  });
  const stats = {
    totalUsers,
    totalIssues,
    resolvedIssues,
    pendingIssues,
    inProgressIssues,
  };
  return stats;
}

async function updateIssueByAdminService(requestBody, issueId) {
  const { status, adminNote } = requestBody;
  const validStatuses = ["pending", "in-progress", "resolved", "rejected"];

  const issue = await Issue.findById(issueId);
  if (!issue) {
    const error = new Error("Issue not found");
    error.statusCode = 404;
    throw error;
  }

  if (status && validStatuses.includes(status)) {
    issue.status = status;
  }

  if (adminNote) {
    issue.adminNote = adminNote;
  }

  await issue.save();
  return issue;
}

async function deleteIssueByAdminService(issueId) {
  const issue = await Issue.findById(issueId);
  if (!issue) {
    const error = new Error("Issue not found");
    error.statusCode = 404;
    throw error;
  }

  await issue.deleteOne();
  return;
}

async function deleteUserByAdminService(userId) {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.role === "admin") {
    const error = new Error("Cannot delete another admin");
    error.statusCode = 403;
    throw error;
  }

  await user.deleteOne();
  return;
}

module.exports = {
  getDashboardStatsService,
  updateIssueByAdminService,
  deleteIssueByAdminService,
  deleteUserByAdminService,
};
