import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = (req, _, next) => {
  if (!req.user) {
    throw new ApiError(401, "User not authenticated");
  }

  if (req.user.role !== "ADMIN") {
    throw new ApiError(403, "Admin access only");
  }

  next();
};
