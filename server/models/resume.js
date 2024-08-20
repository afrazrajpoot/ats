const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  education: { type: String, required: true },
  experience: { type: String, required: true },

  img: {
    type: String,
  },
  description: { type: String },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
