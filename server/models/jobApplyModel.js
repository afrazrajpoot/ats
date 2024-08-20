const mongoose = require("mongoose");
const applicationsSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      maxlength: 50,
    },
    lastName: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      // unique: true, // Removed
    },
    phoneNumber: {
      type: String,
    },
    currentCompany: {
      type: String,
      maxlength: 50,
    },
    address: {
      type: String,
      maxlength: 100,
    },
    coverLetter: {
      type: String,
      maxlength: 500,
    },
    resume: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
    },
    title: {
      type: String,
      required: true,

      maxlength: 50,
    },
    company: {
      type: String,
      required: true,
      maxlength: 50,
    },
    location: {
      type: String,
      required: true,
      maxlength: 50,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    applications: [applicationsSchema],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
