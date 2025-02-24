import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

function GlucoseCalc() {
  const navigate = useNavigate();
  const [glucose, setGlucose] = useState("");
  const [status, setStatus] = useState("");
  const [lastEntryDate, setLastEntryDate] = useState(null);
  const [glucoseRecords, setGlucoseRecords] = useState([]);

  useEffect(() => {
    const fetchGlucoseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/glucose`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const userGlucoseData = response.data;
        const currentDate = new Date().toISOString().split("T")[0];

        if (
          !userGlucoseData ||
          userGlucoseData.length === 0 ||
          response.status === 404
        ) {
          setLastEntryDate(null);
          setGlucoseRecords([]);
          return;
        }
        const todayEntry = userGlucoseData.find(
          (entry) => entry.date === currentDate
        );
        setLastEntryDate(todayEntry ? currentDate : null);
        setGlucoseRecords(userGlucoseData);
        if (response.status === 404) {
          setStatus("No record");
        }
      } catch (error) {
        console.error("Error fetching glucose data:", error);
      }
    };

    fetchGlucoseData();
  }, []);

  const handleGlucoseChange = (e) => {
    const value = e.target.value;
    if (value.length > 3) return;
    if (/^\d{1,3}$/.test(value)) {
      setGlucose(value);
    }
    setGlucose(value);
  };

  const calculateGlucose = async (e) => {
    e.preventDefault();

    if (!glucose || glucose < 50 || glucose > 400) {
      setStatus("Please enter a valid glucose value between 50 and 400 mg/dL.");
      return;
    }
    if (lastEntryDate) {
      setStatus(
        "You can only enter glucose once a day. Please try again tomorrow."
      );
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];

    try {
      await storeGlucose(currentDate, glucose);
      setGlucose("");
      setStatus("Glucose value recorded successfully.");
    } catch (error) {
      setStatus("Failed to record glucose. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (
      !(
        (e.key >= "0" && e.key <= "9") ||
        ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(
          e.key
        )
      )
    ) {
      e.preventDefault();
    }
  };

  const storeGlucose = async (currentDate, glucoseValue) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/users/updateglucose`,
        {
          date: currentDate,
          glucose: glucoseValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/predictor");
    } catch (error) {
      console.error("Error storing glucose:", error);
      setStatus("Failed to store glucose data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto mt-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Glucose Entry Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Glucose Level Entry
                </h2>
                <form onSubmit={calculateGlucose} className="space-y-6">
                  <div>
                    <label
                      htmlFor="glucose"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Glucose Level (mg/dL)
                    </label>
                    <input
                      type="text"
                      id="glucose"
                      value={glucose}
                      onChange={handleGlucoseChange}
                      onKeyDown={handleKeyPress}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your glucose level"
                      min={50}
                      max={400}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Submit Glucose Level
                  </motion.button>
                </form>
                {status && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 rounded-lg bg-gray-50"
                  >
                    <p className="text-center text-gray-800">{status}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Glucose Records Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Previous Glucose Records
                </h2>
                <div className="overflow-hidden">
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {glucoseRecords.length > 0 ? (
                      <div className="grid gap-4">
                        {glucoseRecords.map((record, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">
                                  Date
                                </span>
                                <span className="font-medium text-gray-900">
                                  {new Date(record.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm text-gray-500">
                                  Glucose Level
                                </span>
                                <span className="font-medium text-gray-900">
                                  {record.glucose} mg/dL
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        No glucose records available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}

export default GlucoseCalc;
