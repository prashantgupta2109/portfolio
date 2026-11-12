import { Metadata } from "next";
import { Code2 } from "lucide-react";
import { skillCategories } from "@/data/content";
import SkillsShowcase from "@/components/SkillsShowcase";

export const metadata: Metadata = {
  title: "Skills | Prashant Gupta",
  description:
    "Skills across programming languages, data science, application frameworks, generative AI, and developer tools.",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <header className="mx-auto mb-14 max-w-3xl space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#b8d8d3]">
          <Code2 className="h-3.5 w-3.5" />
          <span>Tools &amp; technologies</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Skills
        </h1>
        <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
          A practical stack for building AI applications, data products, and
          edge-ready machine learning systems.
        </p>
      </header>
      <SkillsShowcase categories={skillCategories} />
    </div>
  );
}
