"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { devoraValues, devoraTeam } from "@/lib/data";

/**
 * @file src/components/about/DevoraSection.tsx
 * @description The Devora vision block — content only (the page owns the
 * section wrapper + SectionHeading). Mission/values render as a glass-card
 * bento, the founding team as glass cards; blocks stagger-fade in once the
 * section scrolls into view.
 */
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
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="mt-14 space-y-14"
    >
      {/* Mission + values — two glass cards */}
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {devoraValues.map((value) => (
          <motion.div
            key={value.title}
            variants={itemVariants}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-lg font-bold text-gray-100">{value.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
              {value.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Founding team */}
      <div>
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-2xl font-bold text-gray-100 sm:text-3xl">
            تیم اولیه Devora (برنامه برای مهرماه)
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            سفر Devora با یک هسته کوچک اما متخصص و باانگیزه آغاز خواهد شد:
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {devoraTeam.map((member) => (
            <motion.div
              key={member.role}
              variants={itemVariants}
              className="glass-card rounded-3xl p-8"
            >
              <span aria-hidden className="text-4xl">
                {member.icon}
              </span>
              <h4 className="mt-4 text-xl font-bold text-gray-100">
                {member.role}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {member.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
