import { getPortfolioItemBySlug, getPortfolioItems } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Gallery from "@/components/portfolio/Gallery";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { IPortfolio } from "@/lib/definitions";

/**
 * @file src/app/(site)/portfolio/[slug]/page.tsx
 * @description Renders a portfolio project page, robustly handling multiple data formats.
 */

// --- Technology Processing (Handles all formats) ---
function flattenTechnologies(techs: IPortfolio["technologies"]): string[] {
  if (!techs) return [];
  const allTechs: string[] = [];
  ["frontend", "backend"].forEach((key) => {
    if (techs[key as keyof typeof techs]) {
      Object.values(techs[key as keyof typeof techs]).forEach((tech) => {
        if (Array.isArray(tech)) allTechs.push(...tech);
        else if (typeof tech === "string") allTechs.push(tech);
      });
    }
  });
  return allTechs;
}

function processTechnologies(techData: unknown): string[] {
  if (!techData) return [];
  if (
    typeof techData === "object" &&
    !Array.isArray(techData) &&
    techData !== null
  ) {
    return flattenTechnologies(techData as IPortfolio["technologies"]);
  }
  if (typeof techData === "string") {
    const trimmed = techData.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        return flattenTechnologies(JSON.parse(trimmed));
      } catch (e) {
        return e;
      }
    }
    return trimmed.split(",").map((t) => t.trim());
  }
  return [];
}

// --- Feature Components (Handles both Table and List) ---

function FeaturesList({ features }: { features: string[] | null }) {
  if (!features || features.length === 0) return null;
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-6">ویژگی‌های پروژه</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 list-none p-0">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-x-3 text-lg text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 flex-shrink-0 text-orange-400"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturesTable({
  features,
}: {
  features: { [key: string]: string } | null;
}) {
  if (!features || typeof features !== "object" || Array.isArray(features))
    return null;
  const entries = Object.entries(features);
  if (entries.length === 0) return null;
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-4">ویژگی‌های پروژه</h2>
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        {entries.map(([key, value], index) => (
          <div
            key={key}
            className={`flex justify-between p-4 text-sm ${
              index < entries.length - 1 ? "border-b border-gray-700" : ""
            }`}
          >
            <dt className="text-gray-400">{key}</dt>
            <dd className="font-semibold text-white">{value}</dd>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Page Component ---

function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="bg-gray-700 text-gray-300 text-sm font-medium me-2 px-3 py-1 rounded-full">
      {skill}
    </span>
  );
}

export default async function PortfolioItemPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const itemData = await getPortfolioItemBySlug(slug);
  if (!itemData) notFound();

  const item = itemData.attributes;

  const allItems = await getPortfolioItems();
  const currentIndex = allItems.findIndex((p) => p.id === itemData.id);
  const prevItem = allItems[currentIndex - 1];
  const nextItem = allItems[currentIndex + 1];

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  const imageUrl = item.coverImage?.data?.attributes?.url
    ? `${STRAPI_URL}${item.coverImage.data.attributes.url}`
    : "https://placehold.co/1200x600/1f2937/f97616?text=Project+Image";

  const galleryImages = item.gallery?.data;
  const allTechnologies = processTechnologies(item.technologies);

  // 💡 FIX: Parse features if it's a string, just like technologies.
  let processedFeatures = item.features;
  if (typeof processedFeatures === "string") {
    try {
      processedFeatures = JSON.parse(processedFeatures);
    } catch (e) {
      console.error("Could not parse features string, treating as empty." + e);
      processedFeatures = []; // Fallback to an empty array on error
    }
  }

  const plainTextDescription = Array.isArray(item.description)
    ? item.description
        .map(
          (block: unknown) =>
            block.children?.map((child: unknown) => child.text).join("") || ""
        )
        .join(" ")
        .substring(0, 160) + "..."
    : item.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    url: `https://sharifiasldev.ir/portfolio/${slug}`,
    image: imageUrl,
    description: plainTextDescription,
    author: {
      "@type": "Person",
      name: "امیرعلی شریفی اصل",
      url: "https://sharifiasldev.ir/about",
    },
    keywords: allTechnologies.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-white">{item.title}</h1>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {allTechnologies.map((tech) => (
                <SkillBadge key={tech} skill={tech} />
              ))}
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-12 shadow-lg">
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Main Content */}
          <div className="prose prose-invert lg:prose-xl max-w-none text-right leading-loose">
            {item.description && <BlocksRenderer content={item.description} />}

            {/* Use the newly parsed processedFeatures variable */}
            {Array.isArray(processedFeatures) ? (
              <FeaturesList features={processedFeatures as string[]} />
            ) : (
              <FeaturesTable
                features={processedFeatures as { [key: string]: string }}
              />
            )}

            {galleryImages && galleryImages.length > 0 && (
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  گالری تصاویر
                </h2>
                <Gallery images={galleryImages} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            {item.liveUrl && (
              <Button
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                مشاهده وب‌سایت پروژه
              </Button>
            )}
            {item.repoUrl && (
              <Button
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                مشاهده سورس کد
              </Button>
            )}
          </div>
        </article>

        {/* Navigation */}
        <nav className="flex justify-between items-center mt-24 border-t border-gray-700 pt-8 max-w-4xl mx-auto">
          <div>
            {prevItem && (
              <Link
                href={`/portfolio/${prevItem.attributes.slug || prevItem.id}`}
                className="flex items-center gap-x-2 text-gray-400 hover:text-orange-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>پروژه قبلی</span>
              </Link>
            )}
          </div>
          <div>
            {nextItem && (
              <Link
                href={`/portfolio/${nextItem.attributes.slug || nextItem.id}`}
                className="flex items-center gap-x-2 text-gray-400 hover:text-orange-400 transition-colors"
              >
                <span>پروژه بعدی</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
