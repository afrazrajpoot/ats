const Recruiter = require("../models/recruiterModel");
const uploadOnCloudinary = require("../utils/cloudinary");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

exports.registerRecruiter = async (req, res, next) => {
  try {
    const { firstName, lastName, contactNumber, email, location, password, countryCode } = req.body;

    const path = req?.file?.path; // Ensure req.file is populated by multer
    const imgSrc = await uploadOnCloudinary(path); // Upload image to Cloudinary

    const user = await Recruiter.findOne({ email: email });
    if (user) {
      return next(new CustomError("You are already registered as a recruiter", 404));
    }

    // Create the new recruiter without the token initially
    const newRecruiter = await Recruiter.create({
      img: imgSrc || "",
      firstName,
      lastName,
      contactNumber,
      email,
      location,
      countryCode,
      password,
      recruiter: true,
    });

    // Generate the token using the created recruiter's id and email
    const token = jwt.sign(
      { id: newRecruiter._id, email: newRecruiter.email }, // Payload
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: "24h" } // Token expiration time
    );

    // Optionally, you can update the recruiter with the token if you need to save it in the database
    newRecruiter.token = token;
    await newRecruiter.save();

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day (24 hours)
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newRecruiter,
      },
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
