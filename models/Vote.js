const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  issueId: { type: mongoose.Schema.Types.ObjectId, ref: "Issue" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: Date,
});

module.exports = mongoose.model("Vote", voteSchema);
