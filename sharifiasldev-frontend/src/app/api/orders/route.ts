import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserOrders } from "@/lib/api";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Check for session and JWT
  if (!session?.jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Pass the user's JWT from the session to the function
  const orders = await getUserOrders(session.jwt);

  return NextResponse.json(orders);
}
