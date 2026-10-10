import Link from "next/link";
import React from "react";
import { quickAccessLinks, services, socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-gray-400 border-t border-white/10">
      {/* هایلایت گرادیانی بالای فوتر */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-orange-400/50 to-transparent" />
      {/* درخشش ملایم نارنجی پشت ستون‌ها */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-orange-600/10 blur-3xl"
      />

      <div className="container relative mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 gap-y-10 text-right">
          {/* ستون درباره ما */}
          <div className="lg:col-span-2">
            <h3 className="relative inline-block text-base font-bold text-white mb-4 after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-8 after:bg-gradient-to-l after:from-orange-500 after:to-orange-400 after:transition-all hover:after:w-16">
              درباره ما
            </h3>
            <p className="text-sm leading-7 text-gray-400">
              از طراحی تا توسعه‌ی وب، همه‌چیز با کیفیت و کدنویسی اصولی انجام
              می‌شه. تخصص ما سایت‌های شخصی، شرکتی و فروشگاهیه، با پشتیبانی مداوم
              و سفارشی‌سازی کامل.
            </p>
          </div>

          {/* ستون خدمات */}
          <div>
            <h3 className="relative inline-block text-base font-bold text-white mb-4 after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-8 after:bg-gradient-to-l after:from-orange-500 after:to-orange-400 after:transition-all hover:after:w-16">
              خدمات
            </h3>
            <ul className="list-none space-y-3">
              {services.map((service) => (
                <li
                  className="flex items-center gap-2.5 text-sm text-gray-400"
                  key={service.title}
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 shrink-0 rounded-full bg-orange-400/80"
                  />
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          {/* ستون دسترسی سریع */}
          <div>
            <h3 className="relative inline-block text-base font-bold text-white mb-4 after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-8 after:bg-gradient-to-l after:from-orange-500 after:to-orange-400 after:transition-all hover:after:w-16">
              دسترسی سریع
            </h3>
            <ul className="list-none space-y-3">
              {quickAccessLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className={`text-sm text-gray-400 hover:text-orange-300 transition-colors ${
                      link.href === "/" ? "text-orange-400 font-medium" : ""
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون لوگو و شبکه‌های اجتماعی */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="w-full h-16 flex items-center justify-center lg:justify-end mb-4">
              <Link
                href="/"
                className="text-2xl font-bold transition-colors hover:text-orange-400"
              >
                شریفی اصل <span className="text-gradient">Dev</span>
              </Link>
            </div>
            <div className="flex gap-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-orange-400/50 hover:text-orange-400 transition-colors ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* بخش پایانی فوتر شامل کپی‌رایت */}
      <div className="bg-transparent border-t border-white/10 py-4">
        <div className="container mx-auto px-6 text-center text-xs text-gray-400">
          <p>کدنویسی با امضای اصالت | Developed by SharifiaslDev</p>
          <p className="mt-1">All rights reserved © 2025</p>
        </div>
      </div>
    </footer>
  );
}
