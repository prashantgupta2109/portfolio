import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail, Sparkles, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { personalInfo } from "@/data/content";
import HomeNavCards from "@/components/HomeNavCards";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Text Column */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span>{personalInfo.status}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                Hi, I&apos;m{" "}
                <span className="text-[#9ac8c2]">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300">
                {personalInfo.title}
              </p>
            </div>

            {/* Bio / Tagline */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* Action Buttons & Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-[#0c0f12] bg-[#9ac8c2] hover:bg-[#afd6d0] transition-colors"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
              >
                <span>Contact Me</span>
              </Link>

              {/* Social icons */}
              <div className="flex items-center gap-2 px-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/70 border border-white/[0.08] hover:border-cyan-500/50 hover:text-cyan-400 text-slate-300 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/70 border border-white/[0.08] hover:border-indigo-500/50 hover:text-indigo-400 text-slate-300 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-3 rounded-xl bg-slate-900/70 border border-white/[0.08] hover:border-cyan-500/50 hover:text-cyan-400 text-slate-300 transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Visual Card */}
          <div className="relative group">
            {/* Glowing ring */}
            <div className="relative rounded-3xl bg-[#14191d] border border-white/[0.1] p-4 sm:p-6 max-w-sm">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl mb-4 bg-slate-800">
                <Image
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-white">{personalInfo.name}</h3>
                <p className="text-xs text-cyan-400 font-mono">B.Tech (EE) + Minor (Data Science)</p>
                <p className="text-[11px] text-slate-400">MMMUT &bull; Nano-Intelligence Lab IITR</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Oracle Certified</span>
                </span>
                <span className="text-slate-400 font-mono text-[11px]">OCT 2025</span>
              </div>
            </div>
          </div>

        </div>

        {/* Highlight Stats Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {personalInfo.stats.map((st, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#14191d] border border-white/[0.06] hover:border-white/20 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-semibold text-[#9ac8c2] font-mono">
                {st.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">
                {st.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                {st.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Large Animated Navigation Cards Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Page Exploration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Explore Portfolio Sections
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Click any section below to deep dive into work history, technical case studies, verified certifications, and core competencies.
          </p>
        </div>

        {/* Render 4 Large Animated Cards */}
        <HomeNavCards />
      </section>

      {/* Featured Research Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-[var(--surface-raised)] border border-cyan-500/20 p-8 sm:p-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Featured Breakthrough</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                TinyML Edge AI Wearable Gesture Glove &bull; IIT Roorkee
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Trained an ultra-compact TensorFlow Lite Micro quantized model running locally on an ESP32 microcontroller with 4 flex sensors, delivering 94% sign gesture classification accuracy with zero cloud latency.
              </p>
            </div>
            <Link
              href="/projects/tinyml-smart-glove"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[var(--accent)] bg-[var(--surface)] border border-cyan-500/40 hover:border-cyan-500/70 transition-all hover:scale-105 whitespace-nowrap"
            >
              <span>Read Case Study</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
