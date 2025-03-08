import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Get token from the header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token using secret
    req.user = decoded;  // Attach user info to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default protect;
