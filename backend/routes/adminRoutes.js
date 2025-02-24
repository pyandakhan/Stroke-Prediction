const express = require("express");
const {
  login,
  deleteUser,
  addDoctor,
  deleteDoctor,
  getUsers,
  getDoctorForAdmin,
  approveDr,
  getDoctor, // Import the getUsers function
} = require("../controller/adminController");

const router = express.Router();

router.post("/login", login);
router.delete("/delete-user/:userId", deleteUser);
router.post("/add-doctor", addDoctor);
router.delete("/delete-doctor/:id", deleteDoctor);
router.post("/approvedoctor/:id", approveDr);
router.get("/get-doctors", getDoctor);
router.get("/getDoctor", getDoctorForAdmin);
// Add a route to get all users
router.get("/get-users", getUsers); // GET route for fetching users

module.exports = router;
