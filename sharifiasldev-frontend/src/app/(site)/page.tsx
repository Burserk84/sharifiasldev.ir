import React from "react";
import Image from "next/image";

// API functions to fetch dynamic data from Strapi
import { getPortfolioItems, getProducts, getPublicStrapiURL } from "@/lib/api";
// Static data arrays for content that doesn't change often
import { socialLinks, trustFeatures } from "@/lib/data";
import { extractBlurb } from "@/lib/format";

// All the reusable UI components for the homepage
import { Button } from "@/components/ui/Button";
import PortfolioCard from "@/components/ui/PortfolioCard";
import ProductSlider from "@/components/products/ProductSlider";
import ContactForm from "@/components/forms/ContactForm";

// Homepage-specific building blocks (design-system layer)
import Hero, { type FeaturedProject } from "@/components/home/Hero";
import TechMarquee from "@/components/home/TechMarquee";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/home/Reveal";
import { processTechnologies } from "@/components/ui/PortfolioCard";
import type { PortfolioItem } from "@/lib/definitions";

/**
 * The newest portfolio item, shaped for the hero showcase card.
 */
function pickFeatured(items: PortfolioItem[]): FeaturedProject | null {
  const latest = [...items].sort((a, b) => b.id - a.id)[0];
  if (!latest) return null;
  const { title, slug, technologies, coverImage, description } =
    latest.attributes;
  const url = coverImage?.data?.attributes?.url;
  return {
    title,
    slug,
    image: url ? `${getPublicStrapiURL()}${url}` : null,
    techs: processTechnologies(technologies).slice(0, 4),
    blurb: extractBlurb(description),
  };
}

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
 * @file src/app/(site)/page.tsx
 * @description The redesigned homepage — a Server Component that fetches
 * initial data from Strapi, then composes the sections:
 * Hero → Tech Marquee → About → Portfolio → Products → Trust → Contact.
 * Motion lives in the client children (Reveal / Hero); data stays server-side.
 */
export default async function Home() {
  // Fetch dynamic data from Strapi on the server
  const portfolioItems = await getPortfolioItems();
  const products = await getProducts();

  return (
    <div>
      {/* Hero Section ======================================================================================= */}
      <Hero projectCount={portfolioItems.length} featured={pickFeatured(portfolioItems)} />

      {/* Tech Marquee Section =============================================================================== */}
      <TechMarquee />

      {/* About Section ====================================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900 py-24 sm:py-32">
        <div
          aria-hidden
          className="absolute -top-24 right-1/3 h-80 w-80 rounded-full bg-orange-500/[0.07] blur-[110px]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12">
          <Reveal className="order-2 text-start lg:order-1 lg:col-span-7">
            <SectionHeading
              align="start"
              eyebrow="آشنایی با متخصص شما"
              title={
                <>
                  امیرعلی شریفی اصل:{" "}
                  <span className="text-gradient">توسعه‌دهنده Full-stack</span>
                </>
              }
              className="[&>h2]:mt-0 [&>span]:mb-5"
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
              با بیش از ۳ سال تجربه در دنیای پویای وب، من علاقه‌مند به خلق
              راه‌حل‌هایی هستم که نه تنها زیبا و کارآمد هستند، بلکه تجربه‌ای
              به‌یادماندنی برای کاربران ایجاد می‌کنند. تخصص من در ساخت
              اپلیکیشن‌های سریع و مقیاس‌پذیر با استفاده از React، Node.js و
              تکنولوژی‌های مرتبط است.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {[
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "WordPress",
                "PostgreSQL",
                "Tailwind CSS",
                "Strapi",
                "Socket.IO",
                "Express",
              ].map((tech) => (
                <li
                  key={tech}
                  dir="ltr"
                  className="glass-card rounded-full px-3.5 py-1.5 text-xs font-medium text-gray-200 transition-colors hover:border-orange-400/40 hover:text-orange-300"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <Reveal delay={0.1}>
              <Button
                href="/about"
                variant="secondary"
                className="group mt-8 h-11 rounded-full px-6"
              >
                بیشتر درباره من و چشم‌انداز devora
                <span
                  aria-hidden
                  className="me-2 inline-block transition-transform duration-300 group-hover:-translate-x-1"
                >
                  ←
                </span>
              </Button>
            </Reveal>
          </Reveal>

          {/* Monogram visual with orbiting chips */}
          <Reveal
            delay={0.15}
            className="order-1 mx-auto lg:order-2 lg:col-span-5"
          >
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
          </Reveal>
        </div>
      </section>

      {/* Portfolio Section ==================================================================================== */}
      {portfolioItems.length > 0 && (
        <section className="bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading
              eyebrow="نمونه‌کارها"
              title="پروژه‌هایی که با افتخار تحویل داده‌ام"
              description="کیفیت را در عمل ببینید. نگاهی به بخشی از پروژه‌های موفق بیندازید."
            />
            <div className="mt-14 grid grid-cols-1 gap-8 text-start md:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.slice(0, 3).map((item, index) => (
                <Reveal key={item.id} delay={index * 0.1} className="h-full">
                  <PortfolioCard post={item} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15} className="mt-14 text-center">
              <Button
                href="/portfolio"
                variant="secondary"
                size="lg"
                className="h-12 rounded-full border-white/15 px-8 hover:border-orange-400/50"
              >
                مشاهده همه نمونه کارها
              </Button>
            </Reveal>
          </div>
        </section>
      )}

      {/* Product Section ======================================================================================== */}
      {products.length > 0 && (
        <section className="bg-gradient-to-b from-gray-900 to-gray-800/60 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading
              eyebrow="فروشگاه"
              title="محصولات ما"
              description="نگاهی به جدیدترین افزونه‌ها و قالب‌های ما در فروشگاه بیندازید."
            />
            <Reveal delay={0.1} className="mt-16">
              <ProductSlider products={products} />
            </Reveal>
            <Reveal delay={0.15} className="mt-14 text-center">
              <Button
                href="/products"
                variant="secondary"
                size="lg"
                className="h-12 rounded-full border-white/15 px-8 hover:border-orange-400/50"
              >
                مشاهده همه محصولات در فروشگاه
              </Button>
            </Reveal>
          </div>
        </section>
      )}

      {/* Trust Section =========================================================================================== */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="چرا devora؟"
            title="چرا به ما اعتماد کنید؟"
            description="تعهد ما فراتر از کدنویسی است. ما به ساخت روابط پایدار با مشتریان و ارائه ارزشی واقعی متعهدیم."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-12">
            {/* Feature bento card */}
            <Reveal className="lg:col-span-7">
              <div className="glass-card h-full rounded-3xl p-8 sm:p-10">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {trustFeatures.map((feature, index) => (
                    <li
                      key={feature}
                      className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-orange-400/30"
                    >
                      <span
                        aria-hidden
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed text-gray-300 sm:text-base">
                        {feature}
                      </span>
                      <span className="sr-only">ویژگی {index + 1}</span>
                    </li>
                  ))}
                  {/* Filler tile keeps the last row visually balanced */}
                  <li
                    aria-hidden
                    className="hidden items-center justify-center rounded-2xl border border-dashed border-white/10 p-4 text-sm text-gray-400 sm:flex"
                  >
                    و بیش از این‌ها…
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Image card */}
            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="relative h-full min-h-[300px] overflow-hidden rounded-3xl">
                <Image
                  src="/trust.webp"
                  alt="دست دادن نمادین پس از موفقیت یک پروژه"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"
                />
                <div className="absolute bottom-0 start-0 p-6 sm:p-8">
                  <p className="glass-card inline-flex rounded-full px-4 py-2 text-sm font-medium text-gray-200">
                    ۳ سال تجربه در خدمت پروژه‌های واقعی
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Section ========================================================================================== */}
      <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
        <div
          aria-hidden
          className="absolute -bottom-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[120px]"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="تماس با ما"
            title={
              <>
                ایده‌ای در ذهن دارید؟{" "}
                <span className="text-gradient">بسازیمش.</span>
              </>
            }
            description="برای دریافت مشاوره رایگان یا ثبت سفارش پروژه خود با ما تماس بگیرید."
          />
          <Reveal delay={0.1} className="mt-14">
            <div className="glass-card grid overflow-hidden rounded-3xl lg:grid-cols-5">
              {/* Info column */}
              <div className="border-b border-white/10 bg-gray-800/40 p-8 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-s lg:border-white/10">
                <h3 className="text-2xl font-bold text-gray-100">
                  بیایید گفت‌وگو کنیم
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400 sm:text-base">
                  هر سؤالی درباره پروژه، همکاری یا قیمت‌دهی دارید، همین حالا
                  بنویسید.
                </p>
                <ul className="mt-8 space-y-4 text-sm text-gray-300 sm:text-base">
                  <li className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-400/10 text-orange-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    پاسخ‌گویی در کمتر از ۲۴ ساعت
                  </li>
                  <li className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-400/10 text-orange-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 3.75A.75.75 0 0 1 3.25 3h13.5a.75.75 0 0 1 0 1.5H3.25a.75.75 0 0 1-.75-.75Zm1.5 3.75a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-.75.75h-10a.75.75 0 0 1-.75-.75v-8.5Zm2.5 6a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm5 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    مشاوره اولیه رایگان
                  </li>
                  <li className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-400/10 text-orange-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.44 3.44A.75.75 0 0 1 4 3h12a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-1.13.65L10 12.72l-5.62 4.12A.75.75 0 0 1 3 16.19V4a.75.75 0 0 1 .44-.56Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    برآورد شفاف قیمت و زمان‌بندی
                  </li>
                </ul>

                <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                  <a
                    href="mailto:sharifiasldev@gmail.com"
                    className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-orange-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden className="h-4 w-4 flex-shrink-0 text-orange-400/90">
                      <path d="M3 4a2 2 0 0 0-2 2v1.168l7.414 4.237a1.25 1.25 0 0 0 1.172 0L17 7.168V6a2 2 0 0 0-2-2H3Zm15 4.307-6.646 3.798a2.75 2.75 0 0 1-2.708 0L1 8.307V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.307Z" />
                    </svg>
                    <span dir="ltr">sharifiasldev@gmail.com</span>
                  </a>
                  <a
                    href="tel:+989925539541"
                    className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-orange-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden className="h-4 w-4 flex-shrink-0 text-orange-400/90">
                      <path d="M2.25 3.5A1.25 1.25 0 0 1 3.5 2.25h2.19c.6 0 1.13.42 1.24 1.01l.62 3.1a1.25 1.25 0 0 1-.55 1.28l-1.3.88a11.5 11.5 0 0 0 5.27 5.27l.88-1.3a1.25 1.25 0 0 1 1.28-.55l3.1.62c.59.11 1.01.64 1.01 1.24v2.19a1.25 1.25 0 0 1-1.25 1.25A15.25 15.25 0 0 1 2.25 3.5Z" />
                    </svg>
                    <span dir="ltr">+98 992 553 9541</span>
                  </a>
                  <a
                    href="https://t.me/sharifiasl_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-orange-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden className="h-4 w-4 flex-shrink-0 text-orange-400/90">
                      <path d="M18.5 3.5 1.9 9.9c-.9.35-.88 1.63.03 1.95l4.1 1.44 1.58 4.68c.25.74 1.2.93 1.72.34l2.2-2.5 4.2 3.1c.6.45 1.47.12 1.63-.6l2.4-11.9c.17-.86-.66-1.6-1.5-1.26ZM7.7 12.6l7.6-5.4c.3-.22.62.18.37.43l-5.53 5.5-.22 2.9-2.22-3.43Z" />
                    </svg>
                    <span dir="ltr">@sharifiasl_dev</span>
                  </a>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-400">
                    یا از این طریق‌ها در ارتباط باشید:
                  </p>
                  <div className="mt-4 flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="glass-card flex h-11 w-11 items-center justify-center rounded-xl text-gray-300 transition-all hover:border-orange-400/40 hover:text-orange-400"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form column */}
              <div className="p-8 sm:p-10 lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
