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
  if (!comments) {
    const error = new Error("Comments not found");
    error.statusCode = 404;
    throw error;
  }
  return comments;
}

async function updateCommentService(commentId, text, userId) {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found");

  if (comment.userId.toString() !== userId) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { text },
    { new: true }
  );
  return updatedComment;
}

async function deleteCommentService(commentId, userId) {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }
  if (comment.userId.toString() !== userId) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }
  const deletedComment = await Comment.findByIdAndDelete(commentId);
}
module.exports = {
  createCommentService,
  getCommentsByIssueService,
  updateCommentService,
  deleteCommentService,
};
