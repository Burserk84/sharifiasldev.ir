"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";

// A simple component to display a single piece of user info
function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-400">{label}</dt>
      <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
        {value || "-"}
      </dd>
    </div>
  );
}

export default function UserProfile() {
  const { data: session } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setUsername(session.user.username || "");
      setFirstName(session.user.firstName || "");
      setLastName(session.user.lastName || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const res = await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, firstName, lastName, email }),
    });

    if (res.ok) {
      // Show a success message telling the user to re-login
      setMessage(
        "پروفایل با موفقیت به‌روزرسانی شد! برای مشاهده تغییرات، لطفاً از حساب خود خارج شده و دوباره وارد شوید."
      );
    } else {
      setMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
    setIsLoading(false);
  };

  const inputStyles =
    "w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-200 text-right";

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white text-right">
          اطلاعات کاربری
        </h2>
        {!isEditing && (
          <Button
            onClick={() => {
              setIsEditing(true);
              setMessage("");
            }}
            variant="secondary"
          >
            ویرایش
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                نام
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputStyles}
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                نام خانوادگی
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputStyles}
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                نام کاربری
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputStyles}
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                ایمیل
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputStyles}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="pt-2 flex gap-4">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="secondary"
              type="button"
            >
              لغو
            </Button>
          </div>
          {message && (
            <p
              className={`mt-4 text-right ${
                message.includes("موفقیت") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      ) : (
        <div className="mt-6 border-t border-gray-700">
          <dl className="divide-y divide-gray-700">
            <InfoRow label="نام کاربری" value={session?.user?.username} />
            <InfoRow label="نام" value={session?.user?.firstName} />
            <InfoRow label="نام خانوادگی" value={session?.user?.lastName} />
            <InfoRow label="ایمیل" value={session?.user?.email} />
          </dl>
        </div>
      )}
    </div>
  );
}
