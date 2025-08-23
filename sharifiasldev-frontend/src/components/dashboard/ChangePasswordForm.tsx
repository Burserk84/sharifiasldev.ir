"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { signOut } from "next-auth/react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("رمز عبور جدید با تکرار آن مطابقت ندارد.");
      setIsLoading(false);
      return;
    }

    const payload = {
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    console.log("--- [Frontend Form] Sending payload to API route:", payload);

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
    });

    if (res.ok) {
      setMessage(
        "رمز عبور با موفقیت تغییر کرد. لطفاً از حساب خود خارج شده و با رمز جدید وارد شوید."
      );

      setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, 3000);
    } else {
      const data = await res.json();
      setError(data.error || "رمز عبور فعلی نامعتبر است یا خطایی رخ داده.");
    }
    setIsLoading(false);
  };

  const inputStyles =
    "w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-200 text-right";

  return (
    <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-white text-right">
        تغییر رمز عبور
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="رمز عبور فعلی"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className={inputStyles}
        />
        <input
          type="password"
          placeholder="رمز عبور جدید"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className={inputStyles}
        />
        <input
          type="password"
          placeholder="تکرار رمز عبور جدید"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
          className={inputStyles}
        />

        <div className="pt-2">
          <Button type="submit" variant="secondary" disabled={isLoading}>
            {isLoading ? "در حال تغییر..." : "تغییر رمز عبور"}
          </Button>
        </div>
      </form>
      {message && <p className="mt-4 text-right text-green-400">{message}</p>}
      {error && <p className="mt-4 text-right text-red-400">{error}</p>}
    </div>
  );
}
