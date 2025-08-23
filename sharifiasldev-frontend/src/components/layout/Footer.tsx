import Link from "next/link";
import React from "react";
import { quickAccessLinks, services, socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-right">
          {/* ستون درباره ما */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">درباره ما</h3>
            <p className="leading-relaxed">
              از طراحی تا توسعه‌ی وب، همه‌چیز با کیفیت و کدنویسی اصولی انجام
              می‌شه. تخصص ما سایت‌های شخصی، شرکتی و فروشگاهیه، با پشتیبانی مداوم
              و سفارشی‌سازی کامل.
            </p>
          </div>

          {/* ستون خدمات */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">خدمات</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li className="list-disc" key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>

          {/* ستون دسترسی سریع */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">دسترسی سریع</h3>
            <ul className="space-y-3">
              {quickAccessLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className={`hover:text-orange-400 transition-colors ${
                      link.href === "/" ? "text-orange-400 font-bold" : ""
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
            <div className="w-full h-24 flex items-center justify-center lg:justify-end mb-4">
              <Link
                href="/"
                className="text-2xl font-bold transition-colors hover:text-orange-400"
              >
                شریفی اصل <span className="text-orange-400">Dev</span>
              </Link>
            </div>
            <div className="flex gap-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-md flex items-center justify-center text-white hover:text-orange-400 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* بخش پایانی فوتر شامل کپی‌رایت */}
      <div className="bg-gray-900 border-t border-gray-700 py-4">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>کدنویسی با امضای اصالت | Developed by SharifiaslDev</p>
          <p className="mt-1">All rights reserved © 2025</p>
        </div>
      </div>
    </footer>
  );
}
