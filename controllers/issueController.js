const {
  createIssueService,
  deleteIssueService,
  getIssueByIdService,
  getIssueByUserService,
  getIssuesService,
  voteIssueService,
} = require("../services/issueService.js");
const asyncHandler = require("../utils/asyncHandler.js");

const createIssue = asyncHandler(async (req, res) => {
  const issue = await createIssueService(req.body, req.user.id, req.file);
  res.status(201).json(issue);
});

const getIssues = asyncHandler(async (req, res) => {
  const issues = await getIssuesService(req.query, req?.user?.id);
  res.json(issues);
});

const getIssueById = asyncHandler(async (req, res) => {
  const issue = await getIssueByIdService(req.params.issueId);
  res.json(issue);
});

const getIssueByUser = asyncHandler(async (req, res) => {
  const issue = await getIssueByUserService(req.params.userId);
  res.json(issue);
});

const voteIssue = asyncHandler(async (req, res) => {
  const issue = await voteIssueService(req.params.issueId, req.user.id);
  res.json({ message: "Vote added", votes: issue.votes });
});

const deleteIssue = asyncHandler(async (req, res) => {
  await deleteIssueService(req.params.issueId, req.user);
  res.json({ message: "Issue deleted" });
});

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  getIssueById,
  getIssueByUser,
  voteIssue,
  deleteIssue,
};
