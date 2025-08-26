import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/definitions";

interface PostCardProps {
  post: Post;
  className?: string;
}

export default function PostCard({ post, className = "" }: PostCardProps) {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "process.env.NEXT_PUBLIC_STRAPI_URL";

  // Correctly access all data from post.attributes
  const { title, slug, coverImage } = post.attributes;

  const imageUrl = coverImage?.data?.attributes?.url
    ? `${STRAPI_URL}${coverImage.data.attributes.url}`
    : "https://placehold.co/800x600/1f2937/f97616?text=No+Image";

  return (
    <Link
      href={`/blog/${slug || post.id}`}
      className={`relative block group rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 text-right w-full">
        <h2 className="text-2xl font-bold text-white leading-tight">{title}</h2>
      </div>
    </Link>
  );
}
