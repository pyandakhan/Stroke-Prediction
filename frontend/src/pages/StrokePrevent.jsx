import { motion } from "framer-motion";
import Layout from "../component/Layout";

const StrokePrevent = () => {
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Layout
      title="Diet and Stroke Prevention"
      subtitle="Discover foods that can help reduce stroke risk and maintain a balanced diet"
    >
      <div className="space-y-12">
        <Section title="Foods to Help Reduce Stroke Risk">
          <p className="text-lg text-gray-700 mb-4">
            Incorporating certain foods into your diet can significantly lower
            your risk of stroke. Here are some key foods to consider:
          </p>
          <motion.ul className="space-y-2">
            {[
              "Leafy greens (spinach, kale, collard greens)",
              "Berries (blueberries, strawberries, blackberries)",
              "Fatty fish (salmon, mackerel, sardines)",
              "Nuts and seeds (walnuts, flaxseeds, chia seeds)",
              "Whole grains (oats, brown rice, quinoa)",
              "Avocados",
              "Beans and legumes (lentils, chickpeas, black beans)",
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

        <Section title="Tips for Maintaining a Balanced Diet">
          <p className="text-lg text-gray-700 mb-4">
            A balanced diet is crucial for overall health and stroke prevention.
            Here are some tips to help you maintain a healthy diet:
          </p>
          <motion.ul className="space-y-2">
            {[
              "Eat a variety of fruits and vegetables daily.",
              "Choose whole grains over refined grains.",
              "Limit saturated and trans fats; opt for healthy fats.",
              "Reduce sodium intake to help manage blood pressure.",
              "Stay hydrated by drinking plenty of water.",
              "Practice portion control to avoid overeating.",
              "Plan meals ahead of time to make healthier choices.",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
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
          By making informed dietary choices, you can significantly reduce your
          risk of stroke and improve your overall health. Start your journey to
          a healthier diet today!
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

export default StrokePrevent;
