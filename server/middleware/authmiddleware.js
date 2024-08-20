const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError"); // Adjust the path as necessary

// Middleware to check authentication
const authMiddleware = (req, res, next) => {
  // Extract token from cookie
  const tokenFromCookie = req.cookies.token;
  // console.log(req.cookies, "jjkk");
  // Extract token from Authorization header
  const tokenFromHeader =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;

  // Use token from header if both are present; otherwise, use token from cookie
  const token = tokenFromHeader || tokenFromCookie;

  // console.log("Used token:", token);

  if (!token) {
    return next(new CustomError("Authentication token is missing", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;
    console.log(req.user, "userrrr");
    next();
  } catch (err) {
    console.log(err);
    next(new CustomError("Invalid or expired token", 401));
  }
};

module.exports = authMiddleware;
