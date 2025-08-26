"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { StrapiImage } from "@/lib/definitions"; // It's better to use the shared type

interface GalleryProps {
  images: StrapiImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState(-1);
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "process.env.NEXT_PUBLIC_STRAPI_URL";

  const slides = images.map((img) => ({
    src: `${STRAPI_URL}${img.attributes.url}`,
  }));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {images.map((image, i) => (
          <div
            key={image.id}
            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => setIndex(i)}
          >
            <Image
              // Corrected the URL construction here
              src={`${STRAPI_URL}${image.attributes.url}`}
              alt={`Gallery image ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  );
}
