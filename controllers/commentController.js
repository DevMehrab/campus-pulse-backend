const Comment = require("../models/Comment");
const {
  createCommentService,
  getCommentsByPostService,
  updateCommentService,
  deleteCommentService,
} = require("../services/commentService");

exports.createComment = async (req, res) => {
  try {
    const comment = await createCommentService(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await getCommentsByPostService(req.params.postId);
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await updateCommentService(
      req.params.commentId,
      req.body.text,
      req.user.id
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await deleteCommentService(req.params.commentId, req.user.id);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
