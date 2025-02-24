import { motion } from "framer-motion";
import Layout from "../component/Layout";

const StrokeRecover = () => {
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Layout
      title="Exercise and Stroke Recovery"
      subtitle="Learn about physical activities that aid in stroke prevention and recovery"
    >
      <div className="space-y-12">
        <Section title="Types of Physical Activity for Stroke Prevention">
          <p className="text-lg text-gray-700 mb-4">
            Engaging in regular physical activity is crucial for reducing the
            risk of stroke and promoting recovery. Here are some effective types
            of exercise:
          </p>
          <motion.ul className="space-y-2">
            {[
              "Aerobic exercises (walking, jogging, cycling)",
              "Strength training (using weights or resistance bands)",
              "Flexibility exercises (yoga, stretching)",
              "Balance exercises (tai chi, stability exercises)",
              "Recreational activities (dancing, swimming)",
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

        <Section title="Benefits of Regular Exercise">
          <p className="text-lg text-gray-700 mb-4">
            Regular physical activity offers numerous benefits that can aid in
            stroke recovery and overall health:
          </p>
          <motion.ul className="space-y-2">
            {[
              "Improves cardiovascular health",
              "Enhances muscle strength and endurance",
              "Boosts mood and reduces anxiety",
              "Aids in weight management",
              "Improves balance and coordination",
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

        <Section title="Tips for Incorporating Exercise into Daily Life">
          <p className="text-lg text-gray-700 mb-4">
            Here are some practical tips to help you incorporate exercise into
            your daily routine:
          </p>
          <motion.ul className="space-y-2">
            {[
              "Set realistic goals and gradually increase activity levels.",
              "Find activities you enjoy to make exercise more enjoyable.",
              "Schedule regular workout times to establish a routine.",
              "Consider joining a class or group for motivation and support.",
              "Use reminders or fitness apps to track progress and stay accountable.",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
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
          Regular exercise is a vital component of stroke recovery and
          prevention. Start incorporating physical activity into your life today
          for a healthier tomorrow!
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

export default StrokeRecover;
