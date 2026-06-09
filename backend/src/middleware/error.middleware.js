export const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  console.log("ERROR MIDDLEWARE RUNNING");
  console.log(message);

  return res.status(statusCode).json({
    success: false,
    message,
  });
};