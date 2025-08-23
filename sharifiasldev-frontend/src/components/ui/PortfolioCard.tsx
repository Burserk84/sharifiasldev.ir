import Link from "next/link";
import Image from "next/image";
import type { PortfolioItem } from "@/lib/definitions";

interface PortfolioCardProps {
  post: PortfolioItem;
}

export default function PortfolioCard({ post }: PortfolioCardProps) {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const { title, technologies, slug, coverImage } = post.attributes;

  const imageUrl = coverImage?.data?.attributes?.url
    ? `${STRAPI_URL}${coverImage.data.attributes.url}`
    : "https://placehold.co/600x400/1f2937/f97616?text=No+Image";

  return (
    <Link href={`/portfolio/${slug || post.id}`} className="block group">
      <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg bg-gray-800 transition-transform duration-300 group-hover:-translate-y-2">
        <div className="relative w-full aspect-video">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-100">{title}</h3>
          <p className="mt-2 text-orange-400 text-sm">{technologies}</p>
        </div>
      </div>
    </Link>
  );
}
