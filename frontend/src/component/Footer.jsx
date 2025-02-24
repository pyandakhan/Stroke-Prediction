import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 md:py-10 mt-auto fixed bottom-0 left-0 w-full z-10">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-xs md:text-sm"
        >
          <p>&copy; 2024 Stroke Predictor. All rights reserved.</p>
          <p>Designed with passion and precision.</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
