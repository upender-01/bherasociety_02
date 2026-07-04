const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'your_super_secret_hospital_key'; 

// POST: Admin Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials for this example. 
  // In a real app, you would check an Admin model in MongoDB.
  if (username === 'admin' && password === 'hospital123') {
    // Generate a token that expires in 2 hours
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ token, message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;