const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: "Issue" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commnet", commentSchema);
