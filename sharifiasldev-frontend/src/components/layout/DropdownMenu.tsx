"use client";

import { useState } from "react";
import Link from "next/link";
import { SubMenuItem, DropdownMenuProps } from "@/lib/data";

/**
 * @file src/components/layout/DropdownMenu.tsx
 * @description یک کامپوننت بازگشتی (recursive) برای ایجاد منوهای آبشاری چند سطحی.
 * این کامپوننت به عنوان یک Client Component برای مدیریت وضعیت‌های تعاملی (مانند هاور) عمل می‌کند.
 * کامپوننت کمکی برای رندر کردن هر آیتم در لیست منو.
 * این کامپوننت مسئول نمایش زیرمنوهای تو در تو است.
 */

function MenuItem({ item }: { item: SubMenuItem }) {
  // State محلی برای مدیریت نمایش زیرمنوی این آیتم خاص
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsSubmenuOpen(true)}
      onMouseLeave={() => setIsSubmenuOpen(false)}
    >
      <Link
        href={item.link}
        className="flex justify-between items-center rounded-lg mx-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-orange-400/10 hover:text-orange-300 transition-colors"
      >
        {item.title}
        {/* نمایش آیکون فلش فقط در صورتی که آیتم واقعاً زیرمنوی فعال داشته باشد */}
        {item.submenu && item.submenu.length > 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 transition-transform duration-300 ${
              isSubmenuOpen ? "rotate-90" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </Link>

      {/* بخش بازگشتی: اگر این آیتم خود دارای زیرمنو باشد، یک پنل دیگر رندر می‌شود */}
      {item.submenu && (
        <div
          className={`absolute top-0 right-full min-w-[210px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 py-2 divide-y divide-white/10 transition-all duration-300 ${
            isSubmenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {item.submenu.map((subItem) => (
            <MenuItem key={subItem.link} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * کامپوننت اصلی و سطح اول منوی آبشاری.
 */
export default function DropdownMenu({
  title,
  submenu,
  link,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Wrap the button with a Link component */}
      <Link
        href={link}
        className="relative block text-gray-300 hover:text-white transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-orange-400 after:transition-transform after:rounded-full hover:after:scale-x-100"
      >
        <button
          type="button"
          className="flex items-center gap-x-1 transition-colors"
        >
          {title}
          {/* Chevron only when the item actually has children */}
          {submenu && submenu.length > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </Link>

      {/* The Dropdown Menu Panel */}
      <div
        className={`absolute top-full mt-2 min-w-[210px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 py-2 z-10 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* خط تاکیدی نارنجی بالای پنل */}
        <div className="h-px bg-gradient-to-r from-orange-400/50 via-orange-400/20 to-transparent" />
        {submenu.map((subItem) => (
          <MenuItem key={subItem.link} item={subItem} />
        ))}
      </div>
    </div>
  );
}
