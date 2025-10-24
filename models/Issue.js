const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: {
      type: String,
      enum: ["facility", "academic", "admin", "it", "cafeteria", "other"],
    },
    images: [String],
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved", "rejected"],
      default: "pending",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    anonymous: { type: Boolean, default: false },
    votes: Number,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
