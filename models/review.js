 const mongoose = require("mongoose");

const reviewSchema =new mongoose.Schema({
      name: String,
      email: String,
      location: String,
      rating: Number,
      comment: String,
      isApproved: { type: Boolean, default: false,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("Review",reviewSchema);