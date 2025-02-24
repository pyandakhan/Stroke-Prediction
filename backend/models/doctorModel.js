const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  age: { type: Number, required: true },
  image: { type: String },
  practitionerId: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
