const jwt = require('jsonwebtoken');

// In production, keep this secret in a .env file!
const JWT_SECRET = 'your_super_secret_hospital_key'; 

function authMiddleware(req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify token
    const verified = jwt.verify(token, JWT_SECRET);
    req.admin = verified; // Attach admin info to request
    next(); // Pass to the next middleware/route
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = authMiddleware;