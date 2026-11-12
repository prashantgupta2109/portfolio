import { ArrowUp } from "lucide-react";
import { personalInfo } from "@/data/content";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-white/[0.08]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} {personalInfo.name}</p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-sm text-slate-400 transition-colors hover:text-white"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
