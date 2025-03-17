import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error for debugging

  let statusCode = 500;
  let message = "Internal Server Error";

  // 🔹 Handle MongoDB Errors
  if (err.code === 11000) {
    statusCode = 409;
    message = `Duplicate value: ${Object.keys(err.keyValue).join(
      ", "
    )} already exists.`;
  }
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error: any) => error.message)
      .join(", ");
  }
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}.`;
  }
  if (err.name === "MongoNetworkError") {
    statusCode = 503;
    message = "Database connection error. Please try again later.";
  }
  if (err.name === "TimeoutError") {
    statusCode = 408;
    message = "Request timed out. Please try again.";
  }

  // 🔹 Handle JSON Parsing Errors (Invalid JSON Format)
  if (err instanceof SyntaxError && "body" in err) {
    statusCode = 400;
    message = "Invalid JSON format.";
  }

  // 🔹 Handle Unauthorized (JWT) Errors
  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Invalid or missing authentication token.";
  }

  // 🔹 Handle Forbidden Errors (Permissions)
  if (err.name === "ForbiddenError") {
    statusCode = 403;
    message = "You do not have permission to access this resource.";
  }

  // 🔹 Handle Route Not Found
  if (err.message === "Route Not Found") {
    statusCode = 404;
    message = "The requested route does not exist.";
  }

  // 🔹 Handle Method Not Allowed
  if (err.message === "Method Not Allowed") {
    statusCode = 405;
    message = "HTTP method not allowed for this endpoint.";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
