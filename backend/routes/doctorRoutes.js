const express = require("express");
const { signup, login } = require("../controller/doctorController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateSignup } = require("../middleware/validationMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/signup", validateSignup, signup);

router.post("/login", login);

router.get(
  "/doctorhome",
  authMiddleware,
  roleMiddleware("doctor"), // Only doctor can access this route
  (req, res) => {
    res.send("Welcome to the user homepage");
  }
);

module.exports = router;
