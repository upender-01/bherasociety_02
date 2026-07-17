const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();
const volunteerschema=require("../models/volunteerdb");
require("dotenv").config();
router.post("/volunteers", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      city,
      interest,
    } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone and Email are required",
      });
      
    }
      /** if the all required as user entered then details will stored in the database */
      const newvolunteer=new volunteerschema({
        name , 
        phone, 
        email, 
        city,
       interest
      });
      
      await newvolunteer.save(); // saves the data of the volunteer.

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Bhera Society NGO" <${process.env.EMAIL}>`,
      to: "bhukyaupender804@gmail.com",
      subject: "New Volunteer Registration",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2 style="color:#16a34a;">
            🤝 New Volunteer Registration
          </h2>

          <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;width:100%;">
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

    console.log("Volunteer Email Sent:", info.messageId);

    res.status(200).json({
      success: true,
      message: "Volunteer registration successful.",
    });
  } catch (error) {
    console.error("Volunteer Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to register volunteer.",
    });
  }
});

module.exports = router;