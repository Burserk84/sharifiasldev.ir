import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/definitions";

export default function ProductCard({ product }: { product: Product }) {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "process.env.NEXT_PUBLIC_STRAPI_URL";

  // Access all properties via the 'attributes' object
  const { name, price, productImage, slug } = product.attributes;

  const imageUrl = productImage?.data?.[0]?.attributes?.url
    ? `${STRAPI_URL}${productImage.data[0].attributes.url}`
    : "https://placehold.co/600x400/1f2937/f97616?text=No+Image";

  const formattedPrice = new Intl.NumberFormat("fa-IR", {
    /* ... */
  })
    .format(price)
    .replace("ریال", "تومان");

  return (
    <Link href={`/product/${slug}`} className="block group">
      <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg bg-gray-800 transition-transform duration-300 group-hover:-translate-y-2">
        <div className="relative w-full aspect-video">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-100 flex-grow">{name}</h3>
          <p className="mt-4 text-2xl font-bold text-orange-400 text-left">
            {formattedPrice}
          </p>
        </div>
      </div>
    </Link>
  );
}
