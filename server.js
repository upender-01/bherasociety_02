 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const reviewRoutes = require( "./routes/reviewroutes");
const authRoutes = require( "./routes/authroutes");
const app = express();
const paymentRoutes=require("./routes/paymentRoutes");
const contactRoutes =require("./routes/contactus");
const connectDB=require("./configdb/dbconfiguration");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const appointmentRoutes =require("./routes/appointmentroutes");

connectDB();

app.use("/api/reviews", reviewRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment" , paymentRoutes);
app.use("/api", appointmentRoutes);

