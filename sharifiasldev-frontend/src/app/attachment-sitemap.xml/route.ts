import { buildSitemapXml } from "@/lib/sitemap";

/**
 * GET /attachment-sitemap.xml
 * Sitemap for Google Search Console (Page Index). Generated at request time
 * from Strapi so it never goes stale between builds.
 */

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    const xml = await buildSitemapXml();
    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("[attachment-sitemap] build failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
