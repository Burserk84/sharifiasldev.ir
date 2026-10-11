import type { DescriptionBlock } from "./definitions";

/**
 * @file src/lib/format.ts
 * @description Small shared formatting helpers used by the homepage and the
 * portfolio page so their display logic never drifts apart.
 */

/** Converts Latin digits to Persian digits for display. */
export function toPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/**
 * First paragraph of a Strapi blocks description, trimmed for hero cards.
 * Returns null when there is no usable paragraph.
 */
export function extractBlurb(
  blocks: DescriptionBlock[] | null,
  maxLength = 100
): string | null {
  if (!Array.isArray(blocks)) return null;
  const paragraph = blocks.find((block) => block?.type === "paragraph");
  const text = paragraph?.children?.map((child) => child.text).join(" ").trim();
  if (!text) return null;
  return text.length > maxLength
    ? `${text.slice(0, maxLength).trimEnd()}…`
    : text;
}
