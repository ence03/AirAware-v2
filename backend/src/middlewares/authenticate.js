import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
};
