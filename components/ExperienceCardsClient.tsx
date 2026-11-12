"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Cpu,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  Zap,
  Play,
  ShieldCheck,
} from "lucide-react";
import { experiences } from "@/data/content";
import SmartGloveInteractive from "@/components/SmartGloveInteractive";

export default function ExperienceCardsClient() {
  const [isGloveStudioOpen, setIsGloveStudioOpen] = useState(false);
  const studioRef = useRef<HTMLDivElement | null>(null);

  const handleToggleStudio = () => {
    const nextState = !isGloveStudioOpen;
    setIsGloveStudioOpen(nextState);
    if (nextState) {
      setTimeout(() => {
        studioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  const obliqExp = experiences.find((e) => e.id === "obliq-in") || experiences[0];
  const iitrExp = experiences.find((e) => e.id === "iit-roorkee") || experiences[1];

  return (
    <div className="space-y-12">
      
      {/* 2 Primary Experience Cards Grid */}
      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
        
        {/* Card 1: OBLIQ-in (Founding Engineer – 2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="group rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-teal-700/25 backdrop-blur-md p-7 sm:p-8 flex flex-col transition-all duration-300 hover:shadow-[0_12px_36px_-18px_rgba(71,121,111,0.2)] relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-emerald-700/[0.035] blur-3xl pointer-events-none group-hover:bg-emerald-700/[0.07] transition-all" />

          <div className="relative z-10 flex flex-1 flex-col space-y-6">
            {/* Header info */}
            <div className="flex items-start justify-between gap-2 border-b border-white/[0.06] pb-5">
              <div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#edf2ed] text-[#435b50] border border-[#ced9cf]">
                  {obliqExp.type}
                </span>
                <h3 className="text-2xl font-bold text-white group-hover:text-teal-800 transition-colors mt-2">
                  {obliqExp.role}
                </h3>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mt-1">
                  <Building2 className="w-4 h-4 text-teal-700" />
                  <span>{obliqExp.company}</span>
                </div>
              </div>

              <div className="min-w-[142px] shrink-0 space-y-1 text-xs text-slate-400 font-mono">
                <div className="flex items-start gap-1.5 text-slate-300">
                  <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-700" />
                  <span className="whitespace-nowrap">{obliqExp.period}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span>{obliqExp.location}</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {obliqExp.summary}
            </p>

            {/* Key Achievements */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Founding Architecture &amp; Delivery</span>
              </div>
              <ul className="space-y-2.5">
                {obliqExp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech stack pills */}
          <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-wrap gap-1.5 relative z-10">
            {obliqExp.skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 border border-white/[0.06] text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Card 2: Nano-Intelligence Lab, IIT Roorkee (Research Intern) - INTERACTIVE! */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          onClick={handleToggleStudio}
          className={`group rounded-3xl bg-slate-900/60 border cursor-pointer backdrop-blur-md p-7 sm:p-8 flex flex-col transition-all duration-300 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.35)] relative overflow-hidden ${
            isGloveStudioOpen ? "border-cyan-400 bg-slate-900/90 shadow-[0_0_30px_rgba(6,182,212,0.2)]" : "border-white/[0.08] hover:border-cyan-500/50"
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all" />

          <div className="relative z-10 flex flex-1 flex-col space-y-6">
            {/* Header info */}
            <div className="flex items-start justify-between gap-2 border-b border-white/[0.06] pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    {iitrExp.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    <Sparkles className="w-3 h-3 text-teal-700" />
                    <span>Interactive Demo Inside</span>
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mt-2">
                  {iitrExp.role}
                </h3>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mt-1">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{iitrExp.company}</span>
                </div>
              </div>

              <div className="min-w-[142px] shrink-0 space-y-1 text-xs text-slate-400 font-mono">
                <div className="flex items-start gap-1.5 text-slate-300">
                  <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-700" />
                  <span className="whitespace-nowrap">{iitrExp.period}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                  <span>{iitrExp.location}</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {iitrExp.summary}
            </p>

            {/* Key Achievements */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Edge AI Research Highlights</span>
              </div>
              <ul className="space-y-2.5">
                {iitrExp.achievements.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Trigger Button */}
          <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between relative z-10">
            <div className="flex flex-wrap gap-1.5">
              {iitrExp.skills.slice(0, 4).map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 border border-white/[0.06] text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleStudio();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-teal-900 bg-[#e2eeea] border border-teal-200 hover:bg-[#d8e8e2] whitespace-nowrap transition-colors"
            >
              <span>{isGloveStudioOpen ? "Collapse Demo" : "Open Edge AI Glove"}</span>
              {isGloveStudioOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

      </div>

      {/* Dedicated Interactive Section: Edge AI Smart Glove Studio */}
      <div ref={studioRef}>
        <AnimatePresence>
          {isGloveStudioOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 space-y-6"
            >
              {/* Studio Announcement Badge */}
              <div className="flex items-center justify-between px-2 text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  <span>Dedicated Live Hardware Studio &bull; Nano-Intelligence Lab, IIT Roorkee</span>
                </div>
                <button
                  onClick={() => setIsGloveStudioOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Close Studio &times;
                </button>
              </div>

              {/* Render the full interactive studio */}
              <SmartGloveInteractive onClose={() => setIsGloveStudioOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
