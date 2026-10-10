/**
 * @file src/lib/sitemap.ts
 * @description Shared XML sitemap builder used by the runtime sitemap routes:
 *   - /server-sitemap.xml     (referenced by robots.txt + the sitemap index)
 *   - /attachment-sitemap.xml (the URL Google Page Index expects)
 *
 * Static (indexable) pages are always emitted; dynamic entries are fetched
 * from Strapi at request time on a best-effort basis, so a Strapi outage
 * never turns the sitemap into a 5xx — it just returns the static subset.
 */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sharifiasldev.ir"
).replace(/\/+$/, "");

/** Indexable static pages (auth/dashboard/search are intentionally omitted). */
const STATIC_PATHS = ["/", "/about", "/contact", "/blog", "/portfolio", "/products"];

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
};

type StrapiItem = {
  id: number;
  slug?: string;
  updatedAt?: string;
};

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Fetch one Strapi collection (paginated) as flattened attribute objects.
 * Returns [] on any failure so the sitemap degrades gracefully.
 */
async function fetchCollection(path: string): Promise<StrapiItem[]> {
  const base =
    (typeof window === "undefined" ? process.env.STRAPI_URL : undefined) ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://127.0.0.1:1337";

  const items: StrapiItem[] = [];
  let page = 1;
  let pageCount = 1;

  try {
    do {
      const url = `${base}/api${path}${
        path.includes("?") ? "&" : "?"
      }pagination[page]=${page}&pagination[pageSize]=100`;
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        console.warn(`[sitemap] ${path} responded ${res.status}`);
        return [];
      }
      const json = await res.json();
      pageCount = json?.meta?.pagination?.pageCount ?? 1;
      for (const entry of json?.data ?? []) {
        items.push({ id: entry.id, ...entry.attributes });
      }
      page += 1;
    } while (page <= pageCount && page <= 50);
  } catch (error) {
    console.warn(`[sitemap] failed to fetch ${path}:`, error);
    return [];
  }

  return items;
}

/** Collection slug -> URL prefix mapping for the public routes. */
const DYNAMIC_SOURCES: Array<{
  path: string;
  toUrl: (item: StrapiItem) => string | null;
}> = [
  // /blog/[slug]
  {
    path: "/posts",
    toUrl: (item) => (item.slug ? `/blog/${item.slug}` : null),
  },
  // /portfolio/[slug]
  {
    path: "/portfolios",
    toUrl: (item) => (item.slug ? `/portfolio/${item.slug}` : null),
  },
  // /product/[slug]
  {
    path: "/products",
    toUrl: (item) => (item.slug ? `/product/${item.slug}` : null),
  },
  // /products/[...slug] category pages
  {
    path: "/categories",
    toUrl: (item) => (item.slug ? `/products/${item.slug}` : null),
  },
];

/** Builds the deduplicated, sorted list of indexable URL entries. */
export async function buildSitemapEntries(): Promise<SitemapEntry[]> {
  const byLoc = new Map<string, SitemapEntry>();

  for (const path of STATIC_PATHS) {
    byLoc.set(`${SITE_URL}${path}`, { loc: `${SITE_URL}${path}` });
  }

  const collections = await Promise.all(
    DYNAMIC_SOURCES.map((source) => fetchCollection(source.path))
  );

  DYNAMIC_SOURCES.forEach((source, index) => {
    for (const item of collections[index]) {
      const path = source.toUrl(item);
      if (!path) continue;
      const loc = `${SITE_URL}${path}`;
      byLoc.set(loc, {
        loc,
        lastmod: item.updatedAt ? new Date(item.updatedAt).toISOString() : undefined,
      });
    }
  });

  return Array.from(byLoc.values()).sort((a, b) => a.loc.localeCompare(b.loc));
}

/** Renders the entries as a sitemap.org urlset document. */
export function renderUrlset(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `\n<lastmod>${xmlEscape(entry.lastmod)}</lastmod>`
        : "";
      return `<url>\n<loc>${xmlEscape(entry.loc)}</loc>${lastmod}\n</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** One-shot helper: fetch entries and render the XML document. */
export async function buildSitemapXml(): Promise<string> {
  return renderUrlset(await buildSitemapEntries());
}
