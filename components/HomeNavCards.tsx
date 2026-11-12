"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, FolderGit2, Award, Cpu, ArrowUpRight, Sparkles } from "lucide-react";
import { homeNavCards, NavCardItem } from "@/data/content";

const iconMap: Record<string, any> = {
  Briefcase,
  FolderGit2,
  Award,
  Cpu,
};

export default function HomeNavCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {homeNavCards.map((card: NavCardItem, index: number) => {
        const IconComponent = iconMap[card.icon] || Sparkles;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 * index, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="group relative rounded-2xl"
          >
            <Link
              href={card.route}
              className="block h-full p-7 rounded-2xl bg-[#14191d] border border-white/[0.08] hover:border-white/20 transition-colors duration-200 relative overflow-hidden"
            >
              {/* Card Header: Icon & Badge */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.1] bg-white/[0.04] text-[#9ac8c2]">
                  <IconComponent className="w-7 h-7" />
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-medium px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-slate-400"
                  >
                    {card.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-white/[0.08] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white/20 transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
                  <span>{card.title}</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom stats / summary tag */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 relative z-10">
                <span className="font-mono text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
                  {card.stats}
                </span>
                <span className="font-medium text-[#9ac8c2] flex items-center gap-1 group-hover:underline">
                  Explore {card.title} &rarr;
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
