import { getPortfolioItemBySlug, getPortfolioItems } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Gallery from "@/components/portfolio/Gallery";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

/**
 * @file src/app/(site)/portfolio/[slug]/page.tsx
 * @description Renders a single, dynamic portfolio project page with full details.
 */

// Helper component for skill badges
function SkillBadge({ skill }: { skill: string }) {
  return (
    <span className="bg-gray-700 text-gray-300 text-sm font-medium me-2 px-3 py-1 rounded-full">
      {skill}
    </span>
  );
}

// Helper component for the features table
function FeaturesTable({
  features,
}: {
  features: { [key: string]: string } | null;
}) {
  if (!features) return null;
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

export default async function PortfolioItemPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const itemData = await getPortfolioItemBySlug(slug);

  if (!itemData) {
    notFound();
  }

  const item = itemData.attributes;

  const allItems = await getPortfolioItems();
  const currentIndex = allItems.findIndex((p) => p.id === itemData.id);
  const prevItem = allItems[currentIndex - 1];
  const nextItem = allItems[currentIndex + 1];

  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "process.env.NEXT_PUBLIC_STRAPI_URL";
  const imageUrl = item.coverImage?.data?.attributes?.url
    ? `${STRAPI_URL}${item.coverImage.data.attributes.url}`
    : "https://placehold.co/1200x600/1f2937/f97616?text=Project+Image";

  const galleryImages = item.gallery?.data;
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
    keywords: item.technologies, // Use the technologies as keywords
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
              {item.technologies.split(",").map((tech) => (
                <SkillBadge key={tech.trim()} skill={tech.trim()} />
              ))}
            </div>
          </div>

          {/* Cover Image */}
          {imageUrl && (
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
          )}

          {/* Main Content: Description, Features, and Gallery */}
          <div className="prose prose-invert lg:prose-xl max-w-none text-right leading-loose">
            {item.description && <BlocksRenderer content={item.description} />}

            <FeaturesTable features={item.features} />

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
            <a
              href="/Amirali-Sharifi-Asl-Resume.pdf"
              download="Amirali-Sharifi-Asl-Resume.pdf"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 bg-transparent border border-gray-500 text-gray-200 hover:bg-gray-700 h-11 px-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
              دانلود رزومه
            </a>
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
