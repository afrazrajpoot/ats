class CustomError extends Error {
  constructor(message, statusCode = 500) {
    // Optional default statusCode
    super(message);
    this.statusCode = statusCode;

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor);

    // Set the name to the class name
    this.name = this.constructor.name;
  }
}

module.exports = CustomError;
