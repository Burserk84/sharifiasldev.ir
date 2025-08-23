"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { StrapiImage } from "@/lib/definitions";

interface ProductGalleryProps {
  mainImage: StrapiImage;
  galleryImages: StrapiImage[];
}

export default function ProductGallery({
  mainImage,
  galleryImages,
}: ProductGalleryProps) {
  const allImages = [mainImage, ...galleryImages];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const slides = allImages.map((img) => ({ src: `${STRAPI_URL}${img.url}` }));

  return (
    <div>
      {/* Main Image Display */}
      <div
        className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={`${STRAPI_URL}${allImages[activeIndex].url}`}
          alt="Main product image"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw" // Add this
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-4 mt-4">
        {allImages.map((image, index) => (
          <div
            // --- KEY CHANGE HERE ---
            // Combine the id and index to create a guaranteed unique key
            key={`${image.id}-${index}`}
            className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
              activeIndex === index ? "border-orange-400" : "border-transparent"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={`${STRAPI_URL}${image.url}`}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="20vw" // Add this
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        index={activeIndex}
        close={() => setLightboxOpen(false)}
        slides={slides}
      />
    </div>
  );
}
