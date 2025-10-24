const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: "Issue" },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    statusUpdate: String,
    createdAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);
