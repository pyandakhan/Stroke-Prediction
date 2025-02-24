const HeartHypertensionAssessment = require("../models/HeartHypertensionAssessment");

const getAllUsersData = async (req, res) => {
  try {
    const { doctorId } = req.params; // Assuming doctorId is sent as a route parameter

    // Fetch assessments where doctorId matches and doctorAssigned is true
    const assessments = await HeartHypertensionAssessment.find({
      doctorId: doctorId,
      doctorAssigned: false,
    });

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({ message: "No Patients Found" });
    }

    res.status(200).json(assessments);
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({ message: "Failed to retrieve assessments" });
  }
};

const updateAssessment = async (req, res) => {
  const { hypertension, heartDisease } = req.body;
  const { userId } = req.params; // Get userId from the URL

  try {
    const assessment = await HeartHypertensionAssessment.findOne({
      _id: userId,
    });

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    assessment.hypertension = hypertension;
    assessment.heartDisease = heartDisease;
    assessment.doctorAssigned = true;
    assessment.doctorReviewCompleted = true;

    await assessment.save();

    res.status(200).json({ message: "Assessment updated successfully" });
  } catch (error) {
    console.error("Error updating assessment:", error);
    res.status(500).json({ message: "Failed to update assessment" });
  }
};

const getGlucose = async (req, res) => {
  try {
    const assessment = await HeartHypertensionAssessment.findOne({
      userId: req.user.userid,
    });

    // Return glucose records if available
    if (assessment) {
      res.json(assessment.glucoseRecords);
    } else {
      res.status(404).json({ message: "Assessment record not found." });
    }
  } catch (error) {
    console.error("Error fetching glucose data:", error);
    res.status(500).json({ message: "Failed to fetch glucose data." });
  }
};

const updateBMI = async (req, res) => {
  const { bmi } = req.body; // Extract BMI from the body
  const userId = req.user.userid;
  if (!bmi) {
    return res.status(400).json({ message: "BMI is required" });
  }

  try {
    const assessment = await HeartHypertensionAssessment.findOne({
      userId: userId,
    });

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    assessment.bmi = bmi;
    assessment.bmiCalculated = true;

    await assessment.save();

    res.status(200).json({ message: "BMI updated successfully" });
  } catch (error) {
    console.error("Error updating BMI:", error);
    res.status(500).json({ message: "Failed to update BMI" });
  }
};
const getUserHealthData = async (req, res) => {
  const userId = req.user.userid;
  try {
    const healthData = await HeartHypertensionAssessment.findOne({
      userId,
    });

    res.status(200).json(healthData);
  } catch (error) {
    console.error("Error fetching health data:", error);
    res.status(500).json({ message: "Failed to retrieve health data" });
  }
};
const updateGlucose = async (req, res) => {
  const { date, glucose } = req.body;

  try {
    // Find the user's heart and hypertension assessment record
    let assessment = await HeartHypertensionAssessment.findOne({
      userId: req.user.userid,
    });

    // Check if the glucose record already exists for today
    const todayEntry = assessment.glucoseRecords.find(
      (entry) => entry.date === date
    );
    if (todayEntry) {
      return res
        .status(400)
        .json({ message: "Glucose data already entered for today." });
    }

    // Add the new glucose record
    assessment.glucoseRecords.push({ date, glucose });

    // Save the updated assessment record
    await assessment.save();

    res.status(200).json({ message: "Glucose record added successfully." });
  } catch (error) {
    console.error("Error storing glucose record:", error);
    res.status(500).json({ message: "Failed to update glucose record." });
  }
};

module.exports = {
  getAllUsersData,
  updateAssessment,
  updateBMI,
  getUserHealthData,
  getGlucose,
  updateGlucose,
};
