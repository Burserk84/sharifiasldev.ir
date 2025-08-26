import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { ticketId } = params;
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  try {
    const ticketRes = await fetch(`${STRAPI_URL}/api/tickets/me/${ticketId}`, {
      headers: { Authorization: `Bearer ${session.jwt}` },
      cache: "no-store",
    });

    if (!ticketRes.ok) {
      return NextResponse.json(
        { message: "Failed to fetch ticket" },
        { status: ticketRes.status }
      );
    }

    const ticketData = await ticketRes.json();

    // --- DEBUG LOG ---
    console.log(
      "--- FINAL TICKET DATA ---",
      JSON.stringify(ticketData, null, 2)
    );

    return NextResponse.json(ticketData.data);
  } catch (error) {
    console.error("Error in [ticketId] GET route:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { ticketId } = params; // Correctly get the ticketId
  const { message } = await request.json();
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "process.env.NEXT_PUBLIC_STRAPI_URL";

  try {
    // Call our new custom and secure reply endpoint
    const res = await fetch(`${STRAPI_URL}/api/tickets/me/${ticketId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
      body: JSON.stringify({ message }), // Only send the message
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Strapi reply error:", errorData);
      throw new Error("Failed to post reply");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in POST /api/tickets/[ticketId]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
