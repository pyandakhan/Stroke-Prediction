const express = require("express");
const { signup, login } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateSignup } = require("../middleware/validationMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getAllUsersData,
  updateAssessment,
  updateBMI,
  getUserHealthData,
  getGlucose,
  updateGlucose,
} = require("../controller/assessmentController");

const router = express.Router();

router.post("/signup", validateSignup, signup);

router.post("/login", login);

// Route to get all users with assessment data
router.get("/assessment/:doctorId", getAllUsersData);
router.put("/assessment/:userId", updateAssessment);
router.put("/updatebmi", authMiddleware, updateBMI);
router.get("/healthdata", authMiddleware, getUserHealthData);

// Add a new glucose record for the user
router.put("/updateglucose", authMiddleware, updateGlucose);

// Get the glucose records for the authenticated user
router.get("/glucose", authMiddleware, getGlucose);

router.get(
  "/userhome",
  authMiddleware,
  roleMiddleware("user"), // Only users can access this route
  (req, res) => {
    res.send("Welcome to the user homepage");
  }
);

module.exports = router;
