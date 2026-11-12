import { Metadata } from "next";
import { Award } from "lucide-react";
import CertificateGallery from "@/components/CertificateGallery";
import { certificates } from "@/data/content";

export const metadata: Metadata = {
  title: "Certificates | Prashant Gupta",
  description: "Verified professional certifications in Oracle Cloud Infrastructure Data Science, AI Foundations, and IIT Roorkee research.",
};

export default function CertificatesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#b8d8d3]">
          <Award className="h-3.5 w-3.5" />
          <span>Credentials</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Certificates
        </h1>
        <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
          Professional certifications and research experience. Select a certificate to view it full screen.
        </p>
      </div>
      <CertificateGallery certificates={certificates} />
    </div>
  );
}
