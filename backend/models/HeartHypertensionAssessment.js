const mongoose = require("mongoose");

const heartHypertensionAssessmentSchema = new mongoose.Schema(
  {
    // Existing fields
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    age: { type: Number },
    gender: { type: String },
    chestPain: { type: String },
    shortnessOfBreath: { type: String },
    dizziness: { type: String },
    familyHistory: { type: String },
    smokingStatus: { type: String },
    highBloodPressureHistory: { type: String },
    heartDiseaseSymptoms: { type: String },
    image: { type: String },
    heartDisease: { type: Boolean, default: false },
    hypertension: { type: Boolean, default: false },
    doctorAssigned: { type: Boolean, default: false },
    bmi: { type: Number },
    name: { type: String },
    email: { type: String },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },

    // New fields for tracking progress
    heartAssessmentCompleted: { type: Boolean, default: false },
    bmiCalculated: { type: Boolean, default: false },
    doctorReviewCompleted: { type: Boolean, default: false },
    predictorFormCompleted: { type: Boolean, default: false },

    // New field for glucose tracking
    glucoseRecords: [
      {
        date: { type: String, required: true }, // 'YYYY-MM-DD'
        glucose: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "HeartHypertensionAssessment",
  heartHypertensionAssessmentSchema
);
