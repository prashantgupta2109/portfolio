"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { CertificateItem } from "@/data/content";

interface CertificateGalleryProps {
  certificates: CertificateItem[];
}

export default function CertificateGallery({
  certificates,
}: CertificateGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const selectedCertificate =
    selectedIndex === null ? null : certificates[selectedIndex];

  const closeLightbox = () => {
    setSelectedIndex(null);
    setZoom(1);
  };

  const showCertificate = (index: number) => {
    setSelectedIndex((index + certificates.length) % certificates.length);
    setZoom(1);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") {
        setSelectedIndex((index) =>
          index === null ? null : (index - 1 + certificates.length) % certificates.length
        );
        setZoom(1);
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((index) =>
          index === null ? null : (index + 1) % certificates.length
        );
        setZoom(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificates.length, selectedIndex]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((certificate, index) => (
          <motion.article
            key={certificate.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -4, rotateX: 1, rotateY: -1 }}
            style={{ transformPerspective: 1000 }}
            className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-[#14191d] transition-colors hover:border-white/20"
          >
            <button
              type="button"
              onClick={() => showCertificate(index)}
              className="relative block aspect-[1.29] w-full overflow-hidden bg-[#101316] text-left"
              aria-label={`View ${certificate.title} fullscreen`}
            >
              <Image
                src={certificate.image}
                alt={`${certificate.title} certificate`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.025]"
                priority={index < 2}
              />
              <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/65 px-3 py-1 text-xs text-slate-200 opacity-0 transition-opacity group-hover:opacity-100">
                Open certificate
              </span>
            </button>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Award className="h-4 w-4 shrink-0 text-[#9ac8c2]" />
                  <span>{certificate.issuer}</span>
                </div>
                <h2 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                  {certificate.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CalendarDays className="h-4 w-4" />
                  <span>{certificate.date}</span>
                </div>
              </div>

            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedCertificate && selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedCertificate.title} certificate`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex flex-col bg-black/90 p-4 backdrop-blur-md sm:p-6"
          >
            <div
              className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white sm:text-base">
                  {selectedCertificate.title}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {selectedCertificate.issuer} · {selectedCertificate.date}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.max(1, current - 0.25))}
                  disabled={zoom <= 1}
                  aria-label="Zoom out"
                  className="rounded-lg border border-white/10 bg-white/[0.06] p-2 text-slate-200 transition-colors hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ZoomOut className="h-5 w-5" />
                </button>
                <span className="min-w-12 text-center text-xs tabular-nums text-slate-300">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.min(2.5, current + 0.25))}
                  disabled={zoom >= 2.5}
                  aria-label="Zoom in"
                  className="rounded-lg border border-white/10 bg-white/[0.06] p-2 text-slate-200 transition-colors hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close certificate viewer"
                  className="ml-1 rounded-lg border border-white/10 bg-white/[0.06] p-2 text-slate-200 transition-colors hover:bg-white/[0.12]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center justify-center overflow-auto py-5"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => showCertificate(selectedIndex - 1)}
                aria-label="Previous certificate"
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-2 text-white transition-colors hover:bg-black/85 sm:left-3 sm:p-3"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="relative h-full max-h-[calc(100dvh-10rem)] w-full max-w-[calc(100%-5rem)]">
                <Image
                  src={selectedCertificate.image}
                  alt={`${selectedCertificate.title} certificate`}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain transition-transform duration-200"
                  style={{ transform: `scale(${zoom})` }}
                />
              </div>

              <button
                type="button"
                onClick={() => showCertificate(selectedIndex + 1)}
                aria-label="Next certificate"
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-2 text-white transition-colors hover:bg-black/85 sm:right-3 sm:p-3"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <p className="pb-1 text-center text-xs text-slate-500">
              Use ← and → to browse, Esc to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
