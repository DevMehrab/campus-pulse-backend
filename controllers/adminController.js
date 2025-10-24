import {
  getDashboardStatsService,
  updateIssueByAdminService,
  deleteIssueByAdminService,
  deleteUserByAdminService,
} from "../services/adminService.js";
export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStatsService();
    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

export const updateIssueByAdmin = async (req, res) => {
  try {
    const issue = await updateIssueByAdminService(req.body, req.params.id);

    res.json({ message: "Issue updated successfully", issue });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update issue", error: error.message });
  }
};

export const deleteIssueByAdmin = async (req, res) => {
  try {
    await deleteIssueByAdminService(req.params.id);
    res.json({ message: "Issue deleted by admin" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete issue", error: error.message });
  }
};

export const deleteUserByAdmin = async (req, res) => {
  try {
    await deleteUserByAdminService(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};
