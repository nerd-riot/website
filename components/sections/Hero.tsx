"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ProductVideoTheater } from "@/components/ui/ProductVideoTheater";
import { ArrowRight, Download, Play, ShieldCheck, Zap, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";

export function Hero() {
  const scrollToVideo = () => {
    const el = document.getElementById("product-video-theater");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#111318] bg-grid-dark overflow-hidden border-b border-[#30343D]">
      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Product Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D24] border border-[#30343D] text-xs font-mono text-dark-text shadow-sm hover:border-accent transition-colors">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold text-accent">DBNerd v0.1.0</span>
            <span className="text-[#30343D]">•</span>
            <span className="text-emerald-400 font-bold">Stable &amp; Beta Channels Ready</span>
          </div>

          {/* Headline: Product-First, No Code Guides */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-black tracking-tight text-white leading-[1.08]">
            The Modern Database Studio.<br />
            <span className="text-accent underline decoration-accent/40 decoration-wavy decoration-2">
              Engineered for 120 FPS Speed.
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="text-base sm:text-lg text-dark-muted max-w-2xl mx-auto font-sans leading-relaxed">
            Ditch sluggish, memory-heavy database clients. DBNerd is a native, ultra-responsive SQL workbench with instant multi-cloud connections, Safe Mode guardrails, and real-time observability.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/download/dbnerd"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-accent hover:bg-accent-hover text-[#111318] font-mono font-bold text-sm transition-all shadow-lg hover:shadow-highlight hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              <span>Download DBNerd</span>
            </Link>

            <button
              onClick={scrollToVideo}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-[#1A1D24] hover:bg-[#242832] text-white font-mono text-sm border border-[#30343D] hover:border-accent transition-all group"
            >
              <Play className="w-4 h-4 text-accent fill-current group-hover:scale-110 transition-transform" />
              <span>Watch Video Tour (2:15)</span>
            </button>

            <Link
              href="/releases"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-lg bg-[#111318] hover:bg-[#1A1D24] text-dark-muted hover:text-white font-mono text-sm border border-[#30343D] transition-all"
            >
              <span>Changelog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature Highlights Quick Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
              <span>Postgres &bull; MySQL &bull; SQLite &bull; Snowflake</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
              <span>macOS Apple Silicon &bull; Windows 10/11</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
              <span>Safe Mode for Production</span>
            </div>
          </div>
        </div>

        {/* Centerpiece: Product Video & Interactive Showcase Theater */}
        <div className="mt-14 max-w-5xl mx-auto">
          <ProductVideoTheater />
        </div>

        {/* Product Performance Stat Counters (Linear / Zed Style) */}
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#1A1D24] border border-[#30343D] text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-mono font-black text-accent">&lt; 35ms</div>
            <div className="text-xs font-mono text-white font-bold">Cold Launch Time</div>
            <div className="text-[11px] text-dark-muted font-sans">Instant window spawn via native Rust runtime</div>
          </div>

          <div className="p-5 rounded-xl bg-[#1A1D24] border border-[#30343D] text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">120 FPS</div>
            <div className="text-xs font-mono text-white font-bold">Canvas Virtual Scroll</div>
            <div className="text-[11px] text-dark-muted font-sans">Smooth rendering over 200,000+ cached rows</div>
          </div>

          <div className="p-5 rounded-xl bg-[#1A1D24] border border-[#30343D] text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-mono font-black text-white">~45 MB</div>
            <div className="text-xs font-mono text-white font-bold">Memory Footprint</div>
            <div className="text-[11px] text-dark-muted font-sans">10x lighter than bloated Electron-based clients</div>
          </div>

          <div className="p-5 rounded-xl bg-[#1A1D24] border border-[#30343D] text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-mono font-black text-accent">Zero</div>
            <div className="text-xs font-mono text-white font-bold">Telemetry Tracking</div>
            <div className="text-[11px] text-dark-muted font-sans">Your database queries and credentials never leave local storage</div>
          </div>
        </div>
      </div>
    </section>
  );
}