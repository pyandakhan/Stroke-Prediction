import { motion } from "framer-motion";
import DoctorNavbar from "../component/DoctorNavbar";
import Footer from "../component/Footer";

function Patients() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <DoctorNavbar />
      {/* Hero Section */}
      <section
        id="hero"
        className="h-96 md:h-[500px] flex items-center justify-center bg-gray-200 text-black"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Profile</h1>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default Patients;
