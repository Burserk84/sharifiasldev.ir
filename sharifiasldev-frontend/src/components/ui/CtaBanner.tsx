import { Button } from "./Button";

export default function CtaBanner() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 my-16 text-center">
      <h3 className="text-2xl font-bold text-white">
        آیا برای پروژه‌ی خود به کمک نیاز دارید؟
      </h3>
      <p className="mt-2 text-gray-400 max-w-xl mx-auto">
        تیم ما در Devora آماده است تا ایده‌های شما را به راه‌حل‌های دیجیتال
        قدرتمند تبدیل کند.
      </p>
      <div className="mt-6">
        <Button
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
