import { Button } from "@/components/ui/Button";
export default function CtaCard() {
  return (
    <div className="bg-orange-400 p-6 rounded-lg text-right text-gray-900">
      <h3 className="text-2xl font-bold">
        آیا برای پروژه‌ی خود به کمک نیاز دارید؟
      </h3>
      <p className="mt-2 max-w-xl mx-auto">
        تیم ما در Devora آماده است تا ایده‌های شما را به راه‌حل‌های دیجیتال
        قدرتمند تبدیل کند.
      </p>
      <div className="mt-6">
        <Button
          className="w-full"
          href="https://devorastudio.ir"
          variant="primary"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          با تیم ما در Devora تماس بگیرید
        </Button>
      </div>
    </div>
  );
}
