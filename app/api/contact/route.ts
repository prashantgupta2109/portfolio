import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_ENTRIES = 5000;

// This in-memory limit is per server process; use a shared store for multi-instance deployments.
const rateLimit = new Map<string, { startedAt: number; count: number }>();

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const now = Date.now();
  rateLimit.forEach((entry, key) => {
    if (now - entry.startedAt >= RATE_LIMIT_WINDOW_MS) {
      rateLimit.delete(key);
    }
  });

  const clientKey = getClientKey(request);
  const previous = rateLimit.get(clientKey);
  const current =
    !previous || now - previous.startedAt >= RATE_LIMIT_WINDOW_MS
      ? { startedAt: now, count: 0 }
      : previous;

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil(
      (current.startedAt + RATE_LIMIT_WINDOW_MS - now) / 1000,
    );
    return NextResponse.json(
      { error: "Too many messages. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  current.count += 1;
  rateLimit.set(clientKey, current);
  if (rateLimit.size > MAX_RATE_LIMIT_ENTRIES) {
    const oldestKey = rateLimit.keys().next().value;
    if (oldestKey) rateLimit.delete(oldestKey);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid message." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your details and try again." },
      { status: 400 },
    );
  }

  if (parsed.data.website?.trim()) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact form is unavailable: Resend environment variables are not configured.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please email me directly instead." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "prashant.gupta2109@gmail.com";
  const resend = new Resend(apiKey);
  const { name, email, message } = parsed.data;
  const subject = parsed.data.subject.trim() || "New portfolio message";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend could not deliver a portfolio contact message.", error);
      return NextResponse.json(
        { error: "Your message could not be sent right now. Please try again shortly." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Resend request failed while sending a portfolio contact message.", error);
    return NextResponse.json(
      { error: "Your message could not be sent right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
