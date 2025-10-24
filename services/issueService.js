const Issue = require("../models/Issue");

async function createIssueService(requestBody, userId) {
  const { title, description, category, images, anonymous } = requestBody;

  if (!title || !description || !category) {
    throw new Error("Title, description, and category are required");
  }

  const issue = await Issue.create({
    title,
    description,
    category,
    images,
    createdBy: userId,
    anonymous: anonymous || false,
  });

  return issue;
}

async function getIssuesService(requestQuery) {
  const { category, status, sort } = requestQuery;

  let query = {};
  if (category) query.category = category;
  if (status) query.status = status;

  let issues = await Issue.find(query)
    .populate("createdBy", "name email")
    .sort(sort === "votes" ? { votes: -1 } : { createdAt: -1 });

  return issues;
}

async function getIssueByIdService(issueId) {
  const issue = await Issue.findById(issueId)
    .populate("createdBy", "name email")
    .populate("comments");

  if (!issue) throw new Error("Issue not found");
  return issue;
}

async function getIssueByUserService(userId) {
  const issue = await Issue.find({ createdBy: userId })
    .populate("createdBy", "name email")
    .populate("comments");

  if (!issue) throw new Error("Issue not found");
  return issue;
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
    throw new Error("Vote removed");
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

  if (!issue) throw new Error("Issue not found");

  if (issue.createdBy.toString() !== user.issueId && user.role !== "admin")
    throw new Error("Unauthorized to delete this issue");

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
