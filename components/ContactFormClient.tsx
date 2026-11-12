"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";

type ContactField = "name" | "email" | "subject" | "message";

const fields: {
  name: ContactField;
  label: string;
  type: "text" | "email" | "textarea";
  optional?: boolean;
  autoComplete?: string;
}[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", optional: true },
  { name: "message", label: "Message", type: "textarea" },
];

export default function ContactFormClient() {
  const reduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitted(false);
    clearErrors("root");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result: { success?: boolean; error?: string } = await response.json();

      if (!response.ok || !result.success) {
        setError("root.server", {
          type: "server",
          message: result.error || "Your message could not be sent. Please try again.",
        });
        return;
      }

      reset();
      setSubmitted(true);
    } catch {
      setError("root.server", {
        type: "server",
        message: "We couldn't reach the server. Check your connection and try again.",
      });
    }
  };

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[var(--surface)] p-6 sm:p-8">
      <div className="mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
          Get in touch
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Send a message</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Share a little context and I&apos;ll get back to you soon.
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            className="flex min-h-[22rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.div
              initial={reduceMotion ? false : { scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 220 }}
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            >
              <motion.svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="m5 12 4 4L19 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.12 }}
                />
              </motion.svg>
            </motion.div>
            <h3 className="text-xl font-semibold text-white">Message sent. I&apos;ll reply soon.</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Thanks for reaching out. Your message is on its way.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-[var(--accent)]/50 hover:text-white"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.slice(0, 2).map((field) => (
                <FloatingField
                  key={field.name}
                  {...field}
                  register={register}
                  error={errors[field.name]?.message}
                  onChange={() => clearErrors("root")}
                />
              ))}
            </div>

            {fields.slice(2).map((field) => (
              <FloatingField
                key={field.name}
                {...field}
                register={register}
                error={errors[field.name]?.message}
                onChange={() => clearErrors("root")}
              />
            ))}

            <div className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input
                id="contact-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            <div aria-live="polite" aria-atomic="true" className="min-h-5">
              {errors.root?.server?.message && (
                <p className="text-sm text-rose-300" role="alert">
                  {errors.root.server.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[#10201f] transition-[opacity,transform] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  <span>{errors.root?.server ? "Retry sending" : "Send message"}</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingField({
  name,
  label,
  type,
  optional,
  autoComplete,
  register,
  error,
  onChange,
}: {
  name: ContactField;
  label: string;
  type: "text" | "email" | "textarea";
  optional?: boolean;
  autoComplete?: string;
  register: UseFormRegister<ContactFormValues>;
  error?: string;
  onChange: () => void;
}) {
  const id = `contact-${name}`;
  const sharedProps = {
    id,
    ...register(name, { onChange }),
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    placeholder: " ",
    autoComplete,
    className:
      "peer w-full rounded-xl border border-white/10 bg-[#0f1316] px-4 pb-3 pt-6 text-sm text-white outline-none transition-colors placeholder:text-transparent focus:border-[var(--accent)]/70 focus:ring-2 focus:ring-[var(--accent)]/10 aria-[invalid=true]:border-rose-400/70",
  };

  return (
    <div>
      <div className="relative">
        {type === "textarea" ? (
          <textarea {...sharedProps} rows={5} className={`${sharedProps.className} min-h-36 resize-y`} />
        ) : (
          <input {...sharedProps} type={type} />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-4 text-sm font-medium uppercase tracking-[0.12em] text-slate-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--accent)] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]"
        >
          {label}
          {optional ? <span className="ml-1 normal-case tracking-normal text-slate-500">(optional)</span> : null}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}
