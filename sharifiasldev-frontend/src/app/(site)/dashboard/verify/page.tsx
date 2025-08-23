"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// We use a child component so we can wrap it in Suspense, as recommended by Next.js
function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State to track the verification process
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'failed'
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const zarinpalStatus = searchParams.get("Status");
      const authority = searchParams.get("Authority");
      const productId = searchParams.get("product_id");

      // 1. Check if the payment was successful on Zarinpal's end
      if (zarinpalStatus !== "OK") {
        setStatus("failed");
        setError("تراکنش توسط زرین‌پال تایید نشد یا توسط شما لغو شده است.");
        return;
      }

      // 2. Call our own backend API to create the order
      try {
        const res = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, authority }), // Send productId and authority for verification
        });

        if (!res.ok) {
          throw new Error("Failed to create order.");
        }

        // 3. If successful, update status and redirect the user
        setStatus("success");
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000); // Wait 3 seconds before redirecting
      } catch (err) {
        setStatus("failed");
        setError(
          err.message ||
            "خطایی در ثبت سفارش رخ داد. لطفا با پشتیبانی تماس بگیرید."
        );
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  // Render different messages based on the status
  if (status === "verifying") {
    return (
      <h1 className="text-2xl text-center text-gray-300">
        در حال بررسی و تایید پرداخت...
      </h1>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <h1 className="text-2xl text-green-400">پرداخت موفقیت آمیز بود!</h1>
        <p className="text-gray-400 mt-2">
          سفارش شما ثبت شد و محصول به حساب کاربری شما اضافه گردید. در حال انتقال
          به داشبورد...
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center">
        <h1 className="text-2xl text-red-400">پرداخت ناموفق بود</h1>
        <p className="text-gray-400 mt-2">{error}</p>
        <Link
          href="/dashboard"
          className="text-orange-400 hover:underline mt-4 inline-block"
        >
          بازگشت به داشبورد
        </Link>
      </div>
    );
  }

  return null;
}

// The main page component that wraps our logic in Suspense
export default function VerifyPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <Suspense
        fallback={
          <h1 className="text-2xl text-center text-gray-300">
            در حال بارگذاری...
          </h1>
        }
      >
        <VerifyContent />
      </Suspense>
    </div>
  );
}
