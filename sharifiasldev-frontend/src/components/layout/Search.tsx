"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "@/components/hooks/useOnClickOutside";

/**
 * @file src/components/layout/Search.tsx
 * @description کامپوننت جستجو که شامل یک دکمه برای باز کردن یک مودال (پاپ‌آپ) انیمیشنی است.
 * این کامپوننت یک Client Component است.
 */
export default function Search() {
  // Stateها برای کنترل باز و بسته بودن مودال و مدیریت متن ورودی جستجو
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  /**
   * این تابع هنگام ثبت فرم اجرا شده و کاربر را به صفحه نتایج جستجو هدایت می‌کند.
   */
  const searchModalRef = useRef<HTMLDivElement>(null);

  // Use the hook to close the modal when clicking outside
  useOnClickOutside(searchModalRef, () => setIsOpen(false));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${query}`);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-orange-400/40 hover:text-orange-400 transition-colors"
        data-cy="header-search-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40"
          >
            {/* Assign the ref to the modal content */}
            <motion.div
              ref={searchModalRef}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="relative w-full max-w-xl bg-black/90 backdrop-blur-xl border border-white/10 mx-auto mt-20 p-6 rounded-2xl"
            >
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="جستجو در سایت..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 px-4 pl-12 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                  autoFocus
                  data-cy="search-modal-input"
                />
              </form>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="بستن جستجو"
                className="absolute top-1/2 left-3 -translate-y-1/2 flex w-8 h-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:border-orange-400/40 hover:text-orange-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
