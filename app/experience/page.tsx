import { Metadata } from "next";
import Link from "next/link";
import { Briefcase, ArrowRight, Sparkles } from "lucide-react";
import ExperienceCardsClient from "@/components/ExperienceCardsClient";

export const metadata: Metadata = {
  title: "Experience | Prashant Gupta",
  description: "Work history at OBLIQ-in (Founding Engineer) and Nano-Intelligence Lab, IIT Roorkee (Research Intern).",
};

export default function ExperiencePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Founding &amp; Research Career</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Work &amp; Research Experience
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          AI/ML product work at <strong className="text-white">OBLIQ-in</strong> and embedded TinyML research at <strong className="text-cyan-300">Nano-Intelligence Lab, IIT Roorkee</strong>.
        </p>
      </div>

      {/* Render the 2 Experience Cards with Interactive IIT Roorkee Smart Glove studio */}
      <ExperienceCardsClient />

      {/* Bottom CTA to Projects */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white">Looking for tangible project implementations?</h3>
          <p className="text-sm text-slate-400">Discover live Streamlit demos for AI Business Copilot and StatementIQ.</p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-teal-900 bg-[#e2eeea] border border-teal-200 hover:bg-[#d8e8e2] whitespace-nowrap transition-colors"
        >
          <span>Explore Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
