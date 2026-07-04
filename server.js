 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const reviewRoutes = require( "./routes/reviewroutes");
const authRoutes = require( "./routes/authroutes");
const app = express();
const paymentRoutes=require("./routes/paymentRoutes");
const contactRoutes =require("./routes/contactus");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const appointmentRoutes =require("./routes/appointmentroutes");
app.use("/api/reviews", reviewRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment" , paymentRoutes);
app.use("/api", appointmentRoutes);
mongoose
  .connect(
    "mongodb://localhost:27017/hospital_db"
  )
  .then(() => {
    app.listen(5000, () =>
      console.log("Server Running on Port 5000" ));
  })
  .catch(console.log);