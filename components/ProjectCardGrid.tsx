"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Film,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ProjectItem } from "@/data/content";

interface ProjectCardGridProps {
  projects: ProjectItem[];
}

export default function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      {projects.map((project, idx) => {
        const primaryImage = project.screenshots[0] || project.image;

        return (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            whileHover={{ y: -3, rotateX: 0.6, rotateY: -0.6 }}
            style={{ transformStyle: "preserve-3d" }}
            className="group relative rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-cyan-500/40 flex flex-col justify-between overflow-hidden transition-colors duration-300"
          >
            {/* Top Media Container: Video Clip Preview OR Uncropped Image Frame */}
            <Link
              href={`/projects/${project.slug}`}
              className="block relative overflow-hidden bg-slate-950 border-b border-white/[0.08] aspect-[16/11]"
            >
              {/* Keep available project videos as the animated card preview. */}
              {project.videoUrl ? (
                <div className="relative w-full h-full">
                  <video
                    src={project.videoUrl}
                    poster={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="media-overlay-label absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 text-[10px] font-mono border border-white/10">
                    <Film className="w-3 h-3" />
                    <span>Live Video Demo</span>
                  </div>
                </div>
              ) : (
                /* Dual-layer Uncropped Frame: Ambient blur behind + 100% object-contain in front */
                <div className="relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center p-2">
                  {/* Blurred backdrop ambient layer */}
                  <Image
                    src={primaryImage}
                    alt={`${project.title} background glow`}
                    fill
                    className="object-cover blur-2xl opacity-35 scale-125"
                  />

                  {/* Foreground: 100% full view with NO CROPPING */}
                  <motion.div
                    layoutId={`project-image-${project.slug}`}
                    className="relative w-full h-full flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-[1.03]"
                  >
                    <Image
                      src={primaryImage}
                      alt={project.title}
                      fill
                      priority={idx < 2}
                      className="object-contain"
                    />
                  </motion.div>

                  <div className="media-overlay-label absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 text-[10px] font-mono border border-white/10">
                    <Sparkles className="w-3 h-3" />
                    <span>Full Physical Rig</span>
                  </div>
                </div>
              )}

              {/* Category Pill Over Media */}
              <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
                <span className="media-overlay-label text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-950/85 border border-white/10">
                  {project.category}
                </span>
              </div>

              {/* Year/Timeline badge */}
              <div className="media-overlay-label absolute top-3.5 right-3.5 z-20 text-[11px] font-mono bg-slate-950/85 px-2.5 py-1 rounded-md border border-white/10">
                {project.period}
              </div>
            </Link>

            {/* Card Content Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <Link href={`/projects/${project.slug}`} className="block group/title">
                  <motion.h3
                    layoutId={`project-title-${project.slug}`}
                    className="text-xl sm:text-2xl font-bold text-white group-hover/title:text-cyan-300 transition-colors flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover/title:text-cyan-400 transition-transform group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5" />
                  </motion.h3>
                </Link>

                {/* One-line description */}
                <p className="text-xs sm:text-sm text-teal-800 font-medium leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Overview preview */}
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 5).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-800/80 text-slate-300 border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-800/80 text-slate-400">
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>

              {/* Card Footer with 2 Action Buttons ("Live Demo" and "GitHub") */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target={project.liveDemoUrl.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-teal-900 bg-[#e2eeea] border border-teal-200 hover:bg-[#d8e8e2] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-slate-500/60 transition-all hover:scale-105"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
