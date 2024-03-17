import React from "react";
import { FiRadio } from "react-icons/fi"; // Using a Bitcoin icon as an example
import { motion } from "framer-motion"; // Ensure you have framer-motion installed

const HeroSection = () => {
  return (
    <div className=" text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <FiRadio className="mx-auto text-yellow-400 text-9xl" />
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl font-extrabold sm:text-6xl md:text-7xl"
          >
            OuPow Foundation
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-lg mx-auto text-lg sm:text-2xl md:mt-8 md:max-w-3xl"
          >
            As a foundational collaborator with upow.ai, OuPow Staking possesses
            profound insights into the AI Network, a blockchain-driven machine
            learning framework. This intricate ecosystem is distinguished by its
            innovative approach to compensating both validators and miners.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
