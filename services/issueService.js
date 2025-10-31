const Issue = require("../models/Issue");
const Vote = require("../models/Vote");

async function createIssueService(requestBody, userId, file) {
  const { title, description, category, anonymous } = requestBody;

  if (!title || !description || !category) {
    const error = new Error("Title, description, and category are required");
    error.statusCode = 400;
    throw error;
  }

  const issue = await Issue.create({
    title,
    description,
    category,
    image: file ? file.path : null,
    createdBy: userId,
    anonymous: anonymous || false,
  });

  return issue;
}

async function getIssuesService(requestQuery, userId = null) {
  const { category, status, sort } = requestQuery;

  const query = {};
  if (category) query.category = category;
  if (status) query.status = status;

  const issues = await Issue.find(query)
    .populate("createdBy", "username email")
    .sort(sort === "votes" ? { votes: -1 } : { createdAt: -1 })
    .lean();
  if (!userId) return issues.map((i) => ({ ...i, hasVoted: false }));

  const votedIssues = await Vote.find({ userId }).select("issueId");
  const votedIssueIds = new Set(votedIssues.map((v) => v.issueId.toString()));
  const issuesWithVoteStatus = issues.map((issue) => ({
    ...issue,
    hasVoted: votedIssueIds.has(issue._id.toString()),
  }));
  return issuesWithVoteStatus;
}

async function getIssueByIdService(issueId) {
  const issue = await Issue.findById(issueId)
    .populate("createdBy", "username email")
    .populate("comments");

  if (!issue) {
    const error = new Error("Issue not found");
    error.statusCode = 404;
    throw error;
  }
  return issue;
}

async function getIssueByUserService(userId) {
  const issues = await Issue.find({ createdBy: userId })
    .populate("createdBy", "username email")
    .populate("comments")
    .lean();

  if (!issues) throw new Error("Issue not found");

  const votedIssues = await Vote.find({ userId }).select("issueId");
  const votedIssueIds = new Set(votedIssues.map((v) => v.issueId.toString()));
  const issuesWithVoteStatus = issues.map((issue) => ({
    ...issue,
    hasVoted: votedIssueIds.has(issue._id.toString()),
  }));
  return issuesWithVoteStatus;
}
async function voteIssueService(issueId, userId) {
  const existingVote = await Vote.findOne({
    issueId,
    userId,
  });
  if (existingVote) {
    await Vote.deleteOne({
      issueId,
      userId,
    });
    const issue = await Issue.findByIdAndUpdate(
      issueId,
      { $inc: { votes: -1 } },
      { new: true }
    );
    return issue;
  }

  await Vote.create({ issueId, userId });
  const issue = await Issue.findByIdAndUpdate(
    issueId,
    { $inc: { votes: 1 } },
    { new: true }
  );

  return issue;
}

async function deleteIssueService(issueId, user) {
  const issue = await Issue.findById(issueId);

  if (!issue) {
    const error = new Error("Issue not found");
    error.statusCode = 404;
    throw error;
  }

  if (issue.createdBy.toString() !== user.issueId && user.role !== "admin") {
    const error = new Error("Unauthorized to delete this issue");
    error.statusCode = 403;
    throw error;
  }

  await issue.deleteOne();
}

module.exports = {
  createIssueService,
  getIssuesService,
  getIssueByIdService,
  getIssueByUserService,
  voteIssueService,
  deleteIssueService,
};
