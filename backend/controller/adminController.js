const express = require("express");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Admin = require("../models/adminModel");
const HeartHypertensionAssessment = require("../models/HeartHypertensionAssessment");
const jwt = require("jsonwebtoken");

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await Admin.findOne({ email });

    if (!checkUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = password === checkUser.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userid: checkUser._id,
        email: checkUser.email,
        name: checkUser.username,
        role: "admin",
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

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Delete user controller
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    await User.findByIdAndDelete(userId);
    await HeartHypertensionAssessment.findOneAndDelete({ userId });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// Add doctor controller
const addDoctor = async (req, res) => {
  const {
    username,
    email,
    password,
    specialization,
    phoneNumber,
    yearsOfExperience,
    age,
    profileImage,
    practitionerId,
  } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !specialization ||
    !phoneNumber ||
    !yearsOfExperience ||
    !age ||
    !profileImage ||
    !practitionerId
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newDoctor = new Doctor({
      username,
      email,
      password,
      specialization,
      phoneNumber,
      yearsOfExperience,
      age,
      isApproved: false,
      image: profileImage,
      practitionerId,
    });
    await newDoctor.save();

    res.status(200).json({ message: "Doctor added successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to add doctor" });
  }
};

const getDoctorForAdmin = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (!doctors) {
      res.status(404).json({ message: "No doctors found" });
    }
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: true });
    if (!doctors) {
      res.status(404).json({ message: "No doctors found" });
    }
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approveDr = async (req, res) => {
  const { id } = req.params;
  try {
    const appr = await Doctor.findById(id);
    appr.isApproved = true;
    await appr.save();
    res.status(200).send({ message: "Doctor approved successfully." });
  } catch (error) {
    res.status(500).send({ message: "Error approving doctor.", error });
  }
};

module.exports = {
  login,
  deleteUser,
  addDoctor,
  deleteDoctor,
  getUsers,
  getDoctor,
  approveDr,
  getDoctorForAdmin,
};
