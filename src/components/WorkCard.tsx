"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WorkItem } from "@/content/content";

interface WorkCardProps {
  item: WorkItem;
  onClick: () => void;
}

export default function WorkCard({ item, onClick }: WorkCardProps) {
  return (
    <motion.div
      layoutId={`card-${item.id}`}
      className="group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
    >
      <div className="bg-background border border-border rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-lg">
        {item.coverImage && (
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
            <Image
              src={item.coverImage}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={item.id === "1"}
            />
          </div>
        )}
        <div className="p-6">
          {/* Top text - categories */}
          <div className="flex flex-wrap gap-2 mb-2">
            {item.categories.map((category) => (
              <span
                key={category}
                className="text-xs text-foreground/60 uppercase tracking-wide"
              >
                {category}
              </span>
            ))}
          </div>
          {/* Main title */}
          <h3 className="text-xl font-semibold mb-2 group-hover:text-foreground/80 transition-colors">
            {item.title}
          </h3>
          {/* Text below - short description */}
          <p className="text-sm text-foreground/70 leading-relaxed">
            {item.shortDescription}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
