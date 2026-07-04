const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/appointments", async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and Phone are required",
      });
    }

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    await transporter.verify();

    const info =
      await transporter.sendMail({
        from: `"Bhera Society" <${process.env.EMAIL}>`,
        to: "bhukyaupender804@gmail.com",
        subject: "New Appointment Request",
        html: `
          <h2>New Appointment Request</h2>

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Phone:</strong>
            ${phone}
          </p>
        `,
      });

    console.log(
      "Email Sent:",
      info.messageId
    );

    res.status(200).json({
      success: true,
      message:
        "Appointment submitted successfully",
    });
  } catch (error) {
    console.error(
      "Appointment Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to send appointment email",
    });
  }
});

module.exports = router;