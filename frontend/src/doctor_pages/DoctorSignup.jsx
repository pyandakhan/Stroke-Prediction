import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCheck,
  FaClinicMedical,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaImage,
  FaLock,
  FaPhone,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const DoctorManagement = () => {
  const [doctorData, setDoctorData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    specialization: "",
    age: "",
    yearsOfExperience: "",
    profileImage: null,
    practitionerId: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState([]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const validateForm = () => {
    let formErrors = {};

    if (!doctorData.username.trim()) {
      formErrors.username = "Username is required";
    } else if (/\s/.test(doctorData.username)) {
      formErrors.username = "Username should not contain spaces";
    } else if ((doctorData.username.match(/[a-zA-Z]/g) || []).length < 3) {
      formErrors.username = "Username must contain at least three letters";
    }

    if (!doctorData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(doctorData.email)) {
      formErrors.email = "Email is invalid";
    }

    if (!doctorData.phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(doctorData.phoneNumber)) {
      formErrors.phoneNumber = "Phone number is invalid";
    }

    if (!doctorData.specialization.trim()) {
      formErrors.specialization = "Specialization is required";
    }

    if (!doctorData.age.trim()) {
      formErrors.age = "Age is required";
    } else if (!/^\d+$/.test(doctorData.age)) {
      formErrors.age = "Age must be a number";
    } else if (parseInt(doctorData.age) < 18) {
      formErrors.age = "Age must be at least 18";
    }

    if (!doctorData.yearsOfExperience.trim()) {
      formErrors.yearsOfExperience = "Years of experience is required";
    } else if (!/^\d+$/.test(doctorData.yearsOfExperience)) {
      formErrors.yearsOfExperience = "Years of experience must be a number";
    }

    if (!doctorData.password) {
      formErrors.password = "Password is required";
    } else if (passwordFeedback.length > 0) {
      formErrors.password = "Please fix the password issues listed below";
    }

    if (!image) {
      formErrors.profileImage = "Profile image is required";
    }

    if (!doctorData.practitionerId.trim()) {
      formErrors.practitionerId = "Practitioner ID is required";
    } else if (!/^\d{10}$/.test(doctorData.practitionerId)) {
      formErrors.practitionerId = "Practitioner ID must be exactly 10 digits";
    }

    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });

    let error = "";
    if (name === "username") {
      const regex = /^[a-zA-Z]{2}[a-zA-Z0-9_]*$/;
      if (!regex.test(value)) {
        error =
          "Username must start with at least three letters, followed by letters, numbers, or underscores.";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    } else if (name === "phoneNumber") {
      if (!value.trim()) {
        error = "Phone number is required";
      } else if (!/^\+?\d{10,15}$/.test(value)) {
        error = "Phone number is invalid";
      }
    } else if (name === "specialization") {
      if (!value.trim()) {
        error = "Specialization is required";
      } else if (/\s/.test(value)) {
        error = "Specialization should not contain spaces";
      } else if (/[\d]/.test(value)) {
        error = "Specialization should not contain numbers";
      } else if ((value.match(/[a-zA-Z]/g) || []).length < 3) {
        error = "Specialization must contain at least three letters";
      }
    } else if (name === "age") {
      if (!value.trim()) {
        error = "Age is required";
      } else if (!/^\d+$/.test(value)) {
        error = "Age must be a number";
      } else if (parseInt(value) < 18) {
        error = "Age must be at least 18";
      }
    } else if (name === "yearsOfExperience") {
      if (!value.trim()) {
        error = "Years of experience is required";
      } else if (!/^\d+$/.test(value)) {
        error = "Years of experience must be a number";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      }

      const feedback = [];
      if (!/[A-Z]/.test(value)) feedback.push("Add an uppercase letter");
      if (!/[a-z]/.test(value)) feedback.push("Add a lowercase letter");
      if (!/\d/.test(value)) feedback.push("Add a number");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
        feedback.push("Add a special character");
      setPasswordFeedback(feedback);
    } else if (name === "practitionerId") {
      if (!value.trim()) {
        error = "Practitioner ID is required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Practitioner ID must be exactly 10 digits";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mmoli04q");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dldist5ds/image/upload",
        formData
      );
      setImage(response.data.secure_url);
      setErrors((prevErrors) => ({ ...prevErrors, profileImage: "" }));
    } catch (error) {
      console.error("Image upload failed", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        profileImage: "Image upload failed. Please try again.",
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const doctorDataWithImage = {
        ...doctorData,
        profileImage: image,
      };
      await axios.post(
        "http://localhost:5000/api/admin/add-doctor",
        doctorDataWithImage
      );
      setSuccessMessage("Signup successfully! Wait for admin to approve");
      setDoctorData({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        specialization: "",
        age: "",
        yearsOfExperience: "",
        profileImage: null,
        practitionerId: "",
      });
      setImage("");
      setPasswordFeedback([]);
    } catch (error) {
      setErrors({ submit: "Failed to add doctor. Please try again.", error });
    } finally {
      setIsLoading(false);
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl"
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-6 text-blue-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Doctor Signup
          </motion.h2>
          {successMessage && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={doctorData.username}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter username"
                    maxLength={20}
                  />
                  {doctorData.username &&
                    (errors.username ? (
                      <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                    ) : (
                      <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ))}
                </div>
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={doctorData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter email"
                    maxLength={20}
                  />
                  {doctorData.email &&
                    (errors.email ? (
                      <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                    ) : (
                      <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ))}
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="age"
                >
                  Age
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={doctorData.age}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.age ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter age"
                    maxLength={3}
                  />
                  {doctorData.age &&
                    (errors.age ? (
                      <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                    ) : (
                      <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ))}
                </div>
                {errors.age && (
                  <p className="mt-1 text-xs text-red-500">{errors.age}</p>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="yearsOfExperience"
                >
                  Years of Experience
                </label>
                <div className="relative">
                  <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={doctorData.yearsOfExperience}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.yearsOfExperience
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter years of experience"
                  />
                  {doctorData.yearsOfExperience &&
                    (errors.yearsOfExperience ? (
                      <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                    ) : (
                      <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ))}
                </div>
                {errors.yearsOfExperience && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.yearsOfExperience}
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={doctorData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter phone number"
                    maxLength={15}
                  />
                  {doctorData.phoneNumber &&
                    (errors.phoneNumber ? (
                      <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                    ) : (
                      <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ))}
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="specialization"
                >
                  Specialization
                </label>
                <div className="relative">
                  <FaClinicMedical className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={doctorData.specialization}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.specialization
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter specialization"
                    maxLength={18}
                  />
                  {doctorData.specialization &&
                    (errors.specialization ? (
                      <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                    ) : (
                      <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ))}
                </div>
                {errors.specialization && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.specialization}
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={doctorData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter password"
                    maxLength={12}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {doctorData.password &&
                    (errors.password || passwordFeedback.length > 0 ? (
                      <FaTimes className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500" />
                    ) : (
                      <FaCheck className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ))}
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
                <ul className="mt-2 space-y-1 text-sm text-red-500">
                  {passwordFeedback.map((feedback, index) => (
                    <li key={index}>{feedback}</li>
                  ))}
                </ul>
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="profileImage"
                >
                  Profile Image
                </label>
                <div className="relative">
                  <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={handleImageUpload}
                    className={`w-full pl-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.profileImage ? "border-red-500" : "border-gray-300"
                    }`}
                    accept="image/*"
                  />
                  {image &&
                    (errors.profileImage ? (
                      <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                    ) : (
                      <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ))}
                </div>
                {errors.profileImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.profileImage}
                  </p>
                )}
                {uploading && (
                  <p className="mt-1 text-xs text-blue-500">
                    Uploading image...
                  </p>
                )}
                {image && (
                  <img
                    src={image}
                    alt="Profile preview"
                    className="mt-2 w-20 h-20 object-cover rounded-full"
                  />
                )}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="practitionerId"
                >
                  Practitioner ID
                </label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="practitionerId"
                    name="practitionerId"
                    value={doctorData.practitionerId}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.practitionerId
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter 10-digit Practitioner ID"
                    maxLength={10}
                  />
                  {doctorData.practitionerId &&
                    (errors.practitionerId ? (
                      <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                    ) : (
                      <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    ))}
                </div>
                {errors.practitionerId && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.practitionerId}
                  </p>
                )}
              </div>
            </div>

            <motion.button
              type="submit"
              className={`w-full py-2 mt-4 text-white font-bold rounded-lg shadow-md focus:outline-none ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              disabled={isLoading || uploading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </motion.button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login/doctorlogin" className="text-blue-600">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorManagement;
