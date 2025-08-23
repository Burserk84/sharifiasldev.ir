"use client";

import { motion } from "framer-motion";

export default function AnimatedUnderline() {
  return (
    <motion.svg
      className="absolute bottom-0 left-0 w-full z-[-1]"
      viewBox="0 0 100 15" // Using a slightly different viewBox for better control
      preserveAspectRatio="none"
    >
      <motion.path
        // This new path data creates the "swoosh" shape
        d="M1 15 C 30 4, 85 4, 100 15"
        stroke="currentColor"
        strokeWidth="3" // A slightly thinner stroke often looks better
        fill="none"
        className="text-orange-400"
        // Animation properties
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2,
        }}
      />
    </motion.svg>
  );
}
