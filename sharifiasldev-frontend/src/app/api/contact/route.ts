import { NextResponse } from "next/server";

function reqUrl(base: string, path: string) {
  const u = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${u}${path}`;
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

    const CMS_URL = process.env.CMS_URL;
    const CMS_TOKEN = process.env.CMS_TOKEN;

    if (!CMS_URL)
      return NextResponse.json({ error: "missing_CMS_URL" }, { status: 500 });
    if (!CMS_TOKEN)
      return NextResponse.json({ error: "missing_CMS_TOKEN" }, { status: 500 });

    const url = reqUrl(CMS_URL, "/api/submissions");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CMS_TOKEN}`,
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

    const text = await res.text(); // همیشه متن برگردانیم برای دیباگ
    if (!res.ok) {
      console.error("Strapi error:", res.status, text);
      return NextResponse.json(
        { error: "strapi_failed", status: res.status, details: text, url },
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
