import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

function BMICalc() {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const handleWeightChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and prevent input if value exceeds 3 digits
    if (/^\d{0,3}$/.test(value)) {
      setWeight(value);
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and prevent input if value exceeds 3 digits
    if (/^\d{0,3}$/.test(value)) {
      setHeight(value);
    }
  };

  const calculateBMI = (e) => {
    e.preventDefault();

    // Validate input
    if (!weight || !height) {
      setBmi(null);
      setStatus("Please enter both weight and height.");
      return;
    }

    if (isNaN(weight) || isNaN(height)) {
      setBmi(null);
      setStatus("Weight and height must be numeric values.");
      return;
    }

    if (weight <= 0 || height <= 0) {
      setBmi(null);
      setStatus("Weight and height must be greater than zero.");
      return;
    }

    if (height < 30 || height > 300) {
      setBmi(null);
      setStatus("Height must be between 30 cm and 300 cm.");
      return;
    }

    if (weight < 20 || weight > 200) {
      setBmi(null);
      setStatus("Weight must be between 20 kg and 200 kg.");
      return;
    }

    // Calculate BMI
    const heightInMeters = height / 100; // Convert cm to meters
    const calculatedBMI = (weight / heightInMeters ** 2).toFixed(2);

    setBmi(calculatedBMI);

    // Determine BMI category
    if (calculatedBMI < 18.5) {
      setStatus("Underweight");
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
      setStatus("Normal weight");
    } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
      setStatus("Overweight");
    } else {
      setStatus("Obese");
    }

    // Update BMI in the backend
    updateBmi(calculatedBMI); // Pass the calculated BMI directly
  };

  const updateBmi = async (calculatedBMI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/users/updatebmi`,
        { bmi: calculatedBMI }, // Send the passed BMI directly
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );
      navigate("/predictor");
    } catch (error) {
      console.error("Error updating BMI:", error);
      alert("Failed to update BMI. Please try again."); // Handle error gracefully
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            BMI Calculator
          </h1>
          <form onSubmit={calculateBMI}>
            <div className="mb-4">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Weight (kg)
              </label>
              <input
                type="text"
                id="weight"
                value={weight}
                onChange={handleWeightChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your weight"
                maxLength={3} // Limit the length to 3 characters
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-700"
              >
                Height (cm)
              </label>
              <input
                type="text"
                id="height"
                value={height}
                onChange={handleHeightChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your height"
                maxLength={3} // Limit the length to 3 characters
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Calculate BMI
            </motion.button>
          </form>

          {bmi && (
            <div className="mt-6 text-center">
              <p className="text-lg text-gray-800">
                Your BMI: <span className="font-bold">{bmi}</span>
              </p>
              <p className="text-md text-indigo-600">{status}</p>
            </div>
          )}

          {!bmi && status && (
            <div className="mt-6 text-center text-red-600">
              <p>{status}</p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default BMICalc;
