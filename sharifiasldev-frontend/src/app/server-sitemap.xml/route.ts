import { buildSitemapXml } from "@/lib/sitemap";

/**
 * GET /server-sitemap.xml
 * Referenced by robots.txt and the sitemap index in public/sitemap.xml;
 * it used to 404 because no route backed it. Same content builder as
 * /attachment-sitemap.xml.
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
    console.error("[server-sitemap] build failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
