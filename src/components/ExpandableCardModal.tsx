"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, Maximize2, Minimize2 } from "lucide-react";
import Image from "next/image";
import { WorkItem } from "@/content/content";
import Overlay from "./Overlay";

interface ExpandableCardModalProps {
  item: WorkItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpandableCardModal({
  item,
  isOpen,
  onClose,
}: ExpandableCardModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Lock scroll
      document.body.classList.add("modal-open");
      // Focus management
      closeButtonRef.current?.focus();
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose, isFullscreen]);

  // Reset fullscreen when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
    }
  }, [isOpen]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {!isFullscreen && <Overlay isOpen={isOpen} onClose={onClose} />}
          <div
            className={`fixed z-50 ${
              isFullscreen
                ? "inset-0"
                : "inset-0 flex items-center justify-center p-2 md:p-4"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              ref={modalRef}
              layoutId={`card-${item.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`relative bg-background overflow-hidden transition-all duration-300 ${
                isFullscreen
                  ? "w-screen h-screen rounded-none"
                  : "w-full max-w-[80vw] h-[80vh] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fullscreen toggle button - top left */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(!isFullscreen);
                }}
                className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20 flex items-center justify-center"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-foreground/60" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-foreground/60" />
                )}
              </button>

              {/* Star icon at top center */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Star className="w-4 h-4 text-foreground/30" fill="currentColor" />
              </div>

              {/* Close button - bottom left with chevron */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute bottom-4 left-4 z-10 w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20 flex items-center justify-center"
                aria-label="Close modal"
              >
                <ChevronDown className="w-5 h-5 text-foreground/60" />
              </button>

              {/* Category tag - bottom right */}
              {item.categories.length > 0 && (
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="px-4 py-2 rounded-full bg-foreground/5 text-sm text-foreground/70 font-medium">
                    {item.categories[0]}
                  </span>
                </div>
              )}

              {/* Scrollable Content */}
              <div className="overflow-y-auto h-full pt-8 pb-16">
                <div className="px-8 md:px-12 lg:px-16">
                  {/* Two Column Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 py-8 md:py-12">
                    {/* Left Column - Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="lg:col-span-2"
                    >
                      <h2
                        id="modal-title"
                        className="text-3xl md:text-4xl font-semibold mb-6 text-foreground"
                      >
                        {item.title}
                      </h2>
                      <div className="text-foreground/80 leading-relaxed">
                        {item.detailContent.split("\n\n").map((para, idx) => {
                          if (para.startsWith("**") && para.endsWith("**")) {
                            return (
                              <h3
                                key={idx}
                                className="text-lg font-semibold mt-6 mb-3 first:mt-0 text-foreground"
                              >
                                {para.slice(2, -2)}
                              </h3>
                            );
                          }
                          return (
                            <p key={idx} className="mb-4">
                              {para}
                            </p>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Right Column - Metadata */}
                    {item.metadata && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                      >
                        {item.metadata.role && (
                          <div>
                            <div className="text-sm font-semibold text-foreground mb-2">
                              Role
                            </div>
                            <div className="text-sm text-foreground/70 leading-relaxed">
                              {item.metadata.role}
                            </div>
                          </div>
                        )}

                        {item.metadata.team && (
                          <div>
                            <div className="text-sm font-semibold text-foreground mb-2">
                              Team
                            </div>
                            <div className="text-sm text-foreground/70 leading-relaxed">
                              {item.metadata.team}
                            </div>
                          </div>
                        )}

                        {item.metadata.recognition && (
                          <div>
                            <div className="text-sm font-semibold text-foreground mb-2">
                              Recognition
                            </div>
                            <div className="text-sm text-foreground/70 leading-relaxed">
                              {item.metadata.recognition}
                            </div>
                          </div>
                        )}

                        {item.metadata.responsibilities && (
                          <div>
                            <div className="text-sm font-semibold text-foreground mb-2">
                              Responsibilities
                            </div>
                            <div className="text-sm text-foreground/70 leading-relaxed">
                              {item.metadata.responsibilities}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Images Section */}
                  {item.images && item.images.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-12 md:mt-16 pb-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {item.images.map((imageSrc, idx) => (
                          <div
                            key={idx}
                            className="relative w-full rounded-lg bg-gray-50 p-2 group flex items-center justify-center"
                          >
                            <Image
                              src={imageSrc}
                              alt={`${item.title} - Image ${idx + 1}`}
                              width={1200}
                              height={1600}
                              className="max-w-full h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
