import { Button } from "@/components/ui/Button";
import { Metadata } from "next";
import { timelineData } from "@/lib/data";
import TimelineSection from "@/components/about/TimelineSection";
import DevoraSection from "@/components/about/DevoraSection";
export const metadata: Metadata = {
  title: "درباره ما | SharifiaslDev",
  description:
    "آشنایی با امیرعلی شریفی اصل، توسعه‌دهنده فول-استک و چشم‌انداز آینده تیم Devora.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Section 1: Hero */}
      <section className="text-center py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-white">
            سفری در دنیای کد
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            هر خط کد، داستانی از یادگیری، چالش و خلاقیت است. با امیرعلی شریفی
            اصل همراه شوید تا مسیر شکل‌گیری یک توسعه‌دهنده Full-stack و
            چشم‌انداز تیم Devora را کشف کنید.
          </p>
        </div>
      </section>

      {/* Section 2: The Journey (Timeline) */}
      <TimelineSection items={timelineData} />

      {/* Section 3: The Vision for Devora */}
      <DevoraSection />

      {/* Section 4: Call to Action */}
      <section className="py-24 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">داستان پروژه شما چیست؟</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            هدف مشترک ما تبدیل ایده‌های شما به واقعیت‌های دیجیتال است.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button href="/contact" variant="primary" size="lg">
              صحبت با ما برای پروژه شما
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg">
              خدمات و نمونه کارها
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
