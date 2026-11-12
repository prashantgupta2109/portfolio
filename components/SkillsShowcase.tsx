"use client";

import { useState } from "react";
import {
  Blocks,
  BrainCircuit,
  Cloud,
  Code2,
  Sparkles,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { coreStrengths, type SkillCategory } from "@/data/content";

interface SkillsShowcaseProps {
  categories: SkillCategory[];
}

const categoryIcons = {
  Code2,
  BrainCircuit,
  Blocks,
  Sparkles,
  Cloud,
  Wrench,
};

const staggeredCategory = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055 },
  },
};

const appear = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function SkillLogo({ name, logo }: { name: string; logo?: string }) {
  const [unavailable, setUnavailable] = useState(false);

  if (!logo || unavailable) {
    return (
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[10px] font-semibold text-[#b8d8d3]"
      >
        {name
          .split(/[\s&/-]+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0])
          .join("")
          .toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${logo}/9ac8c2`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      onError={() => setUnavailable(true)}
      className="h-6 w-6 shrink-0 object-contain"
    />
  );
}

export default function SkillsShowcase({ categories }: SkillsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const currentCategory = categories[activeCategory];
  const CategoryIcon =
    categoryIcons[currentCategory.icon as keyof typeof categoryIcons] ?? Blocks;
  const marqueeSkills = categories.flatMap((category) => category.skills);

  return (
    <div className="space-y-16">
      <section aria-labelledby="skill-categories-title" className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9ac8c2]">
              The toolkit
            </p>
            <h2
              id="skill-categories-title"
              className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Skills by category
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            {categories.reduce((total, category) => total + category.skills.length, 0)} tools and technologies
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Skill categories"
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.icon as keyof typeof categoryIcons] ?? Blocks;
            const selected = index === activeCategory;

            return (
              <button
                key={category.category}
                type="button"
                role="tab"
                id={`skills-tab-${index}`}
                aria-selected={selected}
                aria-controls="skills-category-panel"
                onClick={() => setActiveCategory(index)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                  selected
                    ? "border-[#9ac8c2]/35 bg-[#9ac8c2]/10 text-[#c5e1dd]"
                    : "border-white/[0.08] bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.category}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={currentCategory.category}
            id="skills-category-panel"
            role="tabpanel"
            aria-labelledby={`skills-tab-${activeCategory}`}
            variants={staggeredCategory}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -6 }}
            className="rounded-2xl border border-white/[0.08] bg-[#14191d] p-5 sm:p-7"
          >
            <div className="mb-6 flex items-start gap-3 border-b border-white/[0.07] pb-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#9ac8c2]/15 bg-[#9ac8c2]/[0.06] text-[#9ac8c2]">
                <CategoryIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-medium text-white">{currentCategory.category}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {currentCategory.description}
                </p>
              </div>
              <span className="ml-auto hidden shrink-0 rounded-full border border-white/[0.08] px-3 py-1 text-xs text-slate-400 sm:inline-flex">
                {currentCategory.skills.length} skills
              </span>
            </div>

            <motion.div
              variants={staggeredCategory}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2.5"
            >
              {currentCategory.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={appear}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 text-sm text-slate-200 transition-colors hover:border-[#9ac8c2]/25 hover:bg-white/[0.05]"
                >
                  <SkillLogo name={skill.name} logo={skill.logo} />
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </AnimatePresence>
      </section>

      <section aria-labelledby="top-skills-title" className="space-y-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9ac8c2]">
            Areas of depth
          </p>
          <h2
            id="top-skills-title"
            className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Core strengths
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            A quick view of selected areas of focus.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {coreStrengths.map((strength, index) => (
            <motion.div
              key={strength}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#14191d] px-4 py-3.5"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-[#9ac8c2]"
              />
              <span className="text-sm font-medium text-slate-200">{strength}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section aria-labelledby="tool-marquee-title" className="space-y-5 overflow-hidden">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9ac8c2]">
              In the workflow
            </p>
            <h2
              id="tool-marquee-title"
              className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl"
            >
              Tools I work with
            </h2>
          </div>
          <span className="hidden text-xs text-slate-500 sm:block">A few from the stack</span>
        </div>
        <div className="relative overflow-hidden" aria-label="A scrolling list of skills">
          <motion.div
            className="flex w-max gap-3"
            animate={prefersReducedMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 48, ease: "linear", repeat: Infinity }
            }
          >
            {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
              <span
                key={`${skill.name}-${index}`}
                aria-hidden={index >= marqueeSkills.length}
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-[#14191d] px-4 py-2.5 text-sm text-slate-300"
              >
                <SkillLogo name={skill.name} logo={skill.logo} />
                {skill.name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
