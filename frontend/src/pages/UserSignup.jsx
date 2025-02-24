import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaBirthdayCake,
  FaCheck,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaTimes,
  FaUser,
  FaVenusMars,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [passwordFeedback, setPasswordFeedback] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Username validation
    if (name === "username") {
      // Regex to ensure at least 3 letters first, then any combination of letters, numbers, or underscores
      const regex = /^[a-zA-Z]{3}[a-zA-Z0-9_]*$/;

      if (!regex.test(value)) {
        setError((prevError) => ({
          ...prevError,
          username:
            "Username must start with at least three letters, followed by letters, numbers, or underscores.",
        }));
      } else {
        setError((prevError) => {
          const { username, ...rest } = prevError;
          return rest;
        });
      }
    }

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError((prevError) => ({
          ...prevError,
          email: "Please enter a valid email address.",
        }));
      } else {
        setError((prevError) => {
          const { email, ...rest } = prevError;
          return rest;
        });
      }
    }

    // Password feedback
    if (name === "password") {
      const value = e.target.value;
      const feedback = [];

      if (!/[A-Z]/.test(value)) feedback.push("Add an uppercase letter");
      if (!/[a-z]/.test(value)) feedback.push("Add a lowercase letter");
      if (!/\d/.test(value)) feedback.push("Add a number");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
        feedback.push("Add a special character");

      setPasswordFeedback(feedback);
    }

    // Age validation
    if (name === "age") {
      const age = parseInt(value, 10);
      if (isNaN(age) || age < 7 || age > 120) {
        setError((prevError) => ({
          ...prevError,
          age: "Age should be a valid number between 7 and 120.",
        }));
      } else {
        setError((prevError) => {
          const { age, ...rest } = prevError;
          return rest;
        });
      }
    }

    // Update formData
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (/\s/.test(formData.username)) {
      formErrors.username = "Username should not contain spaces.";
    }

    if ((formData.username.match(/[a-zA-Z]/g) || []).length < 3) {
      formErrors.username = "Username must contain at least three letters.";
    }

    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age < 7 || age > 120) {
      formErrors.age = "Age should be a valid number between 7 and 120.";
    }

    if (passwordFeedback.length > 0) {
      formErrors.password = "Please fix the password issues listed below.";
    }

    if (!["Male", "Female", "Other"].includes(formData.gender)) {
      formErrors.gender = "Gender must be one of 'Male', 'Female', or 'Other'.";
    }

    setError(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );

      if (response.status === 201) {
        navigate("/login/userlogin");
        setFormData({
          username: "",
          email: "",
          password: "",
          gender: "",
          age: "",
        });
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/17483868/pexels-photo-17483868/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-machine-learning-is-inspired-by-neuroscience-and-the-human-brain-it-was-created-by-novoto-studio-as-par.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="w-full flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-6 text-blue-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Patient Signup
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={20}
                  required
                />
                {formData.username && !error.username && (
                  <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
                {error.username && (
                  <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                )}
              </div>
              {error.username && (
                <p className="text-red-500 text-sm mt-2">{error.username}</p>
              )}
            </motion.div>

            {/* Email field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {formData.email && !error.email && (
                  <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
                {error.email && (
                  <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                )}
              </div>
            </motion.div>

            {/* Password field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={12}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error.password && (
                <p className="text-red-500 text-sm mt-2">{error.password}</p>
              )}
              <ul className="mt-2 space-y-1 text-sm text-red-500">
                {passwordFeedback.map((feedback, index) => (
                  <li key={index}>{feedback}</li>
                ))}
              </ul>
            </motion.div>

            {/* Gender field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <div className="relative">
                <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formData.gender && !error.gender && (
                  <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
                {error.gender && (
                  <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                )}
              </div>
            </motion.div>

            {/* Age field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age
              </label>
              <div className="relative">
                <FaBirthdayCake className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {formData.age && !error.age && (
                  <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                )}
                {error.age && (
                  <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              type="submit"
              disabled={
                Object.keys(error).length > 0 ||
                !formData.username ||
                !formData.email ||
                !formData.password ||
                !formData.gender ||
                !formData.age
              }
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg disabled:bg-blue-400"
            >
              Sign Up
            </motion.button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login/userlogin" className="text-blue-600">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSignup;
