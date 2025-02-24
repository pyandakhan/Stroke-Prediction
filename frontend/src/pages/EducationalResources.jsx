import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const EducationalResources = () => {
  const guidelines = [
    {
      title: "Average Glucose Level",
      description:
        "Measure your average glucose level using a glucometer. For accurate results, ensure you measure it after fasting.",
      icon: "📊",
    },
    {
      title: "How to Calculate BMI",
      description:
        "BMI is calculated by visiting BMI in Navigation and set Height(cm) and Weight(KG).",
      icon: "📏",
    },
    {
      title: "Gender",
      description:
        "Select your gender: Male, Female, or Other. This field is important for risk profiling.",
      icon: "⚧",
    },
    {
      title: "Smoking Status",
      description:
        "Indicate whether you are a current smoker, a former smoker, or have never smoked.",
      icon: "🚭",
    },
    {
      title: "Hypertension and Heart Disease",
      description:
        "If you have been diagnosed with hypertension or heart disease, select Yes, otherwise choose No.",
      icon: "❤️",
    },
  ];

  const resources = [
    {
      title: "Understanding Stroke Risks",
      description:
        "Learn about common causes, risk factors for stroke, and how to manage them to improve your health.",
      link: "/strokerisk",
      icon: "🧠",
    },
    {
      title: "Diet and Stroke Prevention",
      description:
        "Discover the foods that can help reduce your risk of stroke, and learn about maintaining a balanced diet.",
      link: "/strokeprevent",
      icon: "🥗",
    },
    {
      title: "Exercise and Stroke Recovery",
      description:
        "Learn about the types of physical activity that can help prevent stroke and aid in recovery.",
      link: "/strokerecovery",
      icon: "🏋️‍♀️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pb-40 space-y-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-20"
        >
          Educational Resources
        </motion.h1>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Guidelines for Filling Stroke Predictor Input Fields
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{guideline.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {guideline.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{guideline.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Educational Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
                className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-5xl mr-4">{resource.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  <NavLink
                    to={resource.link}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full transition-all duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Read more
                  </NavLink>
                </div>
                <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-400" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EducationalResources;
