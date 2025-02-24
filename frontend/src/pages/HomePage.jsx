import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import WelcomePopup from "../component/WelcomePopup";

const HomePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");
    if (!hasSeenPopup) {
      setIsPopupOpen(true);
      localStorage.setItem("hasSeenWelcomePopup", "true");
    }
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="pb-40">
      <Navbar />

      <WelcomePopup isOpen={isPopupOpen} onClose={closePopup} />

      {/* Hero Section */}
      <section
        id="hero"
        className="h-96 md:h-[500px] flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        style={{
          backgroundImage:
            'url("https://plus.unsplash.com/premium_photo-1701534008693-0eee0632d47a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic2l0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Predict Stroke Risk with Precision
          </h1>
          <p className="text-sm md:text-lg mb-8 font-light max-w-xl mx-auto">
            Our AI-powered system helps you identify and manage stroke risk
            effectively and efficiently.
          </p>
          <Link to="/Predictor">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Stroke Predictor
            </motion.a>
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-blue-600"
          >
            About Our System
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-gray-700"
          >
            <p className="mb-6">
              Stroke Predictor is a cutting-edge platform designed to help
              healthcare professionals and individuals assess stroke risk with
              unparalleled accuracy.
            </p>
            <p className="mb-6">
              Our goal is to make stroke prevention accessible and effective.
              Whether you are a medical professional or concerned about personal
              health, our platform offers the tools you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-600"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Predictions",
                description:
                  "Utilize advanced machine learning algorithms for accurate stroke risk assessment.",
              },
              {
                title: "Daily Glucose Tracking",
                description:
                  "Monitor your glucose levels daily to maintain an accurate health profile.",
              },
              {
                title: "Professional Consultation",
                description:
                  "Connect with healthcare professionals for personalized advice and risk evaluation.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-600">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
