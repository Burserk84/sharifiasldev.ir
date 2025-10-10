import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      message,
      purpose = "consultation",
      proposedBudget,
      techStack,
      source = "contact-page",
    } = body;

    if (!name || !email || !message)
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    if (purpose === "project" && (!proposedBudget || !techStack)) {
      return NextResponse.json(
        { error: "need_project_fields" },
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.CMS_URL}/api/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name,
          email,
          message,
          purpose,
          proposedBudget,
          techStack,
          source,
        },
      }),
    });

    if (!res.ok)
      return NextResponse.json({ error: "strapi_failed" }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "server" + e }, { status: 500 });
  }
}
