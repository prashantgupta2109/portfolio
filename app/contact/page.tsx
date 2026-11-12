import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails";

export const metadata: Metadata = {
  title: "Contact | Prashant Gupta",
  description:
    "Get in touch with Prashant Gupta about AI/ML roles, research collaborations, and freelance projects.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <ContactDetails />
    </div>
  );
}
