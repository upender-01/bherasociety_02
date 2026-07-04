const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/send-message", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bherasociety2023@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Bhera Society Website" <bherasociety2023@gmail.com>`,
      to: "bherasociety2023@gmail.com",
      subject: `New Contact Form Submission`,
      html: `
        <h2>New Contact Message</h2>
        <hr/>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <h3>Message</h3>
        <p>${message}</p>
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Unable to send message.",
    });
  }
});

module.exports = router;