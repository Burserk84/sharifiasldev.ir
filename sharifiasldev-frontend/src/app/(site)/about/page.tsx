import { Metadata } from "next";
import { timelineData } from "@/lib/data";
import TimelineSection from "@/components/about/TimelineSection";
export const metadata: Metadata = {
  title: "درباره من | SharifiaslDev",
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
    </div>
  );
}
