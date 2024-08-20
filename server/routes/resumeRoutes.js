const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  uploadResume,
  updateResume,
} = require("../controller/resumeController");
const authMiddleware = require("../middleware/authmiddleware");
router
  .route("/create-resume")
  .post(authMiddleware, upload.single("img"), uploadResume);
router
  .route("/update/:id")
  .put(authMiddleware, upload.single("img"), updateResume);
module.exports = router;
