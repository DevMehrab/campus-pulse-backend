import {
  createIssueService,
  deleteIssueService,
  getIssueByIdService,
  getIssueByUserService,
  getIssuesService,
  voteIssueService,
} from "../services/issueService.js";

export const createIssue = async (req, res) => {
  try {
    const issue = await createIssueService(req.body, req.user.id);
    res.status(201).json(issue);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create issue", error: error.message });
  }
};

export const getIssues = async (req, res) => {
  try {
    const issues = await getIssuesService(req.query);
    res.json(issues);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch issues", error: error.message });
  }
};

export const getIssueById = async (req, res) => {
  try {
    const issue = await getIssueByIdService(req.params.issueId);

    res.json(issue);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch issue", error: error.message });
  }
};

export const getIssueByUser = async (req, res) => {
  try {
    const issue = await getIssueByUserService(req.params.id);

    res.json(issue);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch issue", error: error.message });
  }
};

export const voteIssue = async (req, res) => {
  try {
    const issue = await voteIssueService(req.params.issueId, req.user.id);

    res.json({ message: "Vote added", votes: issue.votes });
  } catch (error) {
    res.status(500).json({ message: "Failed to vote", error: error.message });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    await deleteIssueService(req.params.issueId, req.user);

    res.json({ message: "Issue deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete issue", error: error.message });
  }
};
