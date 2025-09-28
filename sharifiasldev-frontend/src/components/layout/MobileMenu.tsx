"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "@/components/hooks/useOnClickOutside";

const menuItems = [
  { title: "خانه", link: "/" },
  { title: "فروشگاه", link: "/products" },
  { title: "بلاگ", link: "/blog" },
  { title: "نمونه کارها", link: "/portfolio" },
  { title: "تماس با ما", link: "/contact" },
  { title: "درباره ما", link: "/about" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden" ref={menuRef}>
      <button onClick={toggleMenu} className="z-50 relative">
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            // --- KEY CHANGES HERE ---
            // Changed from 'absolute' to 'fixed' to escape any parent's overflow clipping.
            // Positioned it from the top of the viewport, just below a standard header height.
            className="fixed top-16 inset-x-0 bg-gray-800 shadow-lg z-40"
          >
            <ul className="flex flex-col items-center py-4">
              {menuItems.map((item) => (
                <li key={item.link} className="w-full text-center">
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 hover:bg-gray-700 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
