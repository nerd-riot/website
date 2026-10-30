"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Terminal } from "@/components/ui/Terminal";
import { ArrowRight, Download, Sparkles, Layers, ShieldCheck, Zap, Maximize2 } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";

export function Hero() {
  const [activeMedia, setActiveMedia] = useState<string>("/media/studio-preview.png");
  const [modalOpen, setModalOpen] = useState(false);

  const previewTabs = [
    { id: "studio", label: "DB Studio (Overview)", src: "/media/studio-preview.png" },
    { id: "grid", label: "120 FPS Data Grid", src: "/media/table-grid-view.png" },
    { id: "conn", label: "Multi-DB Connector", src: "/media/connection-manager.png" },
    { id: "obs", label: "Observability HUD", src: "/media/observability-dashboard.png" },
  ];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#111318] bg-grid-dark overflow-hidden border-b border-[#30343D]">
      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Brand Tag / Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1D24] border border-[#30343D] text-xs font-mono text-dark-text shadow-sm hover:border-accent transition-colors">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold text-accent">{siteConfig.name}</span>
            <span className="text-[#30343D]">•</span>
            <span className="text-dark-muted">Engineering Collective</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-black tracking-tight text-white leading-[1.08]">
            We build things.<br />
            <span className="text-accent underline decoration-accent/40 decoration-wavy decoration-2">
              We break limits.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto font-sans leading-relaxed">
            A collective of engineers building useful software, developer tools, high-throughput backend engines, and open-source infrastructure.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent hover:bg-accent-hover text-[#111318] font-mono font-bold text-sm transition-all shadow-md hover:shadow-highlight"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#1A1D24] hover:bg-[#242832] text-white font-mono text-sm border border-[#30343D] hover:border-dark-muted transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Org</span>
            </a>

            <Link
              href="/download/dbnerd"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#1A1D24] hover:bg-[#242832] text-dark-text font-mono text-sm border border-[#30343D] hover:border-accent transition-all group"
            >
              <Download className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              <span>Get DBNerd (macOS)</span>
            </Link>
          </div>
        </div>

        {/* Terminal Section */}
        <div className="mt-14 max-w-3xl mx-auto">
          <Terminal />
        </div>

        {/* Interactive App Preview Showcase (DBNerd with Dummy Data & Live Screenshots) */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-xl border border-[#30343D] bg-[#1A1D24] p-2 sm:p-4 shadow-terminal">
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#30343D] px-2">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-xs font-bold text-white tracking-wide uppercase">
                  Flagship Preview: DBNerd Studio
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/30 text-accent font-semibold">
                  Tauri v2 + Rust
                </span>
              </div>

              {/* Preview Mode Switcher */}
              <div className="flex flex-wrap items-center gap-1">
                {previewTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveMedia(tab.src)}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      activeMedia === tab.src
                        ? "bg-accent text-[#111318] font-bold"
                        : "text-dark-muted hover:text-white bg-[#111318] hover:bg-[#242832]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Canvas */}
            <div className="relative mt-3 rounded-lg overflow-hidden border border-[#30343D] bg-[#0E1015] group">
              <img
                src={activeMedia}
                alt="DBNerd Studio Live Screenshot"
                className="w-full h-auto object-cover max-h-[580px] rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Overlay HUD / Expand prompt */}
              <button
                onClick={() => setModalOpen(true)}
                className="absolute top-4 right-4 p-2 rounded-md bg-[#111318]/80 hover:bg-[#111318] border border-[#30343D] text-white opacity-80 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                title="Expand full resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-3 right-3 sm:right-auto px-3 py-2 rounded-md bg-[#111318]/90 border border-[#30343D] backdrop-blur-md flex items-center gap-3 font-mono text-[11px] text-zinc-300">
                <span className="text-accent font-bold">⚡ Zero Bloat:</span>
                <span>~45MB RAM</span>
                <span className="text-zinc-600">|</span>
                <span>120 FPS Data Grid</span>
                <span className="text-zinc-600">|</span>
                <span className="text-emerald-400">Multi-engine SQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setModalOpen(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-xl border border-[#30343D] bg-[#111318] p-2">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 px-3 py-1 font-mono text-xs rounded bg-[#1A1D24] border border-[#30343D] text-white hover:border-accent"
            >
              [ESC / Close]
            </button>
            <img
              src={activeMedia}
              alt="Full Resolution Screenshot"
              className="w-full h-auto object-contain max-h-[82vh] rounded"
            />
          </div>
        </div>
      )}
    </section>
  );
}
