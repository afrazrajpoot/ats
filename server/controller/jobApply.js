const Job = require("../models/jobApplyModel");
const CustomError = require("../utils/customError");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
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

exports.jobPost = async (req, res, next) => {
  try {
    // const { title, company, salary, description, location } = req.body;
    console.log(req.body, "body");
    // console.log(title, company, salary, description);
    // if (!title || !company || !location || !salary || !description) {
    //   return next(new CustomError("All fields are required", 400));
    // }
    const job = await Job.create({
      recruiter: req.user.id,
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      salary: parseInt(req.body.salary),
      description: req.body.description,
    });
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    console.log(err);
    return next(new CustomError(err));
  }
};
exports.applyJob = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, currentCompany, coverLetter, address } =
      req.body;
    // console.log(firstName, lastName, email, phoneNumber, currentCompany, coverLetter, "resume");
    const job = await Job.findById(req.params.id);

    // console.log(req.params.jobId, "iiiiddddd");
    if (!job) {
      return next(new CustomError("Job not found", 404));
    }
    const path = req.file;
    if (!path) {
      return next(new CustomError("No resume uploaded", 400));
    }

    // Check if the user has already applied
    // const alreadyApplied = job.applications.some(
    //   (application) => application.candidate.toString() === req.user.id
    // );

    // if (alreadyApplied) {
    //   return next(new CustomError("User has already applied to this job", 400));
    // }

    // Create a new application subdocument
    const newApplication = {
      candidate: req.user.id,
      firstName,
      lastName,
      email,
      phoneNumber,
      currentCompany,
      address,
      coverLetter,
      resume: path.path, // Save the uploaded file path to the database
    };

    // Add the application to the job
    job.applications.push(newApplication);
    await job.save();

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    console.log(err);
    // console.log(req.params.jobId, "iiiiddddd");

    return next(new CustomError(err.message, 500)); // Ensure to pass the message and status code
  }
};
exports.recruiterJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user.id,
    });
    // console.log(req.user.id, "my jobs");
    if (!jobs) {
      return next(new CustomError("No job found", 404));
    }
    res.status(200).json({ success: true, data: jobs });
  } catch (err) {
    console.log(err);
    return next(new CustomError(err.message, 500)); // Ensure to pass the message and status code
  }
};
exports.getJobById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id);
    if (!job) {
      return next(new CustomError("Job not found", 404));
    }
    res.status(200).json({ success: true, data: job });
  } catch (err) {
    console.log(err);
    return next(new CustomError(err.message, 500)); // Ensure to pass the message and status code
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    if (!jobs) {
      return next(new CustomError("No job found", 404));
    }
    res.status(200).json({ jobs });
  } catch (err) {
    console.log(err);
    return next(new CustomError(err.message, 500)); // Ensure to pass the message and status code
  }
};

exports.atsSystem = async (req, res, next) => {
  try {
    const { id, jobId } = req.body;

    // Find the job with the specific jobId
    const job = await Job.findOne({
      _id: id,
      applications: { $elemMatch: { _id: jobId } },
    });

    if (!job) {
      return next(new CustomError("Job not found", 404));
    }

    // Find the specific application within the job's applications array
    const application = job.applications.find((app) => app._id.toString() === jobId);

    if (!application) {
      return next(new CustomError("Application not found", 404));
    }

    // Read the PDF file
    const dataBuffer = fs.readFileSync(application.resume);

    // Parse the PDF file
    const pdfData = await pdfParse(dataBuffer);

    // Extract and set the description from the parsed PDF text
    const description = pdfData.text;
    const obj = {
      description: description,
    };

    // Prepare the ATS prompt
    const jobDescription = job.description;
    const atsPrompt = `Compare the following texts and provide a single percentage similarity value:

    1. **Cover Letter:** ${application.coverLetter}
    2. **Resume Description:** ${obj.description}
    3. **Job Description:** ${jobDescription}
    
    Please provide the percentage similarity between 0% and 100%. The percentage should be an approximate value, and no additional explanation is needed.`;

    // Get the similarity response from the API
    const atsResponse = await geminiResponse(atsPrompt);
    console.log(atsResponse, "atsResponse");
    const atsPercentage = parseInt(atsResponse);
    if (atsPercentage < 50) {
      return res.status(400).json({ message: "Resume is not match" });
    }
    // Extract similarity percentage from the response

    res.status(200).json({ success: true, application, ch: atsPercentage });
  } catch (err) {
    console.error(err);
    return next(new CustomError(err.message, 500));
  }
};
