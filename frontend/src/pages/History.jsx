import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const ITEMS_PER_PAGE = 10;

function History() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userid;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/prediction-history?userId=${userId}`
        );
        if (Array.isArray(response.data)) {
          setHistory(response.data);
          setFilteredHistory(response.data);
        } else {
          setError("Received data is not in the expected format.");
        }
      } catch (err) {
        setError(`Error fetching prediction history: ${err.message}`);
      }
    };

    fetchHistory();
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-8 mt-12">
          Prediction History
        </h1>

        <div className=" bg-white rounded-lg shadow">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prediction Result
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.predictionResult}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center py-4 text-sm text-gray-500"
                  >
                    No prediction history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredHistory.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(Math.ceil(filteredHistory.length / ITEMS_PER_PAGE))].map(
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
                currentPage ===
                Math.ceil(filteredHistory.length / ITEMS_PER_PAGE)
              }
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default History;
