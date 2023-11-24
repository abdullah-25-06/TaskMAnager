class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const CreateCustomError = (message, statusCode) => {
  return new CustomError(message, statusCode);
};

module.exports = { CreateCustomError, CustomError };
