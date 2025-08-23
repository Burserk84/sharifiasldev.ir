import Link from "next/link";
export default function AuthorCard() {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-right h-full flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-white mb-4">درباره نویسنده</h3>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-orange-400">AS</span>
          </div>
          <div>
            <p className="font-bold text-white">امیرعلی شریفی اصل</p>
            <p className="text-sm text-gray-400">توسعه‌دهنده فول-استک</p>
          </div>
        </div>
        <p className="text-gray-400 mt-4 mr-2">
          علاقه‌مند به اشتراک‌گذاری دانش و تجربیات در حوزه وب. با چشم‌انداز ساخت
          تیم Devora برای ارائه راه‌حل‌های نوآورانه.
        </p>
      </div>
      <Link
        href="/about"
        className="text-sm text-orange-400 hover:underline mt-4"
      >
        بیشتر بخوانید &larr;
      </Link>
    </div>
  );
}
