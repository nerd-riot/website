"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Maximize2, Volume2, VolumeX, Sparkles, CheckCircle2, Shield, Zap, Eye, Film, Layers, Monitor, ChevronRight } from "lucide-react";

interface FeatureTour {
  id: string;
  tabLabel: string;
  badge: string;
  screenshot: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
}

const TOUR_FEATURES: FeatureTour[] = [
  {
    id: "studio",
    tabLabel: "DB Studio",
    badge: "Native Tauri v2 Core",
    screenshot: "/media/studio-preview.png",
    headline: "Engineered for Sub-35ms Launch Time",
    description: "Built with Rust and native system webviews. Zero Electron bloat, instantaneous cold starts, and minimal memory footprint under 45MB RAM.",
    metrics: [
      { label: "Cold Launch", value: "< 35ms" },
      { label: "Memory Idle", value: "42.8 MB" },
      { label: "Architecture", value: "Apple Silicon & x64" },
    ],
  },
  {
    id: "grid",
    tabLabel: "120 FPS Data Grid",
    badge: "Hardware-Accelerated Canvas",
    screenshot: "/media/table-grid-view.png",
    headline: "Fluid Scrolling Over 200,000+ Cached Rows",
    description: "Virtual scrolling with direct GPU-accelerated canvas rendering. Instant column filtering, regex search, and inline cell editing without UI lockup.",
    metrics: [
      { label: "Refresh Rate", value: "120 FPS" },
      { label: "Row Cache", value: "200k+ rows" },
      { label: "Search Latency", value: "< 2ms" },
    ],
  },
  {
    id: "safe-mode",
    tabLabel: "Safe Mode",
    badge: "Production Guardrails",
    screenshot: "/media/safe-mode-production.png",
    headline: "Zero-Mistake Production Defense",
    description: "Protects staging and production environments. DROP, TRUNCATE, and destructive UPDATE statements require explicit phrase typing confirmation.",
    metrics: [
      { label: "Guardrail", value: "Double Verification" },
      { label: "Production Safe", value: "100% Guaranteed" },
      { label: "Diff Preview", value: "Pre-execution" },
    ],
  },
  {
    id: "observability",
    tabLabel: "Observability HUD",
    badge: "Real-time Telemetry",
    screenshot: "/media/observability-dashboard.png",
    headline: "Live Connection & Performance Metrics",
    description: "Real-time telemetry HUD displaying connection pool saturation, P99 query latency, active transactions, and memory allocation in a live oscilloscope graph.",
    metrics: [
      { label: "Telemetry", value: "Sub-millisecond" },
      { label: "Latency P99", value: "0.02ms" },
      { label: "Pool Health", value: "Active Tracking" },
    ],
  },
];

export function ProductVideoTheater() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hasVideoFile, setHasVideoFile] = useState<boolean>(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Check if real MP4 video exists at /media/dbnerd-demo.mp4
  useEffect(() => {
    fetch("/media/dbnerd-demo.mp4", { method: "HEAD" })
      .then((res) => {
        if (res.ok && !res.headers.get("content-type")?.includes("html")) {
          setHasVideoFile(true);
        }
      })
      .catch(() => setHasVideoFile(false));
  }, []);

  const activeFeature = TOUR_FEATURES[activeIdx];

  const handlePlayToggle = () => {
    if (hasVideoFile && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlayingVideo(true);
      } else {
        videoRef.current.pause();
        setIsPlayingVideo(false);
      }
    } else {
      // Open high-res lightbox
      setLightboxOpen(true);
    }
  };

  return (
    <div
      id="product-video-theater"
      className="w-full max-w-5xl mx-auto rounded-2xl border border-[#30343D] bg-[#16181E] shadow-2xl overflow-hidden transition-all duration-300"
    >
      {/* Window Title Bar */}
      <div className="px-4 py-3 bg-[#1A1D24] border-b border-[#30343D] flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
          </div>
          <span className="ml-2 font-mono text-xs font-semibold text-white tracking-tight flex items-center gap-2">
            <span>DBNerd Studio — Interactive Product Showcase</span>
            <span className="px-1.5 py-0.2 rounded bg-accent/15 text-accent text-[10px] font-bold">
              {hasVideoFile ? "Video Mode (60 FPS)" : "Interactive Tour"}
            </span>
          </span>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#111318] p-1 rounded-lg border border-[#30343D] overflow-x-auto">
          {TOUR_FEATURES.map((feature, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={feature.id}
                onClick={() => {
                  setActiveIdx(idx);
                  if (isPlayingVideo && videoRef.current) {
                    videoRef.current.pause();
                    setIsPlayingVideo(false);
                  }
                }}
                className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-accent text-[#111318] font-bold shadow-sm"
                    : "text-dark-muted hover:text-white hover:bg-[#1A1D24]"
                }`}
              >
                {feature.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative aspect-[16/9] w-full bg-[#0B0C0E] overflow-hidden group">
        {hasVideoFile ? (
          <video
            ref={videoRef}
            src="/media/dbnerd-demo.mp4"
            poster={activeFeature.screenshot}
            className="w-full h-full object-cover"
            muted={isMuted}
            controls
            onPlay={() => setIsPlayingVideo(true)}
            onPause={() => setIsPlayingVideo(false)}
          />
        ) : (
          <div className="relative w-full h-full">
            {/* High-Resolution Screenshot with Butter-Smooth CSS Transition */}
            <img
              key={activeFeature.id}
              src={activeFeature.screenshot}
              alt={activeFeature.headline}
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-300"
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111318]/90 via-transparent to-black/30 pointer-events-none" />

            {/* Expand / Inspect Action */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 p-2.5 rounded-lg bg-[#111318]/80 hover:bg-[#111318] border border-[#30343D] text-white opacity-80 hover:opacity-100 transition-opacity backdrop-blur-md shadow-lg"
              title="Inspect Full Resolution"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Feature Callout Overlay (Bottom Left) */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto max-w-lg p-4 rounded-xl bg-[#111318]/95 border border-[#30343D] backdrop-blur-md shadow-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {activeFeature.badge}
                </span>
              </div>
              <h3 className="font-mono font-bold text-sm sm:text-base text-white">
                {activeFeature.headline}
              </h3>
              <p className="text-xs text-dark-muted font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
                {activeFeature.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Feature Capabilities & Benchmarks Grid */}
      <div className="p-4 sm:p-6 bg-[#1A1D24] border-t border-[#30343D]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {activeFeature.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#111318] border border-[#30343D] space-y-1"
            >
              <div className="text-[11px] font-mono text-dark-muted uppercase tracking-wider">
                {metric.label}
              </div>
              <div className="text-lg font-mono font-bold text-accent">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] overflow-hidden rounded-2xl border border-[#30343D] bg-[#111318] p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#30343D] px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-sm font-bold text-white">
                  {activeFeature.headline} — High-Res Inspect
                </span>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="px-3 py-1 font-mono text-xs rounded bg-[#1A1D24] border border-[#30343D] text-white hover:border-accent"
              >
                [ESC / Close]
              </button>
            </div>

            <div className="mt-3 rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeFeature.screenshot}
                alt={activeFeature.headline}
                className="w-full h-auto object-contain max-h-[75vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}