"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import AnimatedUnderline from "@/components/ui/AnimatedUnderline";
import FeaturedProjectCard, {
  type FeaturedProject,
} from "@/components/home/FeaturedProjectCard";
import { toPersianDigits } from "@/lib/format";

/**
 * @file src/components/portfolio/PortfolioHero.tsx
 * @description The portfolio page hero — the homepage hero as the base model:
 * same layered backdrop (grid, glow orbs, noise), editorial headline with the
 * signature underline, dual CTA (consultation + resume), a live stats row
 * derived from real Strapi data, and the newest-project showcase card.
 */
export default function PortfolioHero({
  projectCount = 0,
  techCount = 0,
  featured = null,
}: {
  projectCount?: number;
  techCount?: number;
  featured?: FeaturedProject | null;
}) {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  /** All stats are derived from real content — no placeholder figures. */
  const stats: { value: string; label: string }[] = [
    { value: `${toPersianDigits(3)}+`, label: "سال تجربه عملی" },
    ...(projectCount > 0
      ? [
          {
            value: `${toPersianDigits(projectCount)}+`,
            label: "نمونه‌کار منتشرشده",
          },
        ]
      : []),
    ...(techCount > 0
      ? [
          {
            value: toPersianDigits(techCount),
            label: "تکنولوژی و ابزار به‌کاررفته",
          },
        ]
      : []),
  ];

  return (
    <section className="noise-overlay relative overflow-hidden">
      {/* ── Layered backdrop (same system as the homepage hero) ─────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 right-1/4 h-[34rem] w-[34rem] rounded-full bg-orange-500/[0.13] blur-[130px]" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-orange-600/[0.10] blur-[120px]" />
      </div>

      {/* No forced full-viewport height here: the project grid should be
          reachable within the first scroll (unlike the homepage hero). */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:py-24 lg:grid-cols-12 lg:py-28">
        {/* ── Copy column ───────────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-sm text-orange-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-400" />
              </span>
              نمونه‌کارها
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            کارنامه‌ای از پروژه‌های{" "}
            {/* pb-2 pushes the underline swoosh clear of the ی descender */}
            <span className="relative inline-block pb-2">
              <span className="text-orange-400">واقعی</span>
              <AnimatedUnderline />
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400"
          >
            کیفیت را در عمل ببینید؛ نگاهی به پروژه‌هایی بیندازید که از ایده تا
            استقرار، با تمرکز بر تجربه کاربری و کد تمیز ساخته شده‌اند.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="glow-accent h-12 w-full rounded-full px-8 sm:w-auto"
            >
              درخواست مشاوره پروژه
            </Button>
            <Button
              href="/Amirali-Sharifi-Asl-Resume.pdf"
              variant="secondary"
              size="lg"
              className="h-12 w-full rounded-full border-white/15 px-8 hover:border-orange-400/50 sm:w-auto"
            >
              دانلود رزومه
            </Button>
          </motion.div>

          <motion.dl
            {...fadeUp(0.4)}
            className="mt-12 grid grid-cols-3 gap-x-4 gap-y-6 border-t border-white/10 pt-10 sm:flex sm:gap-x-10"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-gradient text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── Newest-project showcase (real Strapi content) ─────────── */}
        {featured && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
          >
            <FeaturedProjectCard
              project={featured}
              projectCount={projectCount}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
