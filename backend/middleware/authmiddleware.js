import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token == null) {
    return res.status(401).json({ message: "Authentication token required" });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token expired. Please signin again" });
    }
        if (user._id && typeof user._id === 'string') {
      user._id = new mongoose.Types.ObjectId(user._id);
    }
    req.user = user;
    next();
  });
};
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

export default authenticateToken;