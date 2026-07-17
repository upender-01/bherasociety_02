const express = require("express");
const nodemailer = require("nodemailer");
const Volunteer = require("../models/volunteerdb");

require("dotenv").config();

const router = express.Router();

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  throw new Error("Brevo SMTP credentials are missing.");
}

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP once when the server starts
transporter.verify((err) => {
  if (err) {
    console.error("SMTP Connection Failed");
    console.error(err);
  } else {
    console.log("✅ Brevo SMTP Connected");
  }
});

router.post("/volunteers", async (req, res) => {
  try {
    const { name, phone, email, city, interest } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone and Email are required.",
      });
    }

    // Save to MongoDB
    const newvolunteer = new Volunteer({
      name,
      phone,
      email,
      city,
      interest,
    });

    await newvolunteer.save();


    // Send success response immediately
    res.status(200).json({
      success: true,
      message: "Volunteer registered successfully",
    });

    // Send email in background
      setImmediate(()=>{
      transporter
      .sendMail({
        from: '"Bhera Society NGO" <bhukyaupender804@gmail.com>',
        to: "bhukyaupender804@gmail.com",
        subject: "🤝 New Volunteer Registration",

        html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2 style="color:#16a34a;">New Volunteer Registration</h2>

          <table border="1" cellpadding="10" cellspacing="0"
          style="border-collapse:collapse;width:100%">

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
              <td>${interest || "Not Provided"}</td>
            </tr>

          </table>

          <br>

          <p>
            A new volunteer has registered through the
            <strong>Bhera Society NGO Website.</strong>
          </p>
        </div>
        `,
      })
      .then((info)=>{
        console.log("✅ Email Sent Successfully");
        console.log(info.messageId);
      })
      .catch((err)=>{
        console.error("Email is not sent");
        console.error(err);
      })
    });
    

  } catch (error) {
    console.error("Volunteer Route Error");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;