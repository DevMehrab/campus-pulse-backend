const { Router } = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createIssue,
  getIssueByUser,
  getIssueById,
  getIssues,
  voteIssue,
  deleteIssue,
} = require("../controllers/issueController");

const route = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "campus_pulse",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({ storage });

route.get("/", getIssues);
route.get("/issue/:issueId", getIssueById);
route.get("/user/:userId", getIssueByUser);
route.post("/create", authMiddleware, upload.single("file"), createIssue);
route.put("/:issueId/vote", authMiddleware, voteIssue);
route.delete("/:issueId", authMiddleware, deleteIssue);

module.exports = route;
