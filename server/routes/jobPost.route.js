const express = require("express");
const {
  jobPost,
  applyJob,
  recruiterJobs,
  getJobById,
  getAllJobs,
  atsSystem,
} = require("../controller/jobApply");
const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/multer");
const router = express.Router();
router.route("/job-post").post(authMiddleware, jobPost);
router.route("/apply-job/:id").post(authMiddleware, upload.single("resume"), applyJob);
router.route("/get-recruiterJobs").get(authMiddleware, recruiterJobs);
router.route("/get-job/:id").get(authMiddleware, getJobById);
router.route("/get-jobs").get(authMiddleware, getAllJobs);
router.route("/checkAts").post(authMiddleware, atsSystem);
module.exports = router;
