import { NextResponse } from "next/server";

async function verifyTurnstile(token?: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;
  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const r = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: form,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  const j = (await r.json()) as { success: boolean };
  return !!j.success;
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim();
    const { username, email, password, captcha } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }
    if (!(await verifyTurnstile(captcha, ip))) {
      return NextResponse.json({ error: "captcha_invalid" }, { status: 400 });
    }

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
    const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: "strapi_failed", details: text },
        { status: 502 }
      );
    }
    return NextResponse.json(JSON.parse(text));
  } catch (e) {
    return NextResponse.json({ error: "server_exception", e }, { status: 500 });
  }
}
