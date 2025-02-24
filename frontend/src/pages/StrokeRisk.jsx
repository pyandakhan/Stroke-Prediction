import { motion } from "framer-motion";
import Layout from "../component/Layout";

const StrokeRisk = () => {
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Layout
      title="Understanding Stroke Risks"
      subtitle="Learn about common causes, risk factors, and how to manage them"
    >
      <div className="space-y-12">
        <Section title="Common Causes of Stroke">
          <p className="text-lg text-gray-700 mb-4">
            A stroke occurs when blood flow to a part of the brain is
            interrupted. This can be caused by a blocked or ruptured blood
            vessel. Common causes of stroke include:
          </p>
          <motion.ul className="space-y-2">
            {[
              "Blood clots (ischemic stroke)",
              "Bleeding in the brain (hemorrhagic stroke)",
              "Blocked blood vessels",
              "Heart disease",
              "High cholesterol levels",
              "Uncontrolled high blood pressure",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </Section>

        <Section title="Risk Factors for Stroke">
          <p className="text-lg text-gray-700 mb-4">
            Several risk factors can increase the likelihood of having a stroke.
            These factors can be controlled or managed to reduce risk:
          </p>
          <motion.ul className="space-y-2">
            {[
              "High blood pressure",
              "Smoking",
              "Diabetes",
              "Obesity",
              "Physical inactivity",
              "Family history of stroke",
              "Excessive alcohol consumption",
              "Age (older adults have a higher risk)",
              "Gender (men are at higher risk, but women have a higher lifetime risk)",
              "Previous stroke or TIA (transient ischemic attack)",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </Section>

        <Section title="How to Manage Stroke Risk">
          <p className="text-lg text-gray-700 mb-4">
            Taking steps to manage and reduce your risk of stroke is essential
            for a healthy life. Here are some ways to manage stroke risk:
          </p>
          <motion.ul className="space-y-2">
            {[
              "Maintain a healthy diet (low in saturated fats, high in fiber)",
              "Exercise regularly (aim for at least 150 minutes of moderate exercise per week)",
              "Quit smoking",
              "Limit alcohol consumption",
              "Manage blood pressure through medication or lifestyle changes",
              "Control blood sugar levels, especially if you have diabetes",
              "Take prescribed medications for heart disease or blood clot prevention",
              "Regular check-ups with a healthcare provider to monitor risk factors",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </Section>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 bg-blue-50 rounded-lg text-center"
      >
        <p className="text-gray-700 text-lg">
          Understanding your stroke risk and making healthier choices can
          significantly reduce the chances of having a stroke. Take charge of
          your health today!
        </p>
      </motion.div>
    </Layout>
  );
};

const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-semibold text-blue-600 mb-4">{title}</h2>
    {children}
  </motion.div>
);

export default StrokeRisk;
