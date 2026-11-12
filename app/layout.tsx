import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { personalInfo } from "@/data/content";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: personalInfo.tagline,
  keywords: [
    "Prashant Gupta",
    "AI Engineer",
    "Edge AI",
    "TinyML",
    "ESP32",
    "RAG",
    "Multi-Agent AI",
    "Machine Learning",
    "Deep Learning",
    "LangChain",
    "IIT Roorkee",
    "Oracle Certified",
  ],
  authors: [{ name: personalInfo.name }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body id="top" className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-cyan-200/20 selection:text-cyan-100 flex flex-col antialiased">
        <Navbar />
        
        <main className="flex-1 flex flex-col w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <Footer />
      </body>
    </html>
  );
}
