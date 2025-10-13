"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Turnstile from "@/components/forms/Turnstile";

const ErrorMessage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const map: Record<string, string> = {
    CredentialsSignin: "کپچا یا اطلاعات ورود نادرست است.",
  };
  return error ? (
    <div className="text-red-400 text-center p-2">
      {map[error] || "یک خطا رخ داد. دوباره تلاش کنید."}
    </div>
  ) : null;
};

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCaptcha = useCallback((tok: string) => setCaptcha(tok), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("credentials", {
      identifier,
      password,
      captcha, // ⬅️ ارسال به authorize
      callbackUrl: "/dashboard",
    });
  };

  const inputStyles =
    "w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50";

  const disabled = isLoading || !captcha;

  return (
    <div className="container mx-auto px-6 py-24 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">
          ورود به حساب کاربری
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ErrorMessage />
          <input
            type="text"
            placeholder="ایمیل یا نام کاربری"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            disabled={isLoading}
            className={inputStyles}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className={inputStyles}
          />

          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
            onVerify={handleCaptcha}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={disabled}
          >
            {isLoading ? "در حال ورود..." : "ورود"}
          </Button>

          <p className="text-center text-gray-400">
            حساب کاربری ندارید؟{" "}
            <Link href="/register" className="text-orange-400 hover:underline">
              ثبت نام کنید
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
