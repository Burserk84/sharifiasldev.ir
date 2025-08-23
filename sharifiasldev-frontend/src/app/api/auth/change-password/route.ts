import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  console.log("--- [API Route] Change Password request received ---");
  const session = await getServerSession(authOptions);

  if (!session?.jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { currentPassword, newPassword } = body;
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(`${STRAPI_URL}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: newPassword,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("--- [API Route] Strapi returned an error: ---", errorData);
      return NextResponse.json(
        { error: errorData.error?.message || "Strapi error" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Route] CRITICAL ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
