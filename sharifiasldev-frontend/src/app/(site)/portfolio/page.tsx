import { getPortfolioItems } from "@/lib/api";
import PortfolioCard from "@/components/ui/PortfolioCard";
import type { PortfolioItem } from "@/lib/definitions";
import { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "نمونه کارها | SharifiaslDev",
  description:
    "مجموعه‌ای از پروژه‌های موفق توسعه وب انجام شده توسط امیرعلی شریفی اصل.",
};

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white">نمونه کارها</h1>
        <p className="mt-4 text-lg text-gray-400">
          کیفیت را در عمل ببینید. نگاهی به بخشی از پروژه‌های موفق ما بیندازید.
        </p>
        <div className="mt-6">
          <Button href="/Amirali-Sharifi-Asl-Resume.pdf" variant="secondary">
            دانلود رزومه
          </Button>
        </div>
      </div>

      {portfolioItems && portfolioItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item: PortfolioItem) => (
            // CORRECTED: Pass the entire 'item' object as the 'post' prop
            <PortfolioCard key={item.id} post={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          در حال حاضر نمونه کاری برای نمایش وجود ندارد.
        </p>
      )}
    </div>
  );
}
