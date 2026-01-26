"use client";

import { useState } from "react";
import { WorkItem } from "@/content/content";
import WorkCard from "./WorkCard";
import ExpandableCardModal from "./ExpandableCardModal";

interface CardGridProps {
  items: WorkItem[];
}

export default function CardGrid({ items }: CardGridProps) {
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (item: WorkItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Small delay to allow exit animation
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((item) => (
          <WorkCard key={item.id} item={item} onClick={() => handleCardClick(item)} />
        ))}
      </div>
      <ExpandableCardModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </>
  );
}
