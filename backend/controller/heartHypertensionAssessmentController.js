const HeartHypertensionAssessment = require("../models/HeartHypertensionAssessment");

exports.submitForm = async (req, res) => {
  try {
    const {
      age,
      gender,
      chestPain,
      shortnessOfBreath,
      dizziness,
      familyHistory,
      smokingStatus,
      highBloodPressureHistory,
      heartDiseaseSymptoms,
      name,
      image,
      userId,
      doctorId, // Adding doctorId here
    } = req.body;

    const newAssessment = await HeartHypertensionAssessment.findOne({
      userId: userId,
    });

    if (!newAssessment) {
      return res
        .status(404)
        .json({ message: "Assessment not found for the user." });
    }

    // Update fields
    newAssessment.age = age;
    newAssessment.gender = gender;
    newAssessment.chestPain = chestPain;
    newAssessment.shortnessOfBreath = shortnessOfBreath;
    newAssessment.dizziness = dizziness;
    newAssessment.familyHistory = familyHistory;
    newAssessment.smokingStatus = smokingStatus;
    newAssessment.highBloodPressureHistory = highBloodPressureHistory;
    newAssessment.heartDiseaseSymptoms = heartDiseaseSymptoms;
    newAssessment.name = name;
    newAssessment.image = image;
    newAssessment.doctorId = doctorId; // Saving the doctorId
    newAssessment.heartAssessmentCompleted = true;

    await newAssessment.save();

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res
      .status(500)
      .json({ message: "Failed to submit form. Please try again." });
  }
};
