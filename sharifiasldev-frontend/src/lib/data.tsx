import React from "react";

/**
 * @file src/lib/data.tsx
 * @description این فایل شامل آرایه‌های داده استاتیک است که در بخش‌های مختلف سایت استفاده می‌شوند.
 * مرکزی کردن داده‌ها در این فایل، مدیریت محتوا را آسان‌تر کرده و کامپوننت‌ها را تمیز نگه می‌دارد.
 */

// داده های مربوط به منو در هدر

/**
 * An item inside a (possibly nested) dropdown submenu.
 * Used by DropdownMenu for recursive multi-level rendering.
 */
export interface SubMenuItem {
  title: string;
  link: string;
  openInNewTab?: boolean;
  submenu?: SubMenuItem[];
}

/**
 * A top-level navigation menu item as passed from the server component
 * (Header) to the client components (HeaderClient / MobileMenu).
 * The menu is built from Strapi (Nav Item collection type).
 */
export interface NavMenuItem {
  title: string;
  link: string;
  openInNewTab?: boolean;
  submenu?: SubMenuItem[];
}

export interface DropdownMenuProps {
  title: string;
  submenu: SubMenuItem[];
  link: string; // Add the link prop
}

// داده‌های مربوط به بخش "پلن‌های پروژه سفارشی" در صفحه اصلی
export const pricingPlans = [
  {
    name: "پلن پایه",
    price: "4,890,000",
    description: "برای وب‌سایت‌های کوچک و معرفی.",
    features: [
      "طراحی تا ۵ صفحه",
      "طراحی واکنش گرا",
      "فرم تماس پایه",
      "بهینه‌سازی اولیه سئو",
      "۱ ماه پشتیبانی فنی",
    ],
    buttonVariant: "tertiary",
    planQuery: "basic",
  },
  {
    name: "پلن استاندارد",
    price: "12,780,000",
    description: "ایده‌آل برای کسب‌وکارهای در حال رشد و فروشگاه‌های کوچک.",
    features: [
      "طراحی تا ۱۰ صفحه",
      "ویژگی‌های پلن پایه +",
      "سیستم مدیریت محتوا (CMS)",
      "قابلیت وبلاگ",
      "اتصال به شبکه‌های اجتماعی",
      "بهینه‌سازی پیشرفته سئو",
      "۲ ماه پشتیبانی فنی",
    ],
    buttonVariant: "primary",
    planQuery: "standard",
    isFeatured: true,
  },
  {
    name: "پلن VIP",
    price: "19,999,000",
    description: "برای پروژه‌های بزرگ، فروشگاه‌های پیچیده و نیازهای خاص.",
    features: [
      "طراحی نامحدود صفحات",
      "ویژگی‌های پلن استاندارد +",
      "قابلیت‌های فروشگاهی کامل",
      "توسعه ویژگی‌های سفارشی",
      "بهینه‌سازی سرعت پیشرفته",
      "گزارش‌های تحلیلی",
      "۳ ماه پشتیبانی ویژه",
    ],
    buttonVariant: "tertiary",
    planQuery: "vip",
  },
];

// داده‌های مربوط به بخش "چرا به ما اعتماد کنید؟" در صفحه اصلی
export const trustFeatures = [
  "کدنویسی استاندارد و بهینه",
  "طراحی مدرن و کاربرپسند",
  "پشتیبانی پاسخگو و متعهد",
  "استفاده از تکنولوژی‌های روز",
  "تمرکز کامل بر نیازهای مشتری",
];

// لینک‌های ستون "دسترسی سریع" در فوتر سایت
export const quickAccessLinks = [
  { title: "خانه", href: "/" },
  { title: "فروشگاه", href: "/products" },
  { title: "حساب کاربری من", href: "/account" },
  { title: "درباره من", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
];

// لیست خدمات برای نمایش در فوتر سایت
export const services = [
  { title: "طراحی و توسعه وب‌سایت‌ها" },
  { title: "سفارشی‌سازی کامل وردپرس" },
  { title: "کدنویسی تمیز و استاندارد" },
  { title: "پشتیبانی فنی و به‌روزرسانی" },
];

// اطلاعات مربوط به لینک‌های شبکه‌های اجتماعی در فوتر، شامل آیکون SVG و کلاس رنگ
export const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/amirali_sharifi_asl?utm_source=qr&igsh=anJ2ZG1xYjFpOTdi",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" />
      </svg>
    ),
    color: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
  },
  {
    name: "Telegram",
    href: "https://t.me/sharifiasl_dev",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" />
      </svg>
    ),
    color: "bg-sky-500",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/qr/MB5XWRWRYM77P1",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.846 6.099l-1.369 5.008 5.004-1.322z" />
      </svg>
    ),
    color: "bg-green-500",
  },
];

export const timelineData = [
  {
    date: "حدود ۳ سال پیش",
    title: "آغاز یک ماجراجویی: ورود به دنیای توسعه وب",
    content:
      "کنجکاوی برای درک چگونگی ساخت وب‌سایت‌ها، سفرم را با یادگیری اصول اولیه یعنی HTML، CSS و JavaScript شروع کرد.",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    date: "۲ سال گذشته",
    title: "عمیق‌تر شدن در تکنولوژی: تسلط بر Full-Stack",
    content:
      "با ورود به رشته علوم کامپیوتر، دانش آکادمیک را با تجربه عملی ترکیب کردم. برای ساخت رابط‌های کاربری مدرن روی React و برای قدرت بخشیدن به بک‌اند، روی Node.js و Express.js تمرکز کردم.",
    skills: [
      "React",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Bootstrap",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    date: "هم اکنون - ترم ۴ علوم کامپیوتر",
    title: "تلفیق تجربه عملی با دانش آکادمیک",
    content:
      "تحصیل در رشته علوم کامپیوتر در دانشگاه سمنان، دیدگاه تئوریک و پایه‌ای عمیق‌تری به من بخشیده است. این ترکیب به من کمک می‌کند تا راه‌حل‌های بهینه‌تر و پایدارتری ارائه دهم.",
    skills: [],
  },
  {
    date: "اولین سکوی پرتاب",
    title: "sharifiasldev.ir",
    content:
      'وب‌سایت sharifiasldev.ir نتیجه طبیعی این مسیر یادگیری و کسب تجربه بود. این پلتفرم، فضایی برای نمایش نمونه‌کارها، فروش محصولات و دریافت پروژه‌های فریلنسری با شعار "کدنویسی با امضای اصالت" است.',
    skills: [],
    button: {
      text: "بازدید از سایت",
      href: "/",
    },
  },
];

// Data for the Devora vision section
export const devoraValues = [
  {
    title: "ماموریت Devora:",
    text: "توانمندسازی کسب‌وکارها با راه‌حل‌های دیجیتال خلاقانه و با کیفیت.",
  },
  {
    title: "ارزش‌های کلیدی:",
    text: "کیفیت، نوآوری، همکاری، و تعهد به موفقیت مشتری.",
  },
];

// Data for the Devora team section
export const devoraTeam = [
  {
    role: "Full-Stack Lead",
    description: "(امیرعلی شریفی اصل) - هدایت فنی و توسعه جامع.",
    icon: "🚀",
  },
  {
    role: "Backend Developer",
    description: "متخصص در ساخت زیرساخت‌های قدرتمند و امن.",
    icon: "💾",
  },
  {
    role: "UI/UX Designer",
    description: "خالق تجربه‌های کاربری زیبا و کارآمد.",
    icon: "🖌️",
  },
];

export interface PortfolioItem {
  id: number;
  title: string;
  slug: string | null;
  technologies: string;
  coverImage: StrapiImage | null;
  description: DescriptionBlock[] | null;
  liveUrl: string | null;
  gallery: StrapiImage[] | null;
  features: { [key: string]: string } | null;
}
