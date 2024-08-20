const errorMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  };
  return res
    .status(customError.statusCode)
    .json({ success: false, error: customError.message });
};

module.exports = errorMiddleware;
