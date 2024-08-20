const Recruiter = require("../models/recruiterModel");
const User = require("../models/userModel");
const uploadOnCloudinary = require("../utils/cloudinary");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check for missing fields and password length
    if (!username || !email || !password) {
      return next(new CustomError("All fields are required", 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new CustomError("User already exists", 400));
    }

    let imgSrc;
    if (req.file) {
      try {
        const path = req.file.path; // Ensure req.file is populated by multer
        imgSrc = await uploadOnCloudinary(path); // Upload image to Cloudinary
      } catch (uploadError) {
        return next(new CustomError("Failed to upload image", 500));
      }
    }

    // Create new user with hashed password
    const newUser = await User.create({
      img: imgSrc || "",
      username,
      email,
      password,
      user: true,
    });
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email }, // Payload
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: "10d" } // Token expiration time
    );
    // Generate JWT token
    newUser.token = token;
    await newUser.save();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
      // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Adjust based on environment
      sameSite: "None", // For cross-origin requests
      maxAge: 24 * 60 * 60 * 1000, // 1 day (24 hours)
    });

    // Send response with user data and token
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// Login User
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return next(new CustomError("All fields are required", 400));
    }

    // Determine the model based on the userType
    const model = userType === "Recruiter" ? Recruiter : User;

    const user = await model.findOne({ email });

    if (!user) {
      console.log(email, password, userType, "checking");
      return next(
        new CustomError(`${userType.charAt(0).toUpperCase() + userType.slice(1)} not found`, 494)
      );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new CustomError("Incorrect password", 400));
    }

    // Generate token
    const token = jwt.sign({ id: user._id, email: user.email, userType }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    if (user) {
      user.token = token;
      await user.save(); // Save updated token to database
    }
    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send response with user data and token

    res.status(201).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    return next(err);
  }
};
