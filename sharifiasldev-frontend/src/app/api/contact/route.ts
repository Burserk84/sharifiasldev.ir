import { NextResponse } from "next/server";

function join(base: string, path: string) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${b}${path}`;
}

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      message,
      purpose = "consultation",
      proposedBudget,
      techStack,
      source = "contact-page",
    } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }
    if (purpose === "project" && (!proposedBudget || !techStack)) {
      return NextResponse.json(
        { error: "need_project_fields" },
        { status: 400 }
      );
    }

    // از CMS_URL استفاده کن؛ اگر نبود از NEXT_PUBLIC_STRAPI_URL
    const CMS_URL = process.env.CMS_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!CMS_URL)
      return NextResponse.json({ error: "missing_CMS_URL" }, { status: 500 });

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (process.env.CMS_TOKEN)
      headers.Authorization = `Bearer ${process.env.CMS_TOKEN}`;

    const url = join(CMS_URL, "/api/submissions");

    const res = await fetch(url, {
      method: "POST",
      headers,
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

    const text = await res.text();
    if (!res.ok) {
      console.error("Strapi error:", res.status, text);
      return NextResponse.json(
        { error: "strapi_failed", status: res.status, details: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error("API /contact failed:", e?.message || e);
    return NextResponse.json(
      { error: "server_exception", message: String(e) },
      { status: 500 }
    );
  }
}
