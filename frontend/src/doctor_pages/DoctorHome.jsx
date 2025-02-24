import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import DoctorNavbar from "../component/DoctorNavbar";
import Footer from "../component/Footer";

export default function DoctorHome() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [hypertension, setHypertension] = useState(false);
  const [heartDisease, setHeartDisease] = useState(false);
  const [message, setMessage] = useState("");
  const [refreshPatients, setRefreshPatients] = useState(false);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.userid;
    }
    return null;
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchPatients = async () => {
      if (!userId) {
        setMessage("User is not authenticated.");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/assessment/${userId}`
        );
        setPatients(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage(error.response.data.message || "No users found.");
        } else {
          setMessage(`Error fetching data: ${error.message}`);
        }
      }
    };

    fetchPatients();
  }, [refreshPatients, userId]);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setHypertension(patient.hypertension);
    setHeartDisease(patient.heartDisease);
  };

  const updateAssessmentStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/assessment/${selectedPatient._id}`,
        { hypertension, heartDisease }
      );
      alert(response.data.message);
      setRefreshPatients((prev) => !prev);
      setSelectedPatient(null);
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <DoctorNavbar />

      <main className="container mx-auto px-4 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2 mt-20">
            Doctor Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your patients and appointments
          </p>
        </motion.section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Patient Appointments
          </h2>
          {message && <p className="text-red-500 mb-4">{message}</p>}
          {!message && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {patients.map((patient) => (
                <motion.div
                  key={patient.userId}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <h3 className="text-lg font-semibold truncate">
                        {patient.name}
                      </h3>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="mr-2 h-4 w-4" />
                        <span>Age: {patient.age}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Gender: {patient.gender}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>
                          Last Visit: {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePatientSelect(patient)}
                      className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors duration-300"
                    >
                      View & Modify
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <AnimatePresence>
          {selectedPatient && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            >
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="p-6 relative">
                  <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <div className="overflow-y-auto pr-4 max-h-[60vh] space-y-4">
                    {selectedPatient.image ? (
                      <img
                        src={selectedPatient.image}
                        alt="Test Image"
                        className="w-full max-h-60 object-cover rounded-md mb-4"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md mb-4">
                        No Image Available
                      </div>
                    )}
                    {[
                      { label: "Name", value: selectedPatient.name },
                      { label: "Age", value: selectedPatient.age },
                      { label: "Gender", value: selectedPatient.gender },
                      { label: "Bmi", value: selectedPatient.bmi },
                      {
                        label: "Avg Glucose",
                        value: (
                          selectedPatient.glucoseRecords.reduce(
                            (acc, record) => acc + record.glucose,
                            0
                          ) / selectedPatient.glucoseRecords.length
                        ).toFixed(2),
                      },
                      {
                        label: "Chest Pain",
                        value: selectedPatient.chestPain,
                      },
                      {
                        label: "Shortness of Breath",
                        value: selectedPatient.shortnessOfBreath,
                      },
                      {
                        label: "Dizziness",
                        value: selectedPatient.dizziness,
                      },
                      {
                        label: "Family History",
                        value: selectedPatient.familyHistory,
                      },
                      {
                        label: "Smoking Status",
                        value: selectedPatient.smokingStatus,
                      },
                      {
                        label: "High Blood Pressure History",
                        value: selectedPatient.highBloodPressureHistory,
                      },
                      {
                        label: "Heart Disease Symptoms",
                        value: selectedPatient.heartDiseaseSymptoms,
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-2 border-b border-gray-200"
                      >
                        <span className="font-medium text-gray-600">
                          {label}:
                        </span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Hypertension
                      </label>
                      <select
                        value={hypertension.toString()}
                        onChange={(e) =>
                          setHypertension(e.target.value === "true")
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Heart Disease
                      </label>
                      <select
                        value={heartDisease.toString()}
                        onChange={(e) =>
                          setHeartDisease(e.target.value === "true")
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={updateAssessmentStatus}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
                    >
                      Update Assessment
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
