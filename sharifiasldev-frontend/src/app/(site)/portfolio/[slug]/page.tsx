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
 * @description Renders a single, dynamic portfolio project page with full details.
 * @updated To handle structured JSON for features and technologies.
 */

// Helper to flatten the complex technologies object into a single array of strings
function flattenTechnologies(
  technologies: IPortfolio["technologies"]
): string[] {
  if (!technologies) return [];

  const allTechs: string[] = [];

  // Process frontend technologies
  if (technologies.frontend) {
    Object.values(technologies.frontend).forEach((tech) => {
      if (Array.isArray(tech)) {
        allTechs.push(...tech);
      } else if (typeof tech === "string") {
        allTechs.push(tech);
      }
    });
  }

  // Process backend technologies
  if (technologies.backend) {
    Object.values(technologies.backend).forEach((tech) => {
      if (Array.isArray(tech)) {
        allTechs.push(...tech);
      } else if (typeof tech === "string") {
        allTechs.push(tech);
      }
    });
  }

  return allTechs;
}

function FeaturesList({ features }: { features: unknown }) {
  if (!Array.isArray(features) || features.length === 0) {
    return null;
  }

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
            <span>{typeof feature === "string" ? feature : ""}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helper component for skill badges
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

  if (!itemData) {
    notFound();
  }

  const item = itemData.attributes;

  // Process navigation items
  const allItems = await getPortfolioItems();
  const currentIndex = allItems.findIndex((p) => p.id === itemData.id);
  const prevItem = allItems[currentIndex - 1];
  const nextItem = allItems[currentIndex + 1];

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  const imageUrl = item.coverImage?.data?.attributes?.url
    ? `${STRAPI_URL}${item.coverImage.data.attributes.url}`
    : "https://placehold.co/1200x600/1f2937/f97616?text=Project+Image";

  const galleryImages = item.gallery?.data;

  // 💡 FIX: Parse technologies if it's a string
  const technologiesObject =
    typeof item.technologies === "string"
      ? JSON.parse(item.technologies)
      : item.technologies;

  // Flatten technologies using the parsed object
  const allTechnologies = flattenTechnologies(technologiesObject);

  // Generate plain text description for SEO
  const plainTextDescription = item.description
    ? item.description
        .map(
          (block) => block.children?.map((child) => child.text).join("") || ""
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

          {/* Main Content: Description, Features, and Gallery */}
          <div className="prose prose-invert lg:prose-xl max-w-none text-right leading-loose">
            {item.description && <BlocksRenderer content={item.description} />}

            <FeaturesList features={item.features} />

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

        {/* Next/Previous Project Navigation */}
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
