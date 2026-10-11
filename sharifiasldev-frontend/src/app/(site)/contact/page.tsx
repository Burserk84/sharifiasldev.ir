import { Metadata } from "next";

// Static data + shared helpers
import { socialLinks } from "@/lib/data";

// Design-system layer (same components the homepage/portfolio use)
import { Button } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import AnimatedUnderline from "@/components/ui/AnimatedUnderline";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/home/Reveal";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "تماس با ما | SharifiaslDev",
  description: "راه های ارتباطی و فرم تماس برای ارسال پروژه یا دریافت مشاوره.",
};

/**
 * @file src/app/(site)/contact/page.tsx
 * @description The redesigned contact page — the homepage as the base model:
 * layered hero (headline + underline + stats + CTAs) above the same
 * glass-card info/form split the homepage contact section uses.
 * Server Component; motion lives in the client children.
 */
export default function ContactPage() {
  return (
    <div>
      {/* Hero Section ======================================================================================= */}
      <PageHero
        eyebrow="تماس با ما"
        title={
          <>
            ایده‌ای در ذهن دارید؟{" "}
            {/* pb-2 pushes the underline swoosh clear of the ی descender */}
            <span className="relative inline-block pb-2">
              <span className="text-orange-400">بسازیمش.</span>
              <AnimatedUnderline />
            </span>
          </>
        }
        description="برای دریافت مشاوره رایگان، ثبت سفارش پروژه یا هر سؤالی که دارید، فرم زیر را پر کنید — در کمتر از ۲۴ ساعت پاسخ می‌دهم."
        stats={[
          { value: "۲۴ ساعت", label: "حداکثر زمان پاسخ‌گویی" },
          { value: "رایگان", label: "مشاوره اولیه و برآورد شفاف" },
          { value: "۴", label: "راه ارتباطی مستقیم" },
        ]}
        actions={
          <>
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              className="glow-accent h-12 w-full rounded-full px-8 sm:w-auto"
            >
              نوشتن پیام
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
      />

      {/* Contact Section ==================================================================================== */}
      <section
        id="contact"
        className="relative overflow-hidden bg-gray-900 py-24 sm:py-32"
      >
        <div
          aria-hidden
          className="absolute -bottom-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[120px]"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="شروع گفت‌وگو"
            title={
              <>
                بیایید <span className="text-gradient">گفت‌وگو کنیم.</span>
              </>
            }
            description="هر سؤالی درباره پروژه، همکاری یا قیمت‌دهی دارید، همین حالا بنویسید؛ هم مشاوره اولیه رایگان است و هم برآورد شفاف می‌گیرید."
          />

          <Reveal delay={0.1} className="mt-14">
            <div className="glass-card grid overflow-hidden rounded-3xl lg:grid-cols-5">
              {/* Info column */}
              <div className="border-b border-white/10 bg-gray-800/40 p-8 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-e lg:border-white/10">
                <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                      className="h-4 w-4 flex-shrink-0 text-orange-400/90"
                    >
                      <path d="M3 4a2 2 0 0 0-2 2v1.168l7.414 4.237a1.25 1.25 0 0 0 1.172 0L17 7.168V6a2 2 0 0 0-2-2H3Zm15 4.307-6.646 3.798a2.75 2.75 0 0 1-2.708 0L1 8.307V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.307Z" />
                    </svg>
                    <span dir="ltr">sharifiasldev@gmail.com</span>
                  </a>
                  <a
                    href="tel:+989****9541"
                    className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-orange-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                      className="h-4 w-4 flex-shrink-0 text-orange-400/90"
                    >
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                      className="h-4 w-4 flex-shrink-0 text-orange-400/90"
                    >
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
                        className="glass-card flex h-11 w-11 items-center justify-center rounded-xl text-gray-300 transition-all hover:border-orange-400/40 hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
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
