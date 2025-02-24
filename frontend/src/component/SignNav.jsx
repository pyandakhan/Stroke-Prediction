import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function SignNav() {
  return (
    <div className="p-3 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-md rounded-md p-4"
      >
        <ul className="flex justify-center items-center space-x-4 m-0 list-none">
          <li>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <NavLink
                to="usersignup"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-bold"
                    : "text-gray-700 hover:text-gray-500"
                }
              >
                User
              </NavLink>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <NavLink
                to="doctorsignup"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-bold"
                    : "text-gray-700 hover:text-gray-500"
                }
              >
                Doctor
              </NavLink>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default SignNav;
