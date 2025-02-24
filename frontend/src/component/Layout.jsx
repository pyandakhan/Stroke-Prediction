import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Layout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <motion.button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-10 flex items-center justify-center w-12 h-12 bg-white text-blue-600 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </motion.button>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <h1 className="text-4xl font-extrabold mb-2">{title}</h1>
            <p className="text-xl opacity-80">{subtitle}</p>
          </div>
          <div className="p-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;
