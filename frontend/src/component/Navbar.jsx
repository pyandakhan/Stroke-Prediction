import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaBars, FaHeartbeat, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("hasSeenWelcomePopup");
    navigate("/login/userlogin");
    toast.success("Logged out successfully");
  };

  const menuItems = [
    { to: "/userhome", label: "Home" },
    { to: "/glucose", label: "Avg Glucose" },
    { to: "/EducationalResources", label: "Resources" },
    { to: "/HospitalLocator", label: "Hospitals" },
    { to: "/history", label: "History" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg fixed w-full z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/userhome" className="flex items-center space-x-2">
          <FaHeartbeat className="text-2xl text-red-500" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Stroke Predictor
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative overflow-hidden group ${
                  isActive ? "text-blue-200" : "text-white"
                }`
              }
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </NavLink>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-lg transition duration-300 hover:bg-blue-100"
          >
            Log out
          </motion.button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4"
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "text-blue-100 hover:bg-blue-700"
                }`
              }
              onClick={toggleMenu}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
            className="w-full text-left bg-white text-blue-600 py-2 px-4 mt-2 font-semibold hover:bg-blue-100 transition duration-300"
          >
            Log out
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
