"use client";

import Reveal from "./Reveal";

/**
 * @file src/components/home/SectionHeading.tsx
 * @description Consistent section header: accent eyebrow pill, bold title
 * and an optional muted description. Used by every homepage section so the
 * vertical rhythm and hierarchy stay identical site-wide.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "start";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={`${centered ? "mx-auto text-center" : "text-start"} ${className}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-400/10 px-4 py-1.5 text-xs font-medium text-orange-300 sm:text-sm">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-orange-400" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed text-gray-400 sm:text-lg ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
