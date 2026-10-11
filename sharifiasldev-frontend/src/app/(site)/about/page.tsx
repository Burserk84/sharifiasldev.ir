import { Metadata } from "next";

// Static data + shared helpers
import { socialLinks, timelineData } from "@/lib/data";
import { toPersianDigits } from "@/lib/format";

// Design-system layer (same components the homepage/portfolio use)
import { Button } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import AnimatedUnderline from "@/components/ui/AnimatedUnderline";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/home/Reveal";
import TimelineSection from "@/components/about/TimelineSection";
import DevoraSection from "@/components/about/DevoraSection";

export const metadata: Metadata = {
  title: "درباره من | SharifiaslDev",
  description:
    "آشنایی با امیرعلی شریفی اصل، توسعه‌دهنده فول-استک و چشم‌انداز آینده تیم Devora.",
};

/** Orbiting chips around the About monogram (decorative). Staggered delays so
 *  they don't bob in unison; side chips hide below sm where margins get tight. */
const orbitChips = [
  { label: "React", className: "-top-5 -right-10", delay: "0s" },
  { label: "Node.js", className: "-bottom-4 -left-12", delay: "1.5s" },
  { label: "WordPress", className: "top-1/2 -left-20 hidden sm:block", delay: "3s" },
  { label: "Next.js", className: "-bottom-5 -right-10", delay: "0.75s" },
  { label: "TypeScript", className: "-top-5 -left-10", delay: "2.25s" },
  { label: "Strapi", className: "top-1/2 -right-16 hidden sm:block", delay: "3.75s" },
];

/**
 * @file src/app/(site)/about/page.tsx
 * @description The redesigned about page — the homepage as the base model:
 * layered hero (headline + underline + stats + monogram), SectionHeading-led
 * Journey and Devora-vision sections with the shared card vocabulary, and a
 * closing contact CTA. Server Component; motion lives in the client children.
 */
export default function AboutPage() {
  /** All stats are derived from real content — no placeholder figures. */
  const stats = [
    { value: `${toPersianDigits(3)}+`, label: "سال تجربه عملی" },
    {
      value: toPersianDigits(timelineData.length),
      label: "ایستگاه در مسیر یادگیری",
    },
    { value: "۱۰۰٪", label: "تمرکز بر کیفیت و ارائه" },
  ];

  return (
    <div>
      {/* Hero Section ======================================================================================= */}
      <PageHero
        eyebrow="درباره من"
        title={
          <>
            سفری در دنیای{" "}
            {/* pb-2 pushes the underline swoosh clear of the descender */}
            <span className="relative inline-block pb-2">
              <span className="text-orange-400">کد</span>
              <AnimatedUnderline />
            </span>
          </>
        }
        description="هر خط کد، داستانی از یادگیری، چالش و خلاقیت است. با امیرعلی شریفی اصل همراه شوید تا مسیر شکل‌گیری یک توسعه‌دهنده Full-stack و چشم‌انداز تیم Devora را کشف کنید."
        stats={stats}
        actions={
          <>
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="glow-accent h-12 w-full rounded-full px-8 sm:w-auto"
            >
              شروع گفت‌وگو
            </Button>
            <Button
              href="/portfolio"
              variant="secondary"
              size="lg"
              className="h-12 w-full rounded-full border-white/15 px-8 hover:border-orange-400/50 sm:w-auto"
            >
              مشاهده نمونه‌کارها
            </Button>
          </>
        }
      >
        {/* Monogram visual with orbiting chips (homepage's About visual) */}
        <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-orange-300 opacity-30 blur-2xl"
          />
          <div className="glass-card glow-accent relative flex h-full w-full items-center justify-center rounded-full bg-gray-900/80">
            <span className="text-gradient text-7xl font-black sm:text-8xl">
              AS
            </span>
          </div>
          {orbitChips.map((chip) => (
            <span
              key={chip.label}
              aria-hidden
              className={`glass-card animate-float absolute ${chip.className} rounded-full px-3.5 py-1.5 text-xs font-medium text-gray-200`}
              dir="ltr"
              style={{ animationDelay: chip.delay }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Journey (Timeline) Section ======================================================================== */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="مسیر من"
            title="هر خط کد، داستانی از یادگیری"
            description="از اولین تگ‌های HTML تا اولین سکوی پرتاب — ایستگاه‌هایی که این مسیر را ساختند."
          />
          <TimelineSection items={timelineData} />
        </div>
      </section>

      {/* Devora Vision Section ============================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900 py-24 sm:py-32">
        <div
          aria-hidden
          className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-orange-500/[0.07] blur-[110px]"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="چشم‌انداز devora"
            title={
              <>
                از من به ما: <span className="text-gradient">تولد Devora</span>
              </>
            }
            description="با افزایش تجربه و پیچیده‌تر شدن پروژه‌ها، نیاز به همکاری و هم‌افزایی برای ارائه راه‌حل‌های بزرگتر و جامع‌تر احساس شد."
          />
          <DevoraSection />
        </div>
      </section>

      {/* Contact CTA Section =============================================================================== */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div
          aria-hidden
          className="absolute -bottom-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[120px]"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="تماس با ما"
            title={
              <>
                پروژه بعدی، شما باشید{" "}
                <span className="text-gradient">بسازیمش.</span>
              </>
            }
            description="برای دریافت مشاوره رایگان یا ثبت سفارش پروژه خود همین حالا پیام بدهید."
          />
          <Reveal
            delay={0.1}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="glow-accent h-12 rounded-full px-8"
            >
              درخواست مشاوره رایگان
            </Button>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="glass-card flex h-11 w-11 items-center justify-center rounded-xl text-gray-300 transition-all hover:border-orange-400/40 hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
