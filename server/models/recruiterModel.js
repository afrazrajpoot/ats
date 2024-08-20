// models/recruiterModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const recruiterSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    recruiter: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
recruiterSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});
recruiterSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const Recruiter = mongoose.model("Recruiter", recruiterSchema);

module.exports = Recruiter;
