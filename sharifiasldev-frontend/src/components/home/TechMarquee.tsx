/**
 * @file src/components/home/TechMarquee.tsx
 * @description An infinite, seamlessly-looping strip of the core tech stack.
 * Pure CSS animation (no client JS), pauses on hover and honors
 * prefers-reduced-motion via globals.css.
 */

const techs = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "WordPress",
  "Strapi",
  "MySQL",
  "PostgreSQL",
  "Socket.IO",
  "Framer Motion",
  "REST API",
];

export default function TechMarquee() {
  const row = (key: number, hidden: boolean) => (
    <ul
      key={key}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pe-10"
    >
      {techs.map((tech) => (
        <li
          key={tech}
          className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-gray-400 transition-colors hover:text-gray-200"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-orange-400/70"
          />
          <span dir="ltr">{tech}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="تکنولوژی‌های مورد استفاده"
      className="group relative border-y border-white/5 bg-gray-900/60 py-6"
    >
      <div className="mask-fade-x overflow-hidden">
        <div
          dir="ltr"
          className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
        >
          {row(0, false)}
          {row(1, true)}
        </div>
      </div>
    </section>
  );
}
