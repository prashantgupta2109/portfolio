"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Layers,
  Sparkles,
  Cpu,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Activity,
  BrainCircuit,
  Search,
  ShieldCheck,
  FileText,
  Wifi,
  Film,
  Play,
} from "lucide-react";
import { ProjectItem } from "@/data/content";

interface ProjectCaseStudyClientProps {
  project: ProjectItem;
  prevProject: ProjectItem;
  nextProject: ProjectItem;
}

const iconMap: Record<string, any> = {
  BrainCircuit,
  Search,
  Cpu,
  ShieldCheck,
  FileText,
  Sparkles,
  CheckCircle2,
  Activity,
  Wifi,
};

export default function ProjectCaseStudyClient({
  project,
  prevProject,
  nextProject,
}: ProjectCaseStudyClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"video" | "screenshot">(
    project.videoUrl ? "video" : "screenshot"
  );

  const heroImage = project.screenshots[0] || project.image;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + project.screenshots.length) % project.screenshots.length);
  };

  const nextLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % project.screenshots.length);
  };

  const isSmartGlove = project.slug === "tinyml-smart-glove";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      
      {/* Top Breadcrumb & Live Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Projects</span>
        </Link>

        <div className="flex items-center gap-3">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target={project.liveDemoUrl.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-teal-900 bg-[#e2eeea] border border-teal-200 hover:bg-[#d8e8e2] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Live Demo</span>
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 border border-white/10 hover:border-cyan-500/40 transition-all hover:scale-105"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>

      {/* 1. Hero: Full-Width Dashboard in Browser-Window Mockup Frame (Uncropped & Video Enabled) */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">{project.period}</span>

            {project.videoUrl && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/30">
                <Film className="w-3.5 h-3.5" />
                <span>Video Demonstration Available</span>
              </span>
            )}
          </div>

          <motion.h1
            layoutId={`project-title-${project.slug}`}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            {project.title}
          </motion.h1>

          <p className="text-base sm:text-xl text-cyan-400 font-medium">
            {project.subtitle}
          </p>
        </div>

        {/* Browser Mockup Frame with Shared Element Transition */}
        <div className="rounded-3xl bg-slate-900/90 border border-white/[0.12] overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Browser Header Bar */}
          <div className="px-5 py-3.5 bg-slate-950/90 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.06] text-xs font-mono text-slate-400 max-w-sm truncate">
              <span className="text-emerald-400">https://</span>
              <span>{project.slug}.streamlit.app/</span>
            </div>

            {/* View Mode Switcher if Video Exists */}
            <div className="flex items-center gap-2">
              {project.videoUrl ? (
                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-white/10 text-xs">
                  <button
                    onClick={() => setViewMode("video")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      viewMode === "video" ? "bg-cyan-500 text-white font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Video Demo
                  </button>
                  <button
                    onClick={() => setViewMode("screenshot")}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      viewMode === "screenshot" ? "bg-cyan-500 text-white font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Screenshot
                  </button>
                </div>
              ) : (
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {isSmartGlove ? "100% Uncropped Rig" : "Live Studio"}
                </span>
              )}
            </div>
          </div>

          {/* Full-width Media Viewport (Uncropped for Smart Glove, Video for Copilot/StatementIQ) */}
          {project.videoUrl && viewMode === "video" ? (
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <video
                src={project.videoUrl}
                poster={heroImage}
                controls
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            /* Dual-layer Uncropped Frame for All Images (Smart Glove & Dashboards) */
            <motion.div
              layoutId={`project-image-${project.slug}`}
              onClick={() => openLightbox(0)}
              className={`relative w-full bg-slate-950 cursor-pointer group overflow-hidden flex items-center justify-center p-3 sm:p-6 ${
                isSmartGlove ? "h-96 sm:h-[620px]" : "h-72 sm:h-[500px]"
              }`}
            >
              {/* Blurred background ambient layer */}
              <Image
                src={heroImage}
                alt={`${project.title} background ambient glow`}
                fill
                className="object-cover blur-3xl opacity-35 scale-125 pointer-events-none"
              />

              {/* Foreground: 100% Full Uncropped Image */}
              <div className="relative w-full h-full z-10 flex items-center justify-center">
                <Image
                  src={heroImage}
                  alt={project.title}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
                />
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-white/20 text-xs font-semibold text-white flex items-center gap-2 shadow-2xl backdrop-blur-md">
                  <Maximize2 className="w-4 h-4 text-cyan-400" />
                  <span>Click to Expand Full-Screen Lightbox</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* 2. Overview (Problem & Solution Cards) */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>Project Overview &amp; Background</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
          {project.overview}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Problem */}
          <div className="p-7 rounded-2xl bg-red-950/20 border border-red-500/20 backdrop-blur-md space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>The Core Bottleneck</span>
            </div>
            <h3 className="text-lg font-bold text-white">Problem Statement</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="p-7 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 backdrop-blur-md space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Engineered Approach</span>
            </div>
            <h3 className="text-lg font-bold text-white">Engineered Solution</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Key Features (Bullet Cards) */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Core Capabilities &amp; System Features</span>
        </div>
        <h3 className="text-2xl font-bold text-white">Key Technical Features</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.keyFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-800/40 border border-white/[0.04]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Tech Stack */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Tech Stack &amp; Frameworks</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Architecture / Flow Diagram (Animated) */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Animated Pipeline Architecture</span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800/40">
            Conduit Flow
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white">End-to-End Execution Pipeline</h3>

        {/* Animated Sequential Conduit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {project.architectureFlow.map((flow, idx) => {
            const IconComp = iconMap[flow.icon] || Cpu;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-800/50 border border-cyan-500/30 flex flex-col justify-between space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                    STAGE 0{flow.step}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{flow.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{flow.desc}</p>
                </div>

                {/* Animated connector line between pipeline stages */}
                {idx < project.architectureFlow.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 z-10 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Results / Metrics */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Quantitative Benchmarks &amp; Results</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-md space-y-1"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-300 font-mono">
                {m.value}
              </div>
              <div className="text-xs text-slate-300 font-semibold">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Image Gallery (Multiple Screenshots with Lightbox - Uncropped) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Project Screenshot &amp; Hardware Gallery</span>
            </h3>
            <p className="text-xs text-slate-400">Click any image to inspect in full uncropped resolution.</p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {project.screenshots.length} Views
          </span>
        </div>

        {/* Thumbnails Grid (object-contain with dark matte background to prevent ANY cropping) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {project.screenshots.map((src, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="relative h-60 rounded-2xl overflow-hidden border border-white/[0.08] hover:border-cyan-400/60 bg-slate-950 cursor-pointer group shadow-lg transition-all flex items-center justify-center p-2"
            >
              {/* Blurred background ambient copy */}
              <Image
                src={src}
                alt={`${project.title} screenshot ${idx + 1}`}
                fill
                className="object-cover blur-xl opacity-25 scale-125"
              />

              {/* Centered uncropped foreground image */}
              <div className="relative w-full h-full z-10 flex items-center justify-center">
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                <div className="p-2 rounded-xl bg-slate-900/90 text-white border border-white/20">
                  <Maximize2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-sm text-[10px] font-mono text-slate-300 border border-white/10 z-20">
                View #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal (Uncropped Contain Mode) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full h-[85vh] flex flex-col justify-between"
            >
              {/* Top Controls */}
              <div className="flex items-center justify-between text-white pb-3">
                <span className="text-sm font-semibold text-cyan-300">
                  {project.title} &bull; Image {lightboxIndex + 1} of {project.screenshots.length} (Full Uncropped Resolution)
                </span>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Expanded Image (100% Object Contain) */}
              <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-white/20 bg-slate-950 flex items-center justify-center p-2">
                <Image
                  src={project.screenshots[lightboxIndex]}
                  alt={`${project.title} large uncropped view`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Bottom Arrows / Navigation */}
              <div className="flex items-center justify-between pt-3">
                <button
                  onClick={prevLightboxImage}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-xs text-slate-400 font-mono">
                  Use arrows or click outside to dismiss
                </span>

                <button
                  onClick={nextLightboxImage}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Next / Previous Project Navigation */}
      <div className="pt-12 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous */}
        <Link
          href={`/projects/${prevProject.slug}`}
          className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-cyan-500/40 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Previous Project</span>
            </span>
            <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              {prevProject.title}
            </div>
          </div>
        </Link>

        {/* Next */}
        <Link
          href={`/projects/${nextProject.slug}`}
          className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-cyan-500/40 transition-all flex items-center justify-between group text-right sm:text-right"
        >
          <div className="space-y-1 ml-auto">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1">
              <span>Next Project</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              {nextProject.title}
            </div>
          </div>
        </Link>
      </div>

    </div>
  );
}
