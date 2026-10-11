"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * @file src/components/ui/PageHero.tsx
 * @description Shared inner-page hero built on the homepage/portfolio hero
 * recipe: layered backdrop (grid + glow orbs + noise), accent eyebrow pill
 * with a ping dot, editorial H1 (pass the accent word wrapped with
 * AnimatedUnderline), muted intro, CTA row and a live stats strip. An
 * optional `children` slot fills the showcase column on the right (like the
 * homepage monogram / portfolio featured card); without it the copy spans
 * the full grid width.
 */
export type PageHeroStat = { value: string; label: string };

export default function PageHero({
  eyebrow,
  title,
  description,
  stats = [],
  actions,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  stats?: PageHeroStat[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
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

  return (
    <section className="noise-overlay relative overflow-hidden">
      {/* ── Layered backdrop (same system as the homepage hero) ─────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 right-1/4 h-[34rem] w-[34rem] rounded-full bg-orange-500/[0.13] blur-[130px]" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-orange-600/[0.10] blur-[120px]" />
      </div>

      {/* No forced full-viewport height: the sections below stay reachable
          within the first scroll (same rule as the portfolio hero). */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:py-24 lg:grid-cols-12 lg:py-28">
        {/* ── Copy column ───────────────────────────────────────────── */}
        <div
          className={
            children ? "lg:col-span-7" : "lg:col-span-12 lg:max-w-3xl"
          }
        >
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-sm text-orange-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-400" />
              </span>
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400"
            >
              {description}
            </motion.p>
          )}

          {actions && (
            <motion.div
              {...fadeUp(0.3)}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            >
              {actions}
            </motion.div>
          )}

          {stats.length > 0 && (
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
          )}
        </div>

        {/* ── Showcase column (optional) ────────────────────────────── */}
        {children && (
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
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
