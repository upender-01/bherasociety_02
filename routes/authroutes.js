const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("dotenv").config();
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      token,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    message: "Invalid username or password",
  });
});

module.exports = router;