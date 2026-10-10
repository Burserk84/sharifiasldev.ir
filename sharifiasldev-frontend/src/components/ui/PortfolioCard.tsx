import Link from "next/link";
import Image from "next/image";
import { IPortfolioItem } from "@/lib/definitions";

/**
 * @file src/components/ui/PortfolioCard.tsx
 * @description A card component to display a summary of a portfolio item.
 * @updated Now robustly handles multiple data formats for technologies.
 */

// Helper function to process all possible technology formats
function processTechnologies(techData: unknown): string[] {
  if (!techData) return [];

  // Case 1: It's a valid object (new format)
  if (
    typeof techData === "object" &&
    !Array.isArray(techData) &&
    techData !== null
  ) {
    const allTechs: string[] = [];
    const technologies = techData as { frontend?: unknown; backend?: unknown };
    if (technologies.frontend) {
      Object.values(technologies.frontend).forEach((tech) => {
        if (Array.isArray(tech)) allTechs.push(...tech);
        else if (typeof tech === "string") allTechs.push(tech);
      });
    }
    if (technologies.backend) {
      Object.values(technologies.backend).forEach((tech) => {
        if (Array.isArray(tech)) allTechs.push(...tech);
        else if (typeof tech === "string") allTechs.push(tech);
      });
    }
    return allTechs;
  }

  // Case 2: It's a string
  if (typeof techData === "string") {
    const trimmed = techData.trim();
    // Sub-case A: It's a stringified JSON object
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        return processTechnologies(parsed); // Recursively process the parsed object
      } catch {
        return trimmed.split(",").map((t) => t.trim()); // Graceful fallback
      }
    }
    // Sub-case B: It's a simple comma-separated string (old format)
    return trimmed.split(",").map((t) => t.trim());
  }

  return [];
}

export default function PortfolioCard({ post }: { post: IPortfolioItem }) {
  const item = post.attributes;
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  const imageUrl = item.coverImage?.data?.attributes?.url
    ? `${STRAPI_URL}${item.coverImage.data.attributes.url}`
    : "https://placehold.co/600x400/1f2937/f97616?text=Image";

  const allTechnologies = processTechnologies(item.technologies);

  const plainTextDescription = Array.isArray(item.description)
    ? item.description
        .map(
          (block: unknown) =>
            block.children?.map((child: unknown) => child.text).join("") || ""
        )
        .join(" ")
        .substring(0, 100) + "..."
    : item.title;

  return (
    <Link href={`/portfolio/${item.slug}`}>
      <div className="group flex h-full flex-col rounded-2xl overflow-hidden bg-gray-800 ring-1 ring-white/5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:ring-orange-400/40 hover:shadow-2xl hover:shadow-orange-500/10">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
            {item.title}
          </h3>
          <p className="mt-2 text-gray-400 text-sm leading-relaxed">
            {plainTextDescription}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {allTechnologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                dir="ltr"
                className="bg-white/5 border border-white/10 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full transition-colors group-hover:border-orange-400/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
