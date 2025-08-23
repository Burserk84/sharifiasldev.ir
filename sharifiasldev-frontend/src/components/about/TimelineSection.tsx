"use client"; // 1. Added "use client" to enable animations and hooks

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/Button";

// A reusable component for skill badges
function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="bg-gray-700 text-gray-300 text-sm font-medium me-2 px-3 py-1 rounded-full">
      {skill}
    </span>
  );
}

// Define the type for a single timeline item's data
type TimelineItemData = {
  date: string;
  title: string;
  content: string;
  skills: string[];
  button?: { text: string; href: string };
};

// The component for each item in the timeline, now with animation
function TimelineItem({
  item,
  index,
}: {
  item: TimelineItemData;
  index: number;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.2, // Start animation when 20% of the item is visible
  });

  const variants = {
    hidden: { opacity: 0, x: 20 }, // Start off-screen to the right (for RTL)
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative pl-10"
    >
      <div className="absolute -right-5 top-1 w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center ring-8 ring-gray-800">
      </div>
      <div className="pr-8 pt-2">
        <p className="text-sm text-gray-400">{item.date}</p>
        <h2 className="text-3xl font-bold mt-1">{item.title}</h2>
        <div className="mt-4 text-gray-300 leading-relaxed space-y-4">
          <p>{item.content}</p>
          {item.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          )}
          {item.button && (
            <div className="mt-6">
              <Button href={item.button.href} variant="primary">
                {item.button.text}
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// The main section component
export default function TimelineSection({
  items,
}: {
  items: TimelineItemData[];
}) {
  return (
    <section className="bg-gray-800">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative border-r-2 border-gray-700 space-y-20">
            {items.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
