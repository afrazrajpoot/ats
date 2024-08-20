const Resume = require("../models/resume");
const uploadOnCloudinary = require("../utils/cloudinary");
const CustomError = require("../utils/customError");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function geminiResponse(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone);

exports.uploadResume = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, education, experience, description } = req.body;

    // Validate email and phone
    let emailValid = validateEmail(email);
    let phoneValid = validatePhone(phone);
    let feedback = "";

    if (!emailValid) {
      const emailPrompt = `The email address ${email} is invalid. Please suggest a valid email format.`;
      const emailFeedback = await geminiResponse(emailPrompt);
      feedback += `Email: ${emailFeedback}\n`;
    }

    if (!phoneValid) {
      const phonePrompt = `The phone number ${phone} is invalid. Please suggest a valid phone number format.`;
      const phoneFeedback = await geminiResponse(phonePrompt);
      feedback += `Phone: ${phoneFeedback}\n`;
    }

    if (!emailValid) {
      console.log(feedback);
      return res.status(400).json({ status: "fail", feedback: feedback });
    }

    // Ensure file is uploaded
    if (!req.file || !req.file.path) {
      return next(new CustomError("Resume file is missing", 400));
    }

    const path = req.file.path;
    const imgSrc = await uploadOnCloudinary(path);

    // Get feedback on the description
    const descriptionPrompt = `Check the following description for ${firstName} ${lastName} and suggest improvements if any: ${description}`;
    const descriptionFeedback = await geminiResponse(descriptionPrompt);

    // Create new resume entry
    const newResume = new Resume({
      user: req.user.id,
      img: imgSrc,
      firstName,
      lastName,
      email,
      phone,
      education,
      experience,
      description,
    });

    await newResume.save();

    console.log(feedback);
    return res.status(201).json({
      status: "success",
      data: newResume,
      feedback: descriptionFeedback,
    });
  } catch (err) {
    console.log(err);
    return next(new CustomError(err, 500));
  }
};

exports.updateResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    let imgSrc;

    if (req.file && req.file.path) {
      const path = req.file.path;
      imgSrc = await uploadOnCloudinary(path);
    }

    // Find the resume by ID
    const resume = await Resume.findById(id);

    if (!resume) {
      return next(new CustomError("Resume not found", 404));
    }

    // Update the resume with new data
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { ...req.body, img: imgSrc || resume.img }, // Ensure imgSrc is preserved if no new image is uploaded
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({ status: "success", data: updatedResume });
  } catch (err) {
    return next(new CustomError(err.message, 500));
  }
};
