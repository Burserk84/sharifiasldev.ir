// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

async function verifyTurnstile(token: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { success: false, "error-codes": ["missing_secret"] };

  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  const resp = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: form,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  return resp.json() as Promise<{
    success: boolean;
    ["error-codes"]?: string[];
  }>;
}

function join(base: string, path: string) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${b}${path}`;
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim();
    const body = await req.json();

    const {
      name,
      email,
      message,
      purpose = "consultation",
      proposedBudget,
      techStack,
      source = "contact-page",
      captcha, // ⬅️ از فرانت
    } = body || {};

    // 1) Validate body
    if (!name || !email || !message) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }
    if (purpose === "project" && (!proposedBudget || !techStack)) {
      return NextResponse.json(
        { error: "need_project_fields" },
        { status: 400 }
      );
    }
    if (!captcha) {
      return NextResponse.json({ error: "captcha_required" }, { status: 400 });
    }

    // 2) Verify CAPTCHA
    const captchaRes = await verifyTurnstile(captcha, ip);
    if (!captchaRes.success) {
      return NextResponse.json(
        { error: "captcha_invalid", details: captchaRes["error-codes"] || [] },
        { status: 400 }
      );
    }

    // 3) Forward to Strapi
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
    return NextResponse.json({ error: "server_exception" }, { status: 500 });
  }
}
