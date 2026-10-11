import { Metadata } from "next";

// API + shared helpers
import { getPortfolioItems, getPublicStrapiURL } from "@/lib/api";
import { socialLinks } from "@/lib/data";
import { extractBlurb } from "@/lib/format";
import { processTechnologies } from "@/components/ui/PortfolioCard";
import type { PortfolioItem } from "@/lib/definitions";

// Design-system layer (same components the homepage uses)
import { Button } from "@/components/ui/Button";
import PortfolioCard from "@/components/ui/PortfolioCard";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/home/Reveal";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import type { FeaturedProject } from "@/components/home/FeaturedProjectCard";

export const metadata: Metadata = {
  title: "نمونه کارها | SharifiaslDev",
  description:
    "مجموعه‌ای از پروژه‌های موفق توسعه وب انجام شده توسط امیرعلی شریفی اصل.",
};

/**
 * The newest portfolio item, shaped for the hero showcase card — same rule
 * the homepage uses, so both pages always spotlight the same project.
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

/** Unique technologies/tools across every project — feeds a real hero stat. */
function countUniqueTechs(items: PortfolioItem[]): number {
  const techs = new Set<string>();
  for (const item of items) {
    for (const tech of processTechnologies(item.attributes.technologies)) {
      if (tech) techs.add(tech);
    }
  }
  return techs.size;
}

/**
 * @file src/app/(site)/portfolio/page.tsx
 * @description The redesigned portfolio page — the homepage as the base
 * model: hero (layered backdrop + live stats + newest-project showcase),
 * SectionHeading + animated card grid, a styled empty state, and a closing
 * contact CTA. Server Component; motion lives in the client children.
 */
export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();
  const featured = pickFeatured(portfolioItems);
  const techCount = countUniqueTechs(portfolioItems);

  return (
    <div>
      {/* Hero Section ======================================================================================= */}
      <PortfolioHero
        projectCount={portfolioItems.length}
        techCount={techCount}
        featured={featured}
      />

      {/* Projects Section =================================================================================== */}
      <section className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="همه پروژه‌ها"
            title="هر پروژه، از ایده تا استقرار"
            description="روی هر کارت کلیک کنید تا جزئیات فنی، ویژگی‌ها و گالری تصاویر پروژه را ببینید."
          />

          {portfolioItems.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-8 text-start md:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((item, index) => (
                <Reveal
                  key={item.id}
                  delay={Math.min(index, 5) * 0.1}
                  className="h-full"
                >
                  <PortfolioCard post={item} />
                </Reveal>
              ))}
            </div>
          ) : (
            /* Empty state — a real card with a way forward, not a bare line */
            <Reveal className="mt-14">
              <div className="glass-card mx-auto max-w-2xl rounded-3xl p-10 text-center">
                <span
                  aria-hidden
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 4.25A2.25 2.25 0 0 1 3.25 2h3.586a1.5 1.5 0 0 1 1.06.44l1.598 1.598a.75.75 0 0 0 1.06 0l1.598-1.598A1.5 1.5 0 0 1 12.164 2h3.586A2.25 2.25 0 0 1 18 4.25v10.5A2.25 2.25 0 0 1 15.75 17h-11.5A2.25 2.25 0 0 1 2 14.75V4.25Zm1.5 0v10.5c0 .138.112.25.25.25h11.5a.25.25 0 0 0 .25-.25V4.25a.25.25 0 0 0-.25-.25h-3.586a.25.25 0 0 0-.177.073l-1.598 1.598a2.25 2.25 0 0 1-3.182 0l-1.598-1.598a.25.25 0 0 0-.177-.073H3.25a.25.25 0 0 0-.25.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <h3 className="mt-5 text-xl font-bold text-gray-100">
                  هنوز نمونه‌کاری منتشر نشده است
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-400 sm:text-base">
                  در حال آماده‌سازی پروژه‌های جدید هستم — تا آن زمان می‌توانید
                  برای گفت‌وگو درباره پروژه خود پیام بدهید.
                </p>
                <div className="mt-6">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    className="rounded-full px-8"
                  >
                    شروع گفت‌وگو
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Contact CTA Section ================================================================================ */}
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
