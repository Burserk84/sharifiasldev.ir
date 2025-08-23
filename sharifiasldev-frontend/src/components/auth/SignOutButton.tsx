"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function SignOutButton() {
  return (
    <Button 
      onClick={() => signOut({ callbackUrl: '/' })} // Sign out and redirect to homepage
      variant="secondary" 
      size="lg"
    >
      خروج از حساب کاربری
    </Button>
  );
}