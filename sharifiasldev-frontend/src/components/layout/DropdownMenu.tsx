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
        className="flex justify-between items-center px-4 py-2 text-sm text-gray-200 hover:bg-orange-400 hover:text-gray-900"
      >
        {item.title}
        {/* نمایش آیکون فلش فقط در صورتی که آیتم دارای زیرمنو باشد */}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
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
          className={`absolute top-0 right-full w-48 bg-gray-800 rounded-md shadow-lg transition-all duration-300 ${
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
      <Link href={link}>
        <button
          type="button"
          className="flex items-center gap-x-1 hover:text-orange-400 transition-colors"
        >
          {title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>

      {/* The Dropdown Menu Panel */}
      <div
        className={`absolute top-full mt-2 w-48 bg-gray-800 rounded-md shadow-lg transition-all duration-300 z-10 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {submenu.map((subItem) => (
          <MenuItem key={subItem.link} item={subItem} />
        ))}
      </div>
    </div>
  );
}
