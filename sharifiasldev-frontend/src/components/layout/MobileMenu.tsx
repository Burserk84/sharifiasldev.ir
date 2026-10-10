"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "@/components/hooks/useOnClickOutside";
import type { SubMenuItem } from "@/lib/data";

interface MobileMenuProps {
  menu: SubMenuItem[];
}

/**
 * Recursively renders menu items and their submenus as an indented list,
 * so mobile navigation shows the same (Strapi-driven) menu as desktop.
 */
function MobileMenuList({
  items,
  depth,
  onNavigate,
}: {
  items: SubMenuItem[];
  depth: number;
  onNavigate: () => void;
}) {
  return (
    <>
      {items.map((item) => (
        <li key={item.link} className="w-full text-center">
          <Link
            href={item.link}
            target={item.openInNewTab ? "_blank" : undefined}
            rel={item.openInNewTab ? "noopener noreferrer" : undefined}
            onClick={onNavigate}
            className={`block py-3 hover:bg-gray-700 transition-colors ${
              depth > 0 ? "text-sm text-gray-400" : ""
            }`}
          >
            {item.title}
          </Link>
          {item.submenu && item.submenu.length > 0 && (
            <ul className="border-t border-gray-700">
              <MobileMenuList
                items={item.submenu}
                depth={depth + 1}
                onNavigate={onNavigate}
              />
            </ul>
          )}
        </li>
      ))}
    </>
  );
}

export default function MobileMenu({ menu }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden" ref={menuRef}>
      <button onClick={toggleMenu} className="z-50 relative flex items-center">
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06 1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
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
            className="fixed top-16 inset-x-0 bg-gray-800 shadow-lg z-40 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <ul className="flex flex-col items-center py-4">
              <MobileMenuList
                items={menu}
                depth={0}
                onNavigate={closeMenu}
              />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
