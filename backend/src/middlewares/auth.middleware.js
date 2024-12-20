import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
