const express = require("express");
const nodemailer = require("nodemailer");
const Volunteer = require("../models/volunteerdb");

require("dotenv").config();

const router = express.Router();
 
if(!process.env.EMAIL ||  !process.env.EMAIL_PASSWORD){
  throw new Error("Email credentials are missing");
}
const transporter=nodemailer.createTransport({
  service :"gmail",
  auth : {
    user:process.env.EMAIL,
    pass : process.env.EMAIL_PASSWORD,
  },
});

router.post("/volunteers", async (req, res) =>{
  try {
    const { name, phone, email, city, interest } = req.body;

    // Validation
    if (!name || !phone || !email){
      return res.status(400).json({
        success: false,
        message: "Name, Phone and Email are required.",
      });
    }

    // Save to MongoDB
    const volunteer = new Volunteer({
      name,
      phone,
      email,
      city,
      interest,
    });

    await volunteer.save();

    res.status(200).json({
      success : true,
      saved : true,
      message : "Volunteer registered successfully",
    });

    

    // Send Mail
   setImmediate(()=>{
      transporter
        .sendMail({
          from: `"Bhera Society NGO" <${process.env.EMAIL}>`,
          to: "bhukyaupender804@gmail.com",
          subject: "🤝 New Volunteer Registration",

          html: `
          <div style="font-family:Arial,sans-serif;padding:20px">

            <h2 style="color:#16a34a">
              New Volunteer Registration
            </h2>

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
              A new volunteer has successfully registered through the
              <strong>Bhera Society NGO Website.</strong>
            </p>

          </div>
          `,
        })
        .then((info)=>{
          console.log("✅ Email sent Successfully");
          console.log(info.messageId);
        })
        .catch((err)=>{
          console.error("Email Sending Failed");
          console.error(err);
        });
  });
   return ;
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