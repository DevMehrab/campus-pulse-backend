const {
  createCommentService,
  getCommentsByIssueService,
  updateCommentService,
  deleteCommentService,
} = require("../services/commentService");
const asyncHandler = require("../utils/asyncHandler");

exports.createComment = asyncHandler(async (req, res) => {
  const comment = await createCommentService(req.body);
  res.status(201).json(comment);
});

exports.getCommentsByIssue = asyncHandler(async (req, res) => {
  const comments = await getCommentsByIssueService(req.params.issueId);
  res.json(comments);
});

exports.updateComment = asyncHandler(async (req, res) => {
  const updatedComment = await updateCommentService(
    req.params.commentId,
    req.body.text,
    req.user.id
  );
  res.json(updatedComment);
});

exports.deleteComment = asyncHandler(async (req, res) => {
  await deleteCommentService(req.params.commentId, req.user.id);
  res.json({ message: "Comment deleted successfully" });
});
