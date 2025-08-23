import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import { socialLinks } from "@/lib/data"; // We'll reuse your social links data

export const metadata: Metadata = {
  title: "تماس با ما | SharifiaslDev",
  description: "راه های ارتباطی و فرم تماس برای ارسال پروژه یا دریافت مشاوره.",
};

// A small component for each contact info item
function ContactInfoItem({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-orange-400">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <div className="text-gray-400">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-gray-800">
      <div className="container mx-auto px-6 py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white">تماس با ما</h1>
          <p className="mt-4 text-lg text-gray-400">
            برای هرگونه سوال، پیشنهاد یا درخواست پروژه، از راه‌های زیر با ما در
            ارتباط باشید.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Contact Info */}
          <div className="space-y-8 text-right">
            <ContactInfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              }
              title="ایمیل"
            >
              <a
                href="mailto:sharifiasldev@gmail.com"
                className="hover:text-orange-400 transition-colors"
              >
                sharifiasldev@gmail.com
              </a>
            </ContactInfoItem>

            <ContactInfoItem
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.279-.087.431l4.258 7.373c.077.152.256.18.431.087l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              title="تلفن"
            >
              <a
                href="tel:+989925539541"
                className="hover:text-orange-400 transition-colors"
                dir="ltr"
              >
                +98 9925539541
              </a>
            </ContactInfoItem>

            <div className="pt-8">
              <h3 className="text-lg font-bold text-white mb-4">
                ما را در شبکه‌های اجتماعی دنبال کنید
              </h3>
              <div className="flex gap-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${social.color} transition-transform hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
