const Comment = require("../models/Comment");

async function createCommentService(requestBody) {
  const { text, issueId, userId } = requestBody;
  const comment = await Comment.create({ text, issue: issueId, user: userId });
  return comment;
}

async function getCommentsByIssueService(issueId) {
  const comments = await Comment.find({ issue: issueId })
    .sort({ createdAt: -1 })
    .populate("user", "username role");
  return comments;
}

async function updateCommentService(commentId, text, userId) {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found");

  if (comment.userId.toString() !== userId) throw new Error("Forbidden");
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { text },
    { new: true }
  );
  return updatedComment;
}

async function deleteCommentService(commentId, userId) {
  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ error: "Comment not found" });
  if (comment.userId.toString() !== userId) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const deletedComment = await Comment.findByIdAndDelete(commentId);
}
module.exports = {
  createCommentService,
  getCommentsByIssueService,
  updateCommentService,
  deleteCommentService,
};
