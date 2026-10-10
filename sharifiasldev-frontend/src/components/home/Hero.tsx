"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import AnimatedUnderline from "@/components/ui/AnimatedUnderline";

/** Converts Latin digits to Persian digits for display. */
const toPersianDigits = (value: number) =>
  String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

/**
 * The newest portfolio project, resolved server-side in page.tsx and handed
 * to the hero so the showcase card renders real content (real screenshot,
 * real stack, real description) instead of placeholder copy.
 */
export interface FeaturedProject {
  title: string;
  slug: string | null;
  image: string | null;
  techs: string[];
  blurb: string | null;
}

/**
 * @file src/components/home/Hero.tsx
 * @description The homepage hero: layered backdrop (grid, glow orbs, noise),
 * editorial headline with the signature underline, dual CTA, a live stats
 * row, and a showcase card that presents the newest real project from
 * Strapi (screenshot + stack + description) as a layered card stack.
 */
export default function Hero({
  projectCount = 0,
  featured = null,
}: {
  projectCount?: number;
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
    { value: "۱۰۰٪", label: "تمرکز بر کیفیت و ارائه" },
  ];

  return (
    <section className="noise-overlay relative overflow-hidden">
      {/* ── Layered backdrop ─────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 right-1/4 h-[34rem] w-[34rem] rounded-full bg-orange-500/[0.13] blur-[130px]" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-orange-600/[0.10] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-12 lg:py-28">
        {/* ── Copy column ───────────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-sm text-orange-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-400" />
              </span>
              آماده پذیرش پروژه جدید
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            کدنویسی با امضای{" "}
            <span className="relative inline-block">
              <span className="text-orange-400">اصالت</span>
              <AnimatedUnderline />
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400"
          >
            توسعه‌دهنده Full-Stack با ۳ سال تجربه در ساخت وب‌سایت‌ها و
            اپلیکیشن‌های مدرن — از ایده تا استقرار.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              className="glow-accent h-12 w-full rounded-full px-8 sm:w-auto"
            >
              درخواست مشاوره پروژه
            </Button>
            <Button
              href="/portfolio"
              variant="secondary"
              size="lg"
              className="h-12 w-full rounded-full border-white/15 px-8 hover:border-orange-400/50 sm:w-auto"
            >
              مشاهده نمونه‌کارها
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

        {/* ── Latest-project showcase (real Strapi content) ─────────── */}
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
            {/* Depth plate — the "stack" of projects behind this one */}
            <div
              aria-hidden
              className="glass-card absolute inset-0 hidden translate-x-4 translate-y-5 rotate-3 rounded-2xl opacity-40 sm:block"
            />

            <Link
              href={featured.slug ? `/portfolio/${featured.slug}` : "/portfolio"}
              className="group relative block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
            >
              <article className="glass-card glow-accent overflow-hidden rounded-2xl shadow-2xl shadow-orange-500/10 transition-colors duration-300 group-hover:border-orange-400/40">
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                  <span className="text-xs font-medium text-gray-300">
                    آخرین پروژه منتشرشده
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono text-xs text-gray-500"
                  >
                    {toPersianDigits(projectCount)}+
                  </span>
                </div>

                {/* Real screenshot */}
                <div className="relative aspect-video w-full overflow-hidden">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
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
                    {featured.title}
                  </h3>

                  {featured.blurb && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">
                      {featured.blurb}
                    </p>
                  )}

                  {featured.techs.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {featured.techs.map((tech) => (
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
          </motion.div>
        )}
      </div>
    </section>
  );
}
