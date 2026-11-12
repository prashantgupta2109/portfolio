"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Sparkles, Cpu, Layers } from "lucide-react";
import { ProjectItem } from "@/data/content";

interface ProjectFilterClientProps {
  initialProjects: ProjectItem[];
}

const categories = [
  "All",
  "Generative AI",
  "TinyML & Edge AI",
  "Machine Learning",
  "NLP & Analytics",
];

export default function ProjectFilterClient({ initialProjects }: ProjectFilterClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? initialProjects
    : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-10">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isSelected
                ? "bg-[#e2eeea] text-teal-900 border border-teal-200"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-white/[0.08] hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-cyan-500/40 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)]"
            >
              {/* Project Card Image Banner */}
              <Link href={`/projects/${project.slug}`} className="relative h-56 w-full block overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 text-[11px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-white/10">
                  {project.period}
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-cyan-400 font-medium">
                    {project.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* Key Metrics row */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
                  {project.metrics.slice(0, 2).map((metric, mIdx) => (
                    <div key={mIdx} className="bg-slate-800/40 rounded-lg p-2 border border-white/[0.04]">
                      <div className="text-xs text-slate-400">{metric.label}</div>
                      <div className="text-sm font-bold text-cyan-300 font-mono">{metric.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 5).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/70 text-slate-300 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/70 text-slate-400">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Card footer links */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
