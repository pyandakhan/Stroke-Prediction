import { AnimatePresence, motion } from "framer-motion";

const WelcomePopup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Welcome to Stroke Predictor
            </h2>
            <p className="mb-4 text-gray-700">
              Here's how to use our platform:
            </p>
            <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">
              <li>Click on the "Stroke Predictor" button</li>
              <li>Calculate your BMI</li>
              <li>Contact a doctor for a review</li>
              <li>Measure your glucose level</li>
              <li>After the doctor's review, fill out the stroke form</li>
              <li>Our AI will predict your stroke risk</li>
              <li>You can measure your glucose daily for an average reading</li>
            </ol>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
