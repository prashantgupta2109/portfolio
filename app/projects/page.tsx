import { Metadata } from "next";
import { FolderGit2, Sparkles } from "lucide-react";
import { projects } from "@/data/content";
import ProjectCardGrid from "@/components/ProjectCardGrid";

export const metadata: Metadata = {
  title: "Projects | Prashant Gupta",
  description: "Featured engineering projects: AI Business Operations Copilot, STATEMENTIQ, and Edge AI Smart Glove.",
};

export default function ProjectsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Major AI &amp; Edge Systems</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Featured Engineering Projects
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          Production Multi-Agent RAG architectures, financial transaction classification engines, and wearable TinyML edge deployments with live dashboards and open repositories.
        </p>
      </div>

      {/* Grid of Large Project Cards */}
      <ProjectCardGrid projects={projects} />
    </div>
  );
}
