const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/registerUser");
const { registerRecruiter } = require("../controller/recruiterRegister");
const upload = require("../middleware/multer");
router.route("/register").post(upload.single("img"), registerUser);
router.route("/recruiterRegister").post(upload.single("img"), registerRecruiter);
router.route("/login").post(loginUser);
module.exports = router;
