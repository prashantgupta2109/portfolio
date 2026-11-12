import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";
import ContactFormClient from "@/components/ContactFormClient";

export const metadata: Metadata = {
  title: "Contact | Prashant Gupta",
  description:
    "Get in touch with Prashant Gupta about AI/ML roles, research collaborations, and freelance projects.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <ContactDetails />
        <ContactFormClient />
      </div>
    </div>
  );
}
