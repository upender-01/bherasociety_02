const express = require("express");
const nodemailer = require("nodemailer");
const Volunteer = require("../models/volunteerdb");

require("dotenv").config();

const router = express.Router();

router.post("/volunteers", async (req, res) => {
  try {
    const { name, phone, email, city, interest } = req.body;

    // Validate input
    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone and Email are required.",
      });
    }

    // Save volunteer to MongoDB
    const volunteer = new Volunteer({
      name,
      phone,
      email,
      city,
      interest,
    });
    
    // saving the data in the cloud 
    await volunteer.save();
    console.log("✅ Volunteer saved successfully.");

    // Check environment variables is exist or not 
    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      throw new Error("EMAIL or EMAIL_PASSWORD is missing in .env");
    }

    // Created transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verifying the  SMTP connection 
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");

    // Send email
    const info = await transporter.sendMail({
      from: `"Bhera Society NGO" <${process.env.EMAIL}>`,
      to: "bhukyaupender804@gmail.com",
      subject: "🤝 New Volunteer Registration",
      html: `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2 style="color:#16a34a;">🤝 New Volunteer Registration</h2>

        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td><strong>Phone</strong></td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>
          <tr>
            <td><strong>City</strong></td>
            <td>${city || "Not Provided"}</td>
          </tr>
          <tr>
            <td><strong>Interest</strong></td>
            <td>${interest || "Not Selected"}</td>
          </tr>
        </table>

        <p style="margin-top:20px;">
          A new volunteer has registered through the
          <strong>Bhera Society NGO Website.</strong>
        </p>
      </div>
      `,
    });

    console.log(" Email Sent Successfully");
    console.log("Message ID:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Volunteer registration successful.",
    });
  } catch (error) {
    console.error(" Volunteer Route Error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;