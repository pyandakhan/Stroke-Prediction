import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getDoctor"
        );
        setDoctors(response.data);
      } catch (err) {
        setError("Failed to fetch doctors.");
        console.error(err);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (doctorId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/delete-doctor/${doctorId}`
      );
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
      setSuccessMessage("Doctor deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
    } catch (err) {
      setError("Failed to delete doctor");
      console.error(err);
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg mt-20"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Manage Doctors
        </h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 mb-4"
          >
            {error}
          </motion.p>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Years of Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Approved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentDoctors.map((doctor, index) => (
                <motion.tr
                  key={doctor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">
                        {doctor.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm text-gray-500">
                        {doctor.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.yearsOfExperience}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.specialization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doctor.isApproved ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(doctor._id)}
                      className="text-red-600 hover:text-red-900 flex items-center"
                    >
                      <Trash2 className="h-5 w-5 mr-1" />
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {doctors.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(Math.ceil(doctors.length / ITEMS_PER_PAGE))].map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 text-sm font-medium ${
                    currentPage === index + 1
                      ? "text-blue-600 bg-blue-100"
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  } border border-gray-300 rounded-md`}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(doctors.length / ITEMS_PER_PAGE)
              }
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DoctorManagement;
