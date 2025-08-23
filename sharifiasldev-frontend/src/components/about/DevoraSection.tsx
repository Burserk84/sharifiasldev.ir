"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { devoraValues, devoraTeam } from "@/lib/data"; // Import the new data

export default function DevoraSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-24 bg-gray-900"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Logo and Main Title */}
        <motion.div
          variants={itemVariants}
          className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <span className="text-2xl font-bold text-orange-400">Devora</span>
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-4xl font-bold">
          از من به ما: تولد Devora
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto"
        >
          با افزایش تجربه و پیچیده‌تر شدن پروژه‌ها، نیاز به همکاری و هم‌افزایی
          برای ارائه راه‌حل‌های بزرگتر و جامع‌تر احساس شد...
        </motion.p>

        {/* Mission and Values List */}
        <motion.div
          variants={itemVariants}
          className="mt-10 max-w-2xl mx-auto text-right space-y-3"
        >
          {devoraValues.map((value) => (
            <p key={value.title} className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-orange-400 ml-3 flex-shrink-0 mt-1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong className="text-white">{value.title}</strong>{" "}
                {value.text}
              </span>
            </p>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-3xl font-bold">
            تیم اولیه Devora (برنامه برای مهرماه)
          </h3>
          <p className="mt-2 text-gray-400">
            سفر Devora با یک هسته کوچک اما متخصص و باانگیزه آغاز خواهد شد:
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto"
        >
          {devoraTeam.map((member) => (
            <motion.div
              key={member.role}
              variants={itemVariants}
              className="bg-gray-800 p-8 rounded-lg"
            >
              <div className="text-6xl mb-4">{member.icon}</div>{" "}
              <h4 className="text-xl font-bold">{member.role}</h4>
              <p className="mt-2 text-gray-400">{member.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
