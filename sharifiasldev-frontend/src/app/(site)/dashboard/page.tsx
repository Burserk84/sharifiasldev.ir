"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SignOutButton from "@/components/auth/SignOutButton";
import UserProfile from "@/components/dashboard/UserProfile";
import ChangePasswordForm from "@/components/dashboard/ChangePasswordForm";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PurchasedProducts from "@/components/dashboard/PurchasedProducts";
import SupportPage from "../dashboard/support/page";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("Dashboard Session Object:", session);

  // State to manage which view is active
  const [activeView, setActiveView] = useState("purchases");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="text-center p-24 text-gray-400">در حال بارگذاری...</div>
    );
  }

  if (status === "authenticated" && session) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Render the new header panel */}
          <DashboardHeader session={session} onSelectView={setActiveView} />

          {/* Conditionally render the correct component based on the active view */}
          {activeView === "profile" && <UserProfile />}
          {activeView === "password" && <ChangePasswordForm />}
          {activeView === "purchases" && <PurchasedProducts />}
          {activeView === "support" && <SupportPage />}

          <div className="mt-8 text-center">
            <SignOutButton />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
