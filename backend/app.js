const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const heartHypertensionAssessmentController = require("./controller/heartHypertensionAssessmentController");
const Prediction = require("./models/history");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.post(
  "/api/heart-hypertension-assessment",
  heartHypertensionAssessmentController.submitForm
);
app.use("/api/admin", adminRoutes);

app.get("/api/prediction-history", async (req, res) => {
  const { userId } = req.query; // Read from query parameters

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Fetch the prediction history for the given userId
    const predictions = await Prediction.find({ userId }).sort({
      createdAt: -1,
    }); // Sort by most recent

    if (predictions.length === 0) {
      return res.status(404).json({ message: "No prediction history found" });
    }

    res.status(200).json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST route for saving prediction
app.post("/api/save-prediction", async (req, res) => {
  const { userId, predictionResult, createdAt } = req.body;

  if (!userId || !predictionResult) {
    return res
      .status(400)
      .json({ error: "User ID and prediction result are required." });
  }

  try {
    const newPrediction = new Prediction({
      userId,
      predictionResult,
      createdAt,
    });

    await newPrediction.save();
    res.status(200).json({ message: "Prediction saved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save prediction." });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
