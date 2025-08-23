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
        className="hover:text-orange-400 transition-colors"
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
              className="relative w-full max-w-xl bg-gray-900 mx-auto mt-20 p-6 rounded-lg"
            >
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="جستجو در سایت..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  autoFocus
                  data-cy="search-modal-input"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
