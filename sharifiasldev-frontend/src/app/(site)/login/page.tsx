"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// ✨ HELPER COMPONENT TO DISPLAY ERRORS FROM NEXTAUTH ✨
const ErrorMessage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // Map NextAuth error codes to user-friendly messages
  const errorMessages: { [key: string]: string } = {
    CredentialsSignin: "نام کاربری یا رمز عبور اشتباه است.",
  };

  if (!error) {
    return null;
  }

  return (
    <div className="text-red-400 text-center p-2">
      {errorMessages[error] || "یک خطای ناشناس رخ داد. لطفاً دوباره تلاش کنید."}
    </div>
  );
};

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Let NextAuth handle the logic. It will redirect on success or
    // redirect back to this page with an error on failure.
    await signIn("credentials", {
      identifier, // Use the state variable that can be email or username
      password,
      callbackUrl: "/dashboard", // Where to go on success
    });

    // We don't need to set loading to false here, as a redirect will happen.
  };

  const inputStyles =
    "w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50";

  return (
    <div className="container mx-auto px-6 py-24 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">
          ورود به حساب کاربری
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ✨ RENDER THE ERROR MESSAGE COMPONENT HERE ✨ */}
          <ErrorMessage />

          <input
            type="text" // Changed to text to allow username or email
            placeholder="ایمیل یا نام کاربری"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            disabled={isLoading}
            className={inputStyles}
            data-cy="login-identifier-input"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className={inputStyles}
            data-cy="login-password-input"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
            data-cy="login-submit-button"
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
