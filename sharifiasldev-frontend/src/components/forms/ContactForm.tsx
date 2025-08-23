"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";

/**
 * @file src/components/forms/ContactForm.tsx
 * @description یک کامپوننت سمت کلاینت برای فرم تماس که وضعیت ارسال را مدیریت می‌کند.
 */

// تعریف تایپ برای وضعیت‌های مختلف فرم جهت خوانایی بهتر
type SubmissionStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  // Stateها برای مدیریت مقادیر ورودی فرم و وضعیت ارسال
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  /**
   * این تابع هنگام ارسال فرم اجرا می‌شود.
   * داده‌ها را به API Route داخلی Next.js ارسال می‌کند.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message.");
      }

      setStatus("success");
      // پاک کردن فیلدهای فرم در صورت ارسال موفقیت‌آمیز
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // نگهداری استایل‌های تکراری در یک متغیر برای تمیز بودن کد
  const inputStyles =
    "w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <input
          type="text"
          placeholder="نام شما"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={status === "loading"}
          className={inputStyles}
        />
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className={inputStyles}
        />
      </div>
      <textarea
        placeholder="پیغام شما..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={6}
        disabled={status === "loading"}
        className={inputStyles}
      ></textarea>

      <div className="text-center mt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "loading"}
        >
          {/* تغییر متن دکمه بر اساس وضعیت در حال ارسال بودن */}
          {status === "loading" ? (
            "در حال ارسال..."
          ) : (
            <>
              <span>ارسال پیام</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.949a.75.75 0 0 0 .826.551l3.22-.644a.75.75 0 0 1 0 1.488l-3.22-.644a.75.75 0 0 0-.826.551l-1.414 4.949a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.289Z" />
              </svg>
            </>
          )}
        </Button>
      </div>

      {/* نمایش پیام‌های بازخورد به کاربر بر اساس وضعیت ارسال */}
      {status === "success" && (
        <p className="text-center mt-4 text-green-400">
          پیام شما با موفقیت ارسال شد!
        </p>
      )}
      {status === "error" && (
        <p className="text-center mt-4 text-red-400">
          خطایی رخ داد. لطفاً دوباره تلاش کنید.
        </p>
      )}
    </form>
  );
}