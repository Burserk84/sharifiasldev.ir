"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const STRAPI_URL =
      process.env.NEXT_PUBLIC_STRAPI_URL ||
      "process.env.NEXT_PUBLIC_STRAPI_URL";

    try {
      // We call the Strapi register endpoint directly
      const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error.message || "Failed to register.");
      }

      // On success, redirect to the login page
      router.push("/login");
    } catch (err: unknown) {
      setError(err.message);
    }
  };

  const inputStyles =
    "w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400";

  return (
    <div className="container mx-auto px-6 py-24 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">
          ایجاد حساب کاربری
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={inputStyles}
          />
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyles}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputStyles}
          />

          {error && <p className="text-red-400 text-center">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="w-full">
            ثبت نام
          </Button>

          <p className="text-center text-gray-400">
            قبلاً ثبت نام کرده‌اید؟{" "}
            <Link href="/login" className="text-orange-400 hover:underline">
              وارد شوید
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
