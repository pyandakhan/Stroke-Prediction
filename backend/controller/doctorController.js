const Doctor = require("../models/doctorModel");
const jwt = require("jsonwebtoken");

// Signup Controller
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new Doctor({ username, email, password });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User created successfully", success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await Doctor.findOne({ email });

    if (!checkUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = password === checkUser.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!checkUser.isApproved) {
      return res.status(401).json({ message: "Not Approved" });
    }

    const token = jwt.sign(
      {
        userid: checkUser._id,
        email: checkUser.email,
        name: checkUser.username,
        role: "doctor",
      },
      "hanthekha",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
