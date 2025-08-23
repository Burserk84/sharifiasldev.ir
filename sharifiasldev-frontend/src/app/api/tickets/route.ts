// src/app/api/tickets/route.ts

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserTickets } from "@/lib/api";

// GET function remains the same
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const tickets = await getUserTickets(session.jwt);
  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Get the raw JSON body from the frontend form
  const body = await request.json(); 
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  try {
    const res = await fetch(`${STRAPI_URL}/api/tickets/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
      // Send the exact same body from the form directly to Strapi
      body: JSON.stringify(body),
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error("Strapi API Error:", responseData);
      return NextResponse.json(responseData, { status: res.status });
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error("Internal API Route Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
