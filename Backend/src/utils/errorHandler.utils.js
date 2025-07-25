// This is a custom error class
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);               // Set the error message
    this.statusCode = statusCode; // Add statusCode to the object
    Error.captureStackTrace(this, this.constructor); // Optional: shows clean stack trace
  }
}

// This is your global error handler middleware
export const globalErrorHandler = (err, req, res, next) => {
  console.error("🔥 Error Caught:", err);

  const statusCode = err.statusCode || 500; // Default 500 (Internal Server Error)
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export class NotFoundError extends AppError {
    constructor(message = "Resource not found"){
        super(message , 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = "Conflict occured"){
        super(message , 409);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request"){
        super(message , 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized"){
        super(message , 401);
    }
}
