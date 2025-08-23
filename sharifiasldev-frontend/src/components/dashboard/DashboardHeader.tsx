"use client";

import { useState, useRef, ReactNode } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

// Define the component's props
interface DashboardHeaderProps {
  session: Session;
  onSelectView: (view: string) => void;
}

// A reusable component for the action buttons
function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

export default function DashboardHeader({
  session,
  onSelectView,
}: DashboardHeaderProps) {
  const { update } = useSession();
  const [message, setMessage] = useState("");

  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  /**
   * This function handles the entire image upload process.
   * 1. Uploads the file to Strapi's Media Library.
   * 2. Links the new image ID to the user's profile.
   * 3. Refreshes the session to display the new image.
   */
  const handleImageUpload = async (
    file: File,
    field: "profilePicture" | "coverImage"
  ) => {
    if (!session?.jwt) return;
    setMessage("در حال آپلود...");

    const formData = new FormData();
    formData.append("files", file);

    try {
      // Step 1: Upload the file
      const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.jwt}` },
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Failed to upload image.");
      const [uploadedImage] = await uploadRes.json();

      // Step 2: Link the image to the user profile
      const updateUserRes = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: uploadedImage.id }),
      });
      if (!updateUserRes.ok)
        throw new Error("Failed to link image to profile.");

      // Step 3: Refresh the session to show the new image
      await update();
      setMessage("تصویر با موفقیت به‌روزرسانی شد!");
    } catch (error) {
      console.error(error);
      setMessage("خطا در آپلود تصویر.");
    }
  };

  // Access the URL directly from the flattened image object
  const coverImageUrl = session.user?.coverImage?.url
    ? `${STRAPI_URL}${session.user.coverImage.url}`
    : "https://placehold.co/1200x300/1f2937/f97616?text=Cover+Image";

  // Access the URL directly from the flattened image object
  const profilePictureUrl = session.user?.profilePicture?.url
    ? `${STRAPI_URL}${session.user.profilePicture.url}`
    : `https://ui-avatars.com/api/?name=${
        session.user?.firstName || session.user?.username
      }&background=2563eb&color=fff`;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-48 bg-gray-700 group">
        <Image
          src={coverImageUrl}
          alt="Cover photo"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          onClick={() => coverImageInputRef.current?.click()}
          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <span className="text-white font-bold">تغییر کاور</span>
        </div>
        <input
          type="file"
          ref={coverImageInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0])
              handleImageUpload(e.target.files[0], "coverImage");
          }}
        />
      </div>

      <div className="p-6">
        <div className="flex items-end -mt-24">
          <div className="relative w-32 h-32 border-4 border-gray-800 rounded-full overflow-hidden bg-gray-900 group">
            <Image
              src={profilePictureUrl}
              alt="Profile picture"
              fill
              sizes="128px"
              className="object-cover"
            />
            <div
              onClick={() => profilePicInputRef.current?.click()}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <span className="text-white font-bold text-xs">تغییر</span>
            </div>
            <input
              type="file"
              ref={profilePicInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0])
                  handleImageUpload(e.target.files[0], "profilePicture");
              }}
            />
          </div>
          <div className="mr-4">
            <h2 className="text-2xl font-bold text-white">
              {session.user?.firstName && session.user?.lastName
                ? `${session.user.firstName} ${session.user.lastName}`
                : session.user?.username}
            </h2>
            <p className="text-sm text-gray-400">{session.user?.email}</p>
          </div>
        </div>

        {message && (
          <p className="text-right mt-2 text-sm text-green-400">{message}</p>
        )}

        <div className="flex justify-end gap-x-6 mt-4 border-t border-gray-700 pt-4">
          <ActionButton
            onClick={() => onSelectView("purchases")}
            label="محصولات خریداری شده"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 active:text-orange-400"
              >
                <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
              </svg>
            }
          />
          <ActionButton
            onClick={() => onSelectView("support")}
            label="تیکت‌های پشتیبانی"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.986 3.034a.75.75 0 0 1 .756.75l-.001 2.915.29-1.393a.75.75 0 0 1 1.414.294l-1.53, 7.329a.75.75 0 0 1-1.29.352l-2.48-3.542a.75.75 0 0 1-.096-1.017l.001-.002 2.91-4.156a.75.75 0 0 1 .736-.332ZM13.882 10.74a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 1 1 1.06-1.06l1.06 1.06ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
                <path d="M12.352 3.125a.75.75 0 0 1-.352 1.29l-7.33 1.53a.75.75 0 0 1-.293-1.415l7.329-1.53a.75.75 0 0 1 .646.125Z" />
                <path d="M4.53 8.352a.75.75 0 0 1 1.29-.352L10 12.157V15a3 3 0 0 0-5.802.99 4.49 4.49 0 0 0-.198-1.554.75.75 0 0 1 .143-.863L10 8.843l-5.326-.444a.75.75 0 0 1-.144-.863Z" />
              </svg>
            }
          />
          <ActionButton
            onClick={() => onSelectView("profile")}
            label="ویرایش پروفایل"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 active:text-orange-400"
              >
                <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
              </svg>
            }
          />
          <ActionButton
            onClick={() => onSelectView("password")}
            label="تغییر رمز عبور"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 active:text-orange-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
