"use client";

import { Button } from "@/components/ui/Button";
import { useMemo, useState } from "react";
import Turnstile from "./Turnstile";

type SubmissionStatus = "idle" | "loading" | "success" | "error";
type Purpose = "consultation" | "project" | "other";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [purpose, setPurpose] = useState<Purpose>("consultation");
  const [proposedBudget, setProposedBudget] = useState("");
  const [techStack, setTechStack] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [captcha, setCaptcha] = useState<string>("");

  const inputStyles =
    "w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50";

  const isProject = purpose === "project";

  const budgetDisplay = useMemo(() => {
    const digits = proposedBudget.replace(/[^\d]/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, [proposedBudget]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      if (!name || !email || !message) throw new Error("invalid");
      if (isProject && (!proposedBudget || !techStack))
        throw new Error("invalid");
      if (!captcha) throw new Error("captcha_required");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          purpose,
          proposedBudget: isProject
            ? Number(budgetDisplay.replace(/,/g, ""))
            : undefined,
          techStack: isProject ? techStack : undefined,
          source: "contact-page",
          captcha,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Contact API error:", err);
        throw new Error(err?.error || "Failed to send message.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setPurpose("consultation");
      setProposedBudget("");
      setTechStack("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block mb-2 text-sm text-gray-300">هدف تماس</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as Purpose)}
            className={inputStyles}
            disabled={status === "loading"}
          >
            <option value="consultation">مشاوره</option>
            <option value="project">درخواست پروژه</option>
            <option value="other">سایر</option>
          </select>
        </div>

        {isProject && (
          <>
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                قیمت پیشنهادی (تومان)
              </label>
              <input
                inputMode="numeric"
                placeholder="مثلاً 25,000,000"
                value={budgetDisplay}
                onChange={(e) => setProposedBudget(e.target.value)}
                required
                className={inputStyles}
                disabled={status === "loading"}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                تکنولوژی‌های مدنظر
              </label>
              <input
                type="text"
                placeholder="Next.js, Node.js, PostgreSQL, ..."
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                required
                className={inputStyles}
                disabled={status === "loading"}
              />
            </div>
          </>
        )}
      </div>

      <textarea
        placeholder="پیغام شما..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={6}
        disabled={status === "loading"}
        className={inputStyles}
      />

      <Turnstile
        siteKey={
          process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
          process.env.TURNSTILE_SITE_KEY!
        }
        onVerify={(tok) => setCaptcha(tok)}
      />

      <div className="text-center mt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "loading"}
        >
          {status === "loading" ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </div>

      {status === "success" && (
        <p className="text-center mt-4 text-green-400">
          پیام شما با موفقیت ارسال شد!
        </p>
      )}
      {status === "error" && (
        <p className="text-center mt-4 text-red-400">
          ورودی‌ها را بررسی کنید و دوباره تلاش کنید.
        </p>
      )}
    </form>
  );
}
