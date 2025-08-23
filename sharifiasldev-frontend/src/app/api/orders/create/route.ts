// src/app/api/orders/create/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Get the product ID sent from the frontend
  const { productId } = await request.json();
  if (!productId) {
    return NextResponse.json(
      { message: "Product ID is required" },
      { status: 400 }
    );
  }

  // NOTE: In a real application, you would add logic here to call Zarinpal's API
  // to verify the transaction status before creating the order.
  // For now, we will assume the payment was successful.

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  try {
    const res = await fetch(`${STRAPI_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
      body: JSON.stringify({
        data: {
          products: [productId],
          user: session.user.id,
          orderId: `SD-${Date.now()}`, // Generate a simple order ID
          status: "Completed",
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Strapi order creation error:", err);
      throw new Error("Failed to create order in Strapi");
    }

    const newOrder = await res.json();
    return NextResponse.json(newOrder);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
