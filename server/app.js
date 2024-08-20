const express = require("express");
const errorMiddleware = require("./middleware/errorMiddleware");
const CustomError = require("./utils/customError");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json());
app.use(
  require("cors")({
    origin: "*", // Set allowed origin
    credentials: true, // Enable setting credentials in the response
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded form data parsing
// Routes
app.use("/api/v1", require("./routes/registerUser.route"));
app.use("/api/v1", require("./routes/resumeRoutes"));
app.use("/api/v1", require("./routes/jobPost.route"));
// Catch all route for undefined routes
app.all("*", (req, res, next) => {
  const url = req.originalUrl;
  next(new CustomError(`URL ${url} not found`, 404));
});

// Error handling middleware - must be defined to catch errors
app.use(errorMiddleware);

module.exports = app;
