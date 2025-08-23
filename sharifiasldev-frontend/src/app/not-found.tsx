import { Button } from "@/components/ui/Button";

/**
 * @file src/app/not-found.tsx
 * @description This is the custom 404 error page for the application.
 * Next.js automatically renders this component when a route is not found.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-9xl font-extrabold text-orange-400">404</h1>
      <h2 className="text-4xl font-bold mt-4 text-white">صفحه یافت نشد</h2>
      <p className="mt-4 text-lg text-gray-400 max-w-md">
        متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد. ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه حذف شده باشد.
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary" size="lg">
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  );
}
