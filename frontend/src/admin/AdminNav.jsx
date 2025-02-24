import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function AdminNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu open/close
  };

  const handleLogout = function () {
    localStorage.removeItem("token");
    navigate("/login/adminlogin");
    toast.success("Logged out successfully");
  };

  const menuItems = [
    { to: "/adminhome", label: "Modify Users" },
    { to: "/admindochome", label: "Modify Doctors" },
    { to: "/admindoc", label: "Approve Doctors" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg fixed w-full z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-lg md:text-xl font-bold">Stroke Predictor</div>

        {/* Hamburger Icon for Small Screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu for Larger Screens */}
        <ul className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
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
            </li>
          ))}
        </ul>

        {/* Log out Button for Larger Screens */}
        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "#e2e8f0",
            color: "#1d4ed8",
          }}
          onClick={handleLogout}
          className="hidden md:block ml-4 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-lg transition duration-300"
        >
          Log out
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 space-y-4"
        >
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
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
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="w-full text-left bg-white text-blue-600 py-2 px-4 mt-2 font-semibold hover:bg-blue-100 transition duration-300"
            >
              Log out
            </button>
          </li>
        </motion.ul>
      )}
    </motion.nav>
  );
}

export default AdminNav;
