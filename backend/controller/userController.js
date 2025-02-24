const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const HeartHypertensionAssessment = require("../models/HeartHypertensionAssessment");

// Signup function
const signup = async (req, res) => {
  const { username, email, password, gender, age } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists. Please log in instead.",
        success: false,
      });
    }
    // Create the new user
    const newUser = new User({
      username,
      email,
      password,
      gender,
      age,
    });

    await newUser.save();

    // Create HeartHypertensionAssessment
    const userID = newUser._id;
    const assessment = new HeartHypertensionAssessment({
      userId: userID,
      email: email,
    });
    await assessment.save();

    res.status(201).json({
      message: "Signup successful.",
      success: true,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    // Check if the user exists
    if (!checkUser) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Check if the password is correct
    const isPasswordValid = password === checkUser.password;
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userid: checkUser._id,
        email: checkUser.email,
        name: checkUser.username,
        gender: checkUser.gender,
        age: checkUser.age,
        role: "user",
      },
      "hanthekha",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      success: true,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
      success: false,
    });
  }
};

module.exports = { signup, login };
