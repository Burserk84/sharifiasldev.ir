import { Providers } from "@/app/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({ subsets: ["latin", "arabic"] });

export const metadata = {
  title: "SharifiaslDev | شریفی اصل",
  description: "وب‌سایت شخصی و نمونه کار امیرعلی شریفی اصل",
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
