class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.status = "error";
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res, next) => {
  console.log("THIS IS THE ERROR -------\n", err);
  const { status, message, statusCode } = err;

  res.status(statusCode || 500).json({
    status: status,
    statusCode: statusCode,
    message: message,
  });
  next();
};

module.exports = {
  ErrorHandler,
  handleError,
};
