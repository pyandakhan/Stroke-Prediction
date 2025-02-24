import axios from "axios";
import { motion } from "framer-motion";
import { AtSign, Lock, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const [animating, setAnimating] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear errors and animations when user starts typing
    setErrors({
      ...errors,
      [name]: false,
    });
    setErrorMessages({
      ...errorMessages,
      [name]: "",
    });
    setAnimating({
      ...animating,
      [name]: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctors/login",
        formData
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "doctor");
        navigate("/doctorhome");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.data.message === "Incorrect password") {
          setErrors({ ...errors, password: true });
          setErrorMessages({
            ...errorMessages,
            password: "Incorrect password",
          });
          setAnimating({ ...animating, password: true });
        } else if (
          error.response.data.message === "Invalid email or password"
        ) {
          setErrors({ email: true, password: true });
          setErrorMessages({
            email: "Invalid email or password",
            password: "Invalid email or password",
          });
          setAnimating({ email: true, password: true });
        } else if (error.response.data.message === "Not Approved") {
          toast.error("Not approved by admin yet");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = (fieldName) =>
    `w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
      errors[fieldName]
        ? `border-error ${
            animating[fieldName] ? "animate-shake animate-vibrate" : ""
          }`
        : "border-gray-300"
    }`;

  useEffect(() => {
    const timeouts = Object.keys(animating).map((field) => {
      if (animating[field]) {
        return setTimeout(() => {
          setAnimating((prev) => ({ ...prev, [field]: false }));
        }, 1000);
      }
      return null;
    });

    return () => {
      timeouts.forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [animating]);

  return (
    <div
      className="min-h-screen flex bg-gradient-to-r from-blue-100 to-purple-100"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/17483868/pexels-photo-17483868/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-machine-learning-is-inspired-by-neuroscience-and-the-human-brain-it-was-created-by-novoto-studio-as-par.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        backgroundPosition: "center",
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
            className="text-3xl font-bold text-center mb-6 bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="inline-block text-blue-500"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Doctor Login
            </motion.span>{" "}
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses("email")}
                  required
                />
              </div>
              {errorMessages.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errorMessages.email}
                </p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClasses("password")}
                  required
                />
              </div>
              {errorMessages.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errorMessages.password}
                </p>
              )}
            </motion.div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md font-medium transition duration-200 flex items-center justify-center ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  <LogIn className="mr-2" size={18} />
                  Login
                </>
              )}
            </motion.button>
          </form>
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-sm text-gray-600">Dont have an account?</p>
            <Link to="/signup/doctorsignup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorLogin;
