const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model for user reference
      required: true,
    },
    predictionResult: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
