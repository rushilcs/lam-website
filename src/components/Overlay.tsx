"use client";

import { motion } from "framer-motion";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Overlay({ isOpen, onClose }: OverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/40 z-40"
      onClick={onClose}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    />
  );
}
