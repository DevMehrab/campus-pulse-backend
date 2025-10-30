const {
  getDashboardStatsService,
  updateIssueByAdminService,
  deleteIssueByAdminService,
  deleteUserByAdminService,
} = require("../services/adminService.js");
const asyncHandler = require("../utils/asyncHandler.js");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStatsService();
  res.json(stats);
});

exports.updateIssueByAdmin = asyncHandler(async (req, res) => {
  const issue = await updateIssueByAdminService(req.body, req.params.id);
  res.json({ message: "Issue updated successfully", issue });
});

exports.deleteIssueByAdmin = asyncHandler(async (req, res) => {
  await deleteIssueByAdminService(req.params.id);
  res.json({ message: "Issue deleted by admin" });
});

exports.deleteUserByAdmin = asyncHandler(async (req, res) => {
  await deleteUserByAdminService(req.params.id);
  res.json({ message: "User deleted successfully" });
});
