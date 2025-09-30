import { Providers } from "@/app/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({ subsets: ["latin", "arabic"] });

export const metadata = {
  title: "Amirali Sharifi Asl | Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in building modern web applications with Next.js, Node.js, and TypeScript.",

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  },
  manifest: "/site.webmanifest",

  openGraph: {
    title: "Amirali Sharifi Asl | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in building modern web applications with Next.js, Node.js, and TypeScript.",
    url: "https://www.sharifiasldev.ir",
    siteName: "Amirali Sharifi Asl Portfolio",
    images: [
      {
        url: "https://www.sharifiasldev.ir/portfolio-preview.png",
        width: 1200,
        height: 627,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.className} bg-black text-gray-100 flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        {/* 2. Wrap the contents of your body with the Providers component */}
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
