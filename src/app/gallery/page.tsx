import type { Metadata } from "next";
import Image from "next/image";
import { galleryImages } from "@/content/content";

export const metadata: Metadata = {
  title: "Gallery | Lakshmi Mulgund",
  description: "Photo gallery by Lakshmi Mulgund",
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-12 tracking-tight">
        Gallery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group cursor-pointer"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
