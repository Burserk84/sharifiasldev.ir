"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import DropdownMenu from "./DropdownMenu";
import Search from "./Search";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import type { SubMenuItem } from "@/lib/data";

interface HeaderClientProps {
  session: Session | null;
  menu: SubMenuItem[];
}

export default function HeaderClient({ session, menu }: HeaderClientProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-20 border-b border-white/10 transition-transform duration-300 ${
        isVisible ? "" : "-translate-y-full"
      }`}
    >
      {/* Glass layer as a child: putting backdrop-blur on <header> itself would
          make it the containing block for the search/mobile `fixed` overlays,
          shrinking them to the header box. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/70 backdrop-blur-xl"
      />
      <nav className="container mx-auto flex items-center justify-between p-4 text-gray-200">
        <Link
          href="/"
          className="text-xl font-bold transition-colors hover:text-white"
        >
          شریفی اصل <span className="text-gradient">Dev</span>
        </Link>

        {/* Desktop Menu (hidden on mobile) */}
        <ul className="hidden lg:flex items-center gap-x-6">
          {menu.map((item) => (
            <li key={item.link}>
              {item.submenu && item.submenu.length > 0 ? (
                <DropdownMenu
                  title={item.title}
                  submenu={item.submenu}
                  link={item.link}
                />
              ) : (
                <Link
                  href={item.link}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className={`relative inline-block transition-colors after:absolute after:-bottom-1.5 after:right-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-orange-400 after:transition-transform after:duration-300 after:rounded-full hover:after:scale-x-100 hover:text-white ${
                    pathname === item.link
                      ? "text-orange-400 font-bold after:scale-x-100"
                      : "text-gray-300"
                  }`}
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right Section: Search, Auth, and Mobile Menu Toggle.
            Every child is now an exact-height flex box (see Search/MobileMenu
            buttons), so items-center aligns icons with each other AND with
            the logo/nav line. */}
        <div className="flex items-center gap-x-4">
          <Search />

          {/* Auth buttons are now visible on all screen sizes */}
          {session ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-x-2 text-sm group"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-orange-400/40 hover:text-orange-400 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="hidden sm:flex group-hover:text-orange-300 transition-colors">
                پنل کاربری
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300 hover:border-orange-400/50 hover:text-orange-300 transition-colors"
            >
              ورود
            </Link>
          )}

          {/* MobileMenu component only shows the hamburger button on mobile */}
          <MobileMenu menu={menu} />
        </div>
      </nav>
    </header>
  );
}
