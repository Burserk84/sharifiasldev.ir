import Link from "next/link";
import Image from "next/image";
import { toPersianDigits } from "@/lib/format";

/**
 * The newest portfolio project, resolved server-side in the page and handed
 * to the showcase card so it renders real content (real screenshot, real
 * stack, real description) instead of placeholder copy.
 */
export interface FeaturedProject {
  title: string;
  slug: string | null;
  image: string | null;
  techs: string[];
  blurb: string | null;
}

/**
 * @file src/components/home/FeaturedProjectCard.tsx
 * @description The layered "latest project" showcase card shared by the
 * homepage hero and the portfolio page hero. Renders a depth plate plus a
 * glass card with the real screenshot, stack chips and a view-project footer.
 * Expects its immediate parent to be `relative` (the depth plate uses
 * absolute inset-0 against it).
 */
export default function FeaturedProjectCard({
  project,
  projectCount = 0,
}: {
  project: FeaturedProject;
  projectCount?: number;
}) {
  return (
    <>
      {/* Depth plate — the "stack" of projects behind this one */}
      <div
        aria-hidden
        className="glass-card absolute inset-0 hidden translate-x-4 translate-y-5 rotate-3 rounded-2xl opacity-40 sm:block"
      />

      <Link
        href={project.slug ? `/portfolio/${project.slug}` : "/portfolio"}
        className="group relative block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
      >
        <article className="glass-card glow-accent overflow-hidden rounded-2xl shadow-2xl shadow-orange-500/10 transition-colors duration-300 group-hover:border-orange-400/40">
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
            <span className="text-xs font-medium text-gray-300">
              آخرین پروژه منتشرشده
            </span>
            <span dir="ltr" className="font-mono text-xs text-gray-500">
              {toPersianDigits(projectCount)}+
            </span>
          </div>

          {/* Real screenshot */}
          <div className="relative aspect-video w-full overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="bg-grid absolute inset-0 bg-gray-900/60" />
            )}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"
            />
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6">
            <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-orange-400 sm:text-2xl">
              {project.title}
            </h3>

            {project.blurb && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">
                {project.blurb}
              </p>
            )}

            {project.techs.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <li
                    key={tech}
                    dir="ltr"
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300 transition-colors group-hover:border-orange-400/30"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-sm font-semibold text-orange-300">
                مشاهده پروژه
              </span>
              <span
                aria-hidden
                className="text-orange-400 transition-transform duration-300 group-hover:-translate-x-1.5"
              >
                ←
              </span>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
}
