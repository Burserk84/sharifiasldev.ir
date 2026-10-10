"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import AnimatedUnderline from "@/components/ui/AnimatedUnderline";

/** Converts Latin digits to Persian digits for display. */
const toPersianDigits = (value: number) =>
  String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

/** Floating stack chips around the code card (decorative).
 *  Left-side chips only appear on 2xl (≥1536px) where the container has real
 *  room outside the card — at narrower widths they got clipped at the
 *  viewport edge (sm:!hidden overrides the template's sm:inline-block). */
const floatingChips = [
  { label: "React", className: "-top-4 -right-6" },
  { label: "Node.js", className: "-bottom-4 -left-8 sm:!hidden 2xl:!inline-block" },
  { label: "Next", className: "-bottom-4 -right-8 sm:!hidden 2xl:!inline-block" },
  { label: "TypeScript", className: "top-1/6 -left-12 sm:!hidden 2xl:!inline-block" },
];

/**
 * @file src/components/home/Hero.tsx
 * @description The redesigned homepage hero: layered backdrop (grid, glow
 * orbs, noise), editorial headline with the signature underline, dual CTA,
 * a live stats row and a glass "signature code" card.
 */
export default function Hero({ projectCount = 0 }: { projectCount?: number }) {
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
            کدنویسی با امضای,{" "}
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

        {/* ── Signature code card ───────────────────────────────────── */}
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
          {/* Floating stack chips */}
          {floatingChips.map((chip) => (
            <span
              key={chip.label}
              aria-hidden
              className={`glass-card animate-float absolute z-10 hidden rounded-full px-3.5 py-1.5 text-xs font-medium text-gray-200 sm:inline-block ${chip.className}`}
            >
              {chip.label}
            </span>
          ))}

          <div className="glass-card glow-accent relative rounded-2xl shadow-2xl shadow-orange-500/10">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400/80" />
              <span
                dir="ltr"
                className="ms-auto font-mono text-xs text-gray-500"
              >
                signature.ts
              </span>
            </div>

            {/* Code */}
            <pre
              dir="ltr"
              className="overflow-x-auto px-6 py-6 text-left font-mono text-[0.8rem] leading-7 sm:text-sm"
            >
              <code>
                <span className="text-orange-400">const</span>{" "}
                <span className="text-gray-200">amirali</span>{" "}
                <span className="text-gray-500">=</span>{" "}
                <span className="text-gray-500">{"{"}</span>
                {"\n  "}
                <span className="text-gray-300">role</span>
                <span className="text-gray-500">:</span>{" "}
                <span className="text-orange-300">
                  &quot;Full-Stack Developer&quot;
                </span>
                <span className="text-gray-500">,</span>
                {"\n  "}
                <span className="text-gray-300">stack</span>
                <span className="text-gray-500">:</span>{" "}
                <span className="text-gray-500">[</span>
                <span className="text-orange-300">&quot;Next.js&quot;</span>
                <span className="text-gray-500">,</span>{" "}
                <span className="text-orange-300">&quot;Node.js&quot;</span>
                <span className="text-gray-500">]</span>
                <span className="text-gray-500">,</span>
                {"\n  "}
                <span className="text-gray-300">focus</span>
                <span className="text-gray-500">:</span>{" "}
                <span className="text-orange-300">
                  &quot;clean • fast • scalable&quot;
                </span>
                <span className="text-gray-500">,</span>
                {"\n  "}
                <span className="text-gray-300">sign</span>
                <span className="text-gray-500">:</span>{" "}
                <span className="text-orange-400">()</span>{" "}
                <span className="text-orange-400">=&gt;</span>{" "}
                <span className="text-gray-200">ship</span>
                <span className="text-gray-500">(</span>
                <span className="text-gray-200">ideas</span>
                <span className="text-gray-500">)</span>
                <span className="text-gray-500">,</span>
                {"\n"}
                <span className="text-gray-500">{"}"}</span>
                <span className="text-gray-500">;</span>
                {"\n"}
                <span className="italic text-gray-500">
                  // امضای من: کیفیت، نه فقط کد
                </span>
                <span className="ms-1 inline-block h-4 w-[0.55ch] animate-pulse bg-orange-400 align-middle" />
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
