import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, Mail, Trash2, User, Users } from "lucide-react";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/get-users"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/delete-user/${userId}`
      );
      setUsers(users.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      alert("Failed to delete user", err);
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg mt-20"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h2>

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
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">
                        {user.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm text-gray-500">{user.gender}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm text-gray-500">{user.age}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(user._id)}
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

        {users.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(Math.ceil(users.length / ITEMS_PER_PAGE))].map(
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
                currentPage === Math.ceil(users.length / ITEMS_PER_PAGE)
              }
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserManagement;
