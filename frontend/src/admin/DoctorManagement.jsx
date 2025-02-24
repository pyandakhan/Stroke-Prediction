import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Fetch unapproved doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getDoctor"
        );
        const unapprovedDoctors = response.data.filter(
          (doctor) => !doctor.isApproved
        );
        setDoctors(unapprovedDoctors);
        if (unapprovedDoctors.length === 0) {
          setStatus("Ops! No Doctor request right now 😞");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Approve a doctor
  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/approvedoctor/${id}`);
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor._id !== id)
      );
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };

  // Reject a doctor
  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-doctor/${id}`);
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor._id !== id)
      );
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 to-indigo-200 bg-cover bg-center bg-fixed">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center mt-20">
          Doctor Management
        </h1>
        {status ? (
          <p className="text-red-500 text-2xl text-center">{status}</p>
        ) : isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <motion.div layout className="space-y-4">
            {doctors.map((doctor) => (
              <motion.div
                key={doctor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={doctor.image}
                    alt={`${doctor.username}'s profile`}
                    className="w-20 h-20 rounded-full object-cover mr-4"
                  />
                  <h2 className="text-2xl font-bold">{doctor.username}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <span className="font-semibold">Email:</span> {doctor.email}
                  </p>
                  <p>
                    <span className="font-semibold">Pid:</span>{" "}
                    {doctor.practitionerId}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {doctor.phoneNumber}
                  </p>
                  <p>
                    <span className="font-semibold">Specialization:</span>{" "}
                    {doctor.specialization}
                  </p>
                  <p>
                    <span className="font-semibold">Age:</span> {doctor.age}
                  </p>
                  <p>
                    <span className="font-semibold">Experience:</span>{" "}
                    {doctor.yearsOfExperience} years
                  </p>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleApprove(doctor._id)}
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleReject(doctor._id)}
                  >
                    Reject
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DoctorManagement;
