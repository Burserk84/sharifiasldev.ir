import { Button } from "@/components/ui/Button";
export default function CtaCard() {
  return (
    <div className="bg-orange-400 p-6 rounded-lg text-right text-gray-900">
      <h3 className="font-bold text-2xl">پروژه‌ای در ذهن دارید؟</h3>
      <p className="my-2">برای دریافت مشاوره رایگان و شروع پروژه بعدی خود با ما تماس بگیرید.</p>
      <Button href="/contact" variant="secondary" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white mt-4">
        تماس با ما
      </Button>
    </div>
  );
}