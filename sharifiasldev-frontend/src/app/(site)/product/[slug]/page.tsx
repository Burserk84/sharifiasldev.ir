import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getProductBySlug } from "@/lib/api";
import ProductGallery from "@/components/products/ProductGallery";
import type { Metadata } from "next";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const productData = await getProductBySlug(slug);

  if (!productData) {
    return {
      title: "Product Not Found",
    };
  }
  const product = productData.attributes;

  const plainTextDescription = product.description
    ? product.description
        .map(
          (block) => block.children?.map((child) => child.text).join("") || ""
        )
        .join(" ")
        .substring(0, 155) + "..."
    : `اطلاعات بیشتر و دانلود محصول ${product.name} از شریف اصل Dev.`;

  return {
    title: `${product.name} | SharifiaslDev`,
    description: plainTextDescription,
  };
}

// A component for the details table
function DetailsTable({
  details,
}: {
  details: { [key: string]: string | string[] } | null;
}) {
  if (!details) return null;

  const entries = Object.entries(details);
  if (entries.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        {entries.map(([key, value], index) => (
          <div
            key={key}
            className={`p-4 ${
              index < entries.length - 1 ? "border-b border-gray-700" : ""
            }`}
          >
            <dt className="text-gray-400 text-sm">{key}</dt>
            <dd className="font-semibold text-white mt-1">
              {Array.isArray(value) ? (
                <ul className="space-y-1 pt-1">
                  {value.map((item, i) => (
                    <li key={i} className="flex items-center gap-x-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                // Otherwise, just display the string value
                value
              )}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SingleProductPage({ params }: Props) {
  const { slug } = await params;
  const productData = await getProductBySlug(slug);

  if (!productData) {
    notFound();
  }

  const product = productData.attributes;
  const {
    name,
    price,
    description,
    productImage,
    gallery,
    details,
    paymentLink,
  } = product;

  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "process.env.NEXT_PUBLIC_STRAPI_URL";
  const mainImage = productImage?.data?.[0];
  const mainImageUrl = mainImage
    ? `${STRAPI_URL}${mainImage.attributes.url}`
    : null;
  const galleryImages = gallery?.data;

  const plainTextDescription = product.description
    ? product.description
        .map(
          (block) => block.children?.map((child) => child.text).join("") || ""
        )
        .join(" ")
        .substring(0, 500)
    : `اطلاعات بیشتر و دانلود محصول ${product.name} از شریف اصل Dev.`;

  const formattedPrice = new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("ریال", "تومان");

  // ✨ JSON-LD Structured Data for Product
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: name,
    image: mainImageUrl,
    description: plainTextDescription,
    sku: productData.id, // Using the Strapi entry ID as a SKU
    brand: {
      "@type": "Brand",
      name: "SharifiaslDev",
    },
    offers: {
      "@type": "Offer",
      url: paymentLink,
      priceCurrency: "IRR", // Zarinpal often uses IRR
      price: price,
      availability: "https://schema.org/InStock", // Digital products are always in stock
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <div>
            {mainImage && galleryImages ? (
              <ProductGallery
                mainImage={mainImage.attributes}
                galleryImages={galleryImages.map((img) => img.attributes)}
              />
            ) : mainImage ? (
              <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={mainImageUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-center text-gray-500">No Image</p>
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className="text-right">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              {name}
            </h1>
            <p className="mt-4 text-4xl font-bold text-orange-400">
              {formattedPrice}
            </p>

            {paymentLink && (
              <div className="mt-8">
                <Button
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="w-full"
                >
                  خرید و دانلود محصول
                </Button>
              </div>
            )}

            <DetailsTable details={details} />

            {description && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  توضیحات محصول
                </h2>
                <div className="prose prose-invert max-w-none text-right leading-relaxed">
                  <BlocksRenderer content={description} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
