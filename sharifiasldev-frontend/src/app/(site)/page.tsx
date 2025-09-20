import React from "react";
import Link from "next/link";
import Image from "next/image";

// API functions to fetch dynamic data from Strapi
import { getPortfolioItems, getProducts } from "@/lib/api";
// Static data arrays for content that doesn't change often
import { trustFeatures } from "@/lib/data";

// All the reusable UI components for the homepage
import { Button } from "@/components/ui/Button";
import AnimatedUnderline from "@/components/ui/AnimatedUnderline";
import PortfolioCard from "@/components/ui/PortfolioCard";
import ProductSlider from "@/components/products/ProductSlider";
import ContactForm from "@/components/forms/ContactForm";

/**
 * @file src/app/(site)/page.tsx
 * @description The main component for the homepage.
 * This is a Server Component that fetches initial data from Strapi
 * before sending the page to the client.
 */
export default async function Home() {
  // Fetch dynamic data from Strapi on the server
  const portfolioItems = await getPortfolioItems();
  const products = await getProducts();

  return (
    <div>
      {/* Hero Section ======================================================================================= */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center -mt-20 px-6">
        <h1 className="text-5xl md:text-7xl font-bold">
          کدنویسی با امضای،{" "}
          <span className="relative inline-block">
            <span className="text-orange-400">اصالت</span>
            <AnimatedUnderline />
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl">
          توسعه‌دهنده Full-Stack با ۳ سال تجربه در ساخت وب‌سایت‌ها و
          اپلیکیشن‌های مدرن
        </p>
        <div className="flex gap-4 mt-8">
          <Button href="/products" variant="primary" size="lg">
            مشاهده فروشگاه
          </Button>
          <Button href="https://devorastudio.ir" variant="secondary" size="lg">
            خدمات
          </Button>
        </div>
      </section>

      {/* About Section ======================================================================================== */}
      <section className="bg-gray-800 py-20 sm:py-32">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6">
          <div className="text-right max-w-2xl">
            <h2 className="text-lg font-semibold text-orange-400">
              آشنایی با متخصص شما
            </h2>
            <h3 className="text-4xl font-bold mt-2 text-gray-100">
              امیرعلی شریفی اصل:{" "}
              <span className="text-white">توسعه‌دهنده Full-stack</span>
            </h3>
            <p className="mt-4 text-gray-400 leading-relaxed">
              با بیش از ۳ سال تجربه در دنیای پویای وب، من علاقه‌مند به خلق
              راه‌حل‌هایی هستم که نه تنها زیبا و کارآمد هستند، بلکه تجربه‌ای
              به‌یادماندنی برای کاربران ایجاد می‌کنند. تخصص من در ساخت
              اپلیکیشن‌های سریع و مقیاس‌پذیر با استفاده از React، Node.js و
              تکنولوژی‌های مرتبط است.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 text-orange-400 hover:text-orange-500 transition-colors font-semibold"
            >
              بیشتر درباره من و چشم انداز devora بدانید &larr;
            </Link>
          </div>
          <div className="flex-shrink-0 w-60 h-60 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-9xl font-bold text-orange-400">AS</span>
          </div>
        </div>
      </section>

      {/* Portfolio Section ================================================================================== */}
      <section className="bg-gray-900 py-20 sm:py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">نمونه کارها</h2>
          <p className="mt-4 text-lg text-gray-400">
            کیفیت را در عمل ببینید. نگاهی به بخشی از پروژه‌های موفق ما بیندازید.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-right">
            {portfolioItems.slice(0, 2).map((item) => (
              <PortfolioCard key={item.id} post={item} />
            ))}
          </div>
          <div className="mt-12">
            <Button href="/portfolio" variant="secondary" size="lg">
              مشاهده همه نمونه کارها
            </Button>
          </div>
        </div>
      </section>

      {/* Product Section ====================================================================================== */}
      <section className="bg-gray-800 py-20 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">محصولات ما</h2>
            <p className="mt-4 text-lg text-gray-400">
              نگاهی به جدیدترین افزونه‌ها و قالب‌های ما در فروشگاه بیندازید.
            </p>
          </div>
          <div className="mt-16">
            <ProductSlider products={products} />
          </div>
          <div className="mt-12 text-center">
            <Button href="/products" variant="secondary" size="lg">
              مشاهده همه محصولات در فروشگاه
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section ======================================================================================== */}
      <section className="bg-gray-900 py-20 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-right">
              <h2 className="text-4xl font-bold">چرا به ما اعتماد کنید؟</h2>
              <p className="mt-4 text-lg text-gray-400 leading-relaxed">
                تعهد ما فراتر از کدنویسی است. ما به ساخت روابط پایدار با مشتریان
                و ارائه ارزشی واقعی متعهدیم.
              </p>
              <ul className="space-y-4 mt-8">
                {trustFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-orange-400 flex-shrink-0"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src="/trust.webp"
                alt="Business handshake"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section ====================================================================================== */}
      <section className="bg-gray-800 py-20 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">ایده‌ای در ذهن دارید؟</h2>
            <p className="mt-4 text-lg text-gray-400">
              بیایید آن را به واقعیت تبدیل کنیم. برای دریافت مشاوره رایگان یا
              ثبت سفارش پروژه خود با ما تماس بگیرید.
            </p>
          </div>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
