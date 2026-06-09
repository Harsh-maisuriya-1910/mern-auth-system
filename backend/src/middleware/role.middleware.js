import { ApiError } from "../utils/ApiError.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized request"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied. You are not allowed to access this resource"));
    }

    next();
  };
};


