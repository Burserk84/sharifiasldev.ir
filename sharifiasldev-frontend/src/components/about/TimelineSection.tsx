"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/Button";

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
    hidden: { opacity: 0, x: 24 }, // Start off-screen to the right (for RTL)
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      /* pr clears the rail + node on the right edge (RTL start side) */
      className="relative pr-9 sm:pr-12"
    >
      {/* Rail node — centered on the container's right border */}
      <span
        aria-hidden
        className="absolute -right-2 top-7 h-4 w-4 rounded-full bg-orange-400 ring-4 ring-gray-900 sm:top-9"
      />

      <div className="glass-card rounded-3xl p-6 sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-300">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          {item.date}
        </span>

        <h3 className="mt-4 text-xl font-bold text-gray-100 sm:text-2xl">
          {item.title}
        </h3>

        <div className="mt-3 space-y-4 text-sm leading-relaxed text-gray-400 sm:text-base">
          <p>{item.content}</p>
          {item.skills.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <li
                  key={skill}
                  dir="ltr"
                  className="glass-card rounded-full px-3.5 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:border-orange-400/40 hover:text-orange-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
          {item.button && (
            <div className="pt-2">
              <Button
                href={item.button.href}
                variant="primary"
                size="lg"
                className="glow-accent rounded-full px-6"
              >
                {item.button.text}
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * @file src/components/about/TimelineSection.tsx
 * @description Content-only timeline rail (the page owns the section
 * wrapper + SectionHeading): a hairline rail on the RTL start edge with
 * glass-card milestones that fade + slide in once when scrolled into view.
 */
export default function TimelineSection({
  items,
}: {
  items: TimelineItemData[];
}) {
  return (
    <div className="relative mx-auto mt-14 max-w-4xl space-y-8 border-r-2 border-white/10">
      {items.map((item, index) => (
        <TimelineItem key={item.title} item={item} index={index} />
      ))}
    </div>
  );
}
