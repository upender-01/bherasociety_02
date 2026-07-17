const express = require("express");
const nodemailer = require("nodemailer");
const volunteerSchema = require("../models/volunteerdb");

require("dotenv").config();

const router = express.Router();

router.post("/volunteers", async (req, res) => {
  try {
    const { name, phone, email, city, interest } = req.body;

    // Validate required fields
    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone and Email are required.",
      });
    }

    // Save volunteer details in MongoDB
    const newVolunteer = new volunteerSchema({
      name,
      phone,
      email,
      city,
      interest,
    });

    await newVolunteer.save();

    // Check environment variables
    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      console.error("EMAIL or EMAIL_PASSWORD is missing in .env");

      return res.status(500).json({
        success: false,
        message: "Email configuration error.",
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    console.log("SMTP Server Connected Successfully");

    // Send Email
    const info = await transporter.sendMail({
      from: `"Bhera Society NGO" <${process.env.EMAIL}>`,
      to: "bhukyaupender804@gmail.com",
      subject: "🤝 New Volunteer Registration",
      html: `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2 style="color:#16a34a;">
          🤝 New Volunteer Registration
        </h2>

        <table cellpadding="8" cellspacing="0" border="1"
        style="border-collapse:collapse;width:100%;">
          <tr>
            <td><strong>Full Name</strong></td>
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
            <td><strong>Area of Interest</strong></td>
            <td>${interest || "Not Selected"}</td>
          </tr>
        </table>

        <br>

        <p>
          A new volunteer has registered through the
          <strong>Bhera Society NGO Website.</strong>
        </p>
      </div>
      `,
    });

    console.log("Volunteer Email Sent Successfully");
    console.log("Message ID:", info.messageId);

    // Send response ONLY ONCE
    return res.status(200).json({
      success: true,
      message: "Volunteer registration successful.",
    });

  } catch (error) {
    console.error("Volunteer Route Error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;