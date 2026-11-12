"use client";

import { motion, useInView, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDownToLine, Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data/content";

const contacts = [
  {
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    copyValue: personalInfo.email,
    icon: Mail,
  },
  {
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s+/g, "")}`,
    copyValue: personalInfo.phone,
    icon: Phone,
  },
] as const;

export default function ContactDetails() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headlineRef, { once: false, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const [copyNotice, setCopyNotice] = useState("");
  const copyTimeout = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (copyTimeout.current) window.clearTimeout(copyTimeout.current);
    },
    [],
  );

  const copyToClipboard = async (value: string) => {
    let notice: string;
    try {
      await navigator.clipboard.writeText(value);
      notice = "Copied!";
    } catch {
      notice = "Copy unavailable. Please copy the contact detail manually.";
    }

    setCopyNotice(notice);
    if (copyTimeout.current) window.clearTimeout(copyTimeout.current);
    copyTimeout.current = window.setTimeout(
      () => setCopyNotice(""),
      notice === "Copied!" ? 1800 : 3000,
    );
  };

  return (
    <section className="relative flex flex-col" aria-labelledby="contact-title">
      <div ref={headlineRef} className="relative isolate overflow-hidden pb-8 pt-2">
        <motion.span
          aria-hidden="true"
          className="contact-mesh contact-mesh-one"
          animate={isInView && !reduceMotion ? { x: [0, 16, 0], y: [0, -10, 0] } : { x: 0, y: 0 }}
          transition={{ duration: isInView && !reduceMotion ? 14 : 0.01, ease: "easeInOut", repeat: isInView && !reduceMotion ? Infinity : 0 }}
        />
        <motion.span
          aria-hidden="true"
          className="contact-mesh contact-mesh-two"
          animate={isInView && !reduceMotion ? { x: [0, -14, 0], y: [0, 12, 0] } : { x: 0, y: 0 }}
          transition={{ duration: isInView && !reduceMotion ? 18 : 0.01, ease: "easeInOut", repeat: isInView && !reduceMotion ? Infinity : 0 }}
        />
        <p className="relative z-10 mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          Contact
        </p>
        <motion.h1
          id="contact-title"
          aria-label="Let's build something intelligent."
          className="relative z-10 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl xl:text-6xl"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.075 } },
          }}
        >
          {["Let's", "build", "something", "intelligent."].map((word, index) => (
            <motion.span
              key={word}
              aria-hidden="true"
              className={`relative z-10 mr-[0.22em] inline-block ${index === 3 ? "text-[var(--accent)]" : ""}`}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduceMotion ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <p className="relative z-10 mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
          Seeking AI/ML internship and full-time roles, on-site, hybrid, or remote.
        </p>
      </div>

      <div className="space-y-3">
        {contacts.map(({ label, value, href, copyValue, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]/30"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-[var(--accent)]">
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <a href={href} className="min-w-0 flex-1 rounded-sm">
              <span className="block text-xs text-slate-500">{label}</span>
              <span className="mt-1 block truncate text-sm font-medium text-slate-200">{value}</span>
            </a>
            <button
              type="button"
              onClick={() => void copyToClipboard(copyValue)}
              aria-label={`Copy ${label.toLowerCase()} to clipboard`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {copyNotice === "Copied!" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        ))}

        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[var(--surface)] p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-[var(--accent)]">
            <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <div>
            <span className="block text-xs text-slate-500">Location</span>
            <span className="mt-1 block text-sm font-medium text-slate-200">{personalInfo.location}</span>
            <span className="mt-1 block text-xs text-slate-400">On-site, hybrid, or remote</span>
          </div>
        </div>
      </div>

      <p className="mt-2 min-h-5 text-xs text-[var(--accent)]" role="status" aria-live="polite">
        {copyNotice}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <MagneticLink href="https://github.com/prashantgupta2109" label="GitHub">
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </MagneticLink>
        <MagneticLink href={personalInfo.linkedin} label="LinkedIn">
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          LinkedIn
        </MagneticLink>
        <a
          href="/resume.pdf"
          download
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-slate-300 transition-colors hover:border-white/25 hover:text-white"
        >
          <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
          Download Resume
        </a>
      </div>

      <div className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-2 text-xs text-emerald-200">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Available for AI/ML internships and full-time roles
      </div>
    </section>
  );
}

function MagneticLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  const moveTowardPointer = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label} profile in a new tab`}
      onPointerMove={moveTowardPointer}
      onPointerLeave={resetPosition}
      style={{ x, y }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-slate-300 transition-colors hover:border-[var(--accent)]/40 hover:text-white"
    >
      {children}
    </motion.a>
  );
}
