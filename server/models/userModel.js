const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user: {
      type: Boolean,

      default: false,
    },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.generateToken = function (user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = mongoose.model("User", userSchema);
