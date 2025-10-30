const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    issue: { type: mongoose.Schema.Types.ObjectId, ref: "Issue" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
