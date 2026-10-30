"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Maximize2, Volume2, VolumeX, Sparkles, CheckCircle2, Shield, Zap, Eye, Film, RotateCcw } from "lucide-react";

interface Chapter {
  id: string;
  time: string;
  seconds: number;
  title: string;
  badge: string;
  screenshot: string;
  description: string;
  highlight: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "overview",
    time: "0:00",
    seconds: 0,
    title: "DB Studio Overview",
    badge: "Native Tauri v2",
    screenshot: "/media/studio-preview.png",
    description: "Ultra-fast database workspace designed for engineers. Zero Electron bloat, launches under 35ms.",
    highlight: "Launch time: 32ms • RAM: ~45MB",
  },
  {
    id: "grid",
    time: "0:35",
    seconds: 35,
    title: "120 FPS Canvas Data Grid",
    badge: "Hardware Accelerated",
    screenshot: "/media/table-grid-view.png",
    description: "Virtual scrolling handles 200,000+ cached rows with zero dropped frames. Inline cell edits & instant regex search.",
    highlight: "Smooth 120 FPS scroll • 200k rows cached",
  },
  {
    id: "safe-mode",
    time: "1:10",
    seconds: 70,
    title: "Safe Mode for Production",
    badge: "Zero-Mistake Guardrail",
    screenshot: "/media/safe-mode-production.png",
    description: "Prevents catastrophic data loss. DROP, TRUNCATE, and unqualified UPDATE queries require manual phrase typing verification.",
    highlight: "Destructive query blocker • Double-lock verification",
  },
  {
    id: "observability",
    time: "1:45",
    seconds: 105,
    title: "Live Observability HUD",
    badge: "Real-time Telemetry",
    screenshot: "/media/observability-dashboard.png",
    description: "Monitor connection pooling, query execution latency, cache hit ratios, and active transactions in real-time.",
    highlight: "Live P99 latency tracking • Connection health graphs",
  },
];

const TOTAL_DURATION = 135; // 2:15 in seconds

export function ProductVideoTheater() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentChapterIdx, setCurrentChapterIdx] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasVideoFile, setHasVideoFile] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const theaterRef = useRef<HTMLDivElement | null>(null);

  // Check if a real video file exists at /media/dbnerd-demo.mp4
  useEffect(() => {
    fetch("/media/dbnerd-demo.mp4", { method: "HEAD" })
      .then((res) => {
        if (res.ok && !res.headers.get("content-type")?.includes("html")) {
          setHasVideoFile(true);
        }
      })
      .catch(() => setHasVideoFile(false));
  }, []);

  // Simulated playback timer when no real mp4 video is playing
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && !hasVideoFile) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            return 0;
          }
          // Auto switch chapter based on timestamp
          const idx = CHAPTERS.findIndex(
            (c, i) =>
              next >= c.seconds &&
              (i === CHAPTERS.length - 1 || next < CHAPTERS[i + 1].seconds)
          );
          if (idx !== -1 && idx !== currentChapterIdx) {
            setCurrentChapterIdx(idx);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, hasVideoFile, currentChapterIdx]);

  const togglePlay = () => {
    if (hasVideoFile && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleChapterClick = (idx: number) => {
    setCurrentChapterIdx(idx);
    const targetSeconds = CHAPTERS[idx].seconds;
    setCurrentTime(targetSeconds);
    if (hasVideoFile && videoRef.current) {
      videoRef.current.currentTime = targetSeconds;
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const activeChapter = CHAPTERS[currentChapterIdx];
  const progressPercent = (currentTime / TOTAL_DURATION) * 100;

  return (
    <div
      ref={theaterRef}
      id="product-video-theater"
      className="w-full max-w-5xl mx-auto rounded-2xl border border-[#30343D] bg-[#16181E] shadow-2xl overflow-hidden transition-all duration-300"
    >
      {/* Top Window Header */}
      <div className="px-4 py-3 bg-[#1A1D24] border-b border-[#30343D] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
          </div>
          <span className="ml-2 font-mono text-xs font-semibold text-white tracking-tight flex items-center gap-2">
            <span>DBNerd Studio — Product Feature Trailer</span>
            <span className="px-1.5 py-0.2 rounded bg-accent/15 text-accent text-[10px] font-bold">
              60 FPS
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400 bg-[#111318] px-2.5 py-1 rounded border border-[#30343D] flex items-center gap-1.5">
            <Film className="w-3 h-3 text-accent" />
            <span>Interactive Demo Tour</span>
          </span>
        </div>
      </div>

      {/* Main Video Screen Container */}
      <div className="relative aspect-[16/9] w-full bg-[#0B0C0E] overflow-hidden group">
        {hasVideoFile ? (
          <video
            ref={videoRef}
            src="/media/dbnerd-demo.mp4"
            poster={activeChapter.screenshot}
            className="w-full h-full object-cover"
            muted={isMuted}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
              }
            }}
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <div className="relative w-full h-full">
            {/* Cinematic Screenshot Canvas */}
            <img
              src={activeChapter.screenshot}
              alt={activeChapter.title}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                isPlaying ? "scale-105" : "scale-100"
              }`}
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111318]/90 via-transparent to-black/30 pointer-events-none" />
          </div>
        )}

        {/* Big Center Play / Pause Overlay Button */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer group-hover:bg-black/30 transition-all z-20"
          >
            <div className="flex flex-col items-center gap-3">
              <button
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent hover:bg-accent-hover text-[#111318] flex items-center justify-center shadow-2xl shadow-accent/40 transform group-hover:scale-105 transition-all"
                aria-label="Play Product Video"
              >
                <Play className="w-9 h-9 sm:w-11 sm:h-11 translate-x-1 fill-current" />
              </button>
              <div className="px-3 py-1 rounded-full bg-[#111318]/90 border border-white/10 font-mono text-xs text-white shadow-lg backdrop-blur-md">
                Click to Watch Showcase Tour ({formatTime(TOTAL_DURATION)})
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Telemetry HUD Pill (Top Left) */}
        <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111318]/90 border border-[#30343D] backdrop-blur-md font-mono text-[11px] text-zinc-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-bold text-white">{activeChapter.title}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-accent">{activeChapter.highlight}</span>
        </div>

        {/* Video Scrubber & Playback Controls Bar (Bottom) */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 z-20 space-y-2">
          {/* Progress Scrubber */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              const newSeconds = ratio * TOTAL_DURATION;
              setCurrentTime(newSeconds);
              if (hasVideoFile && videoRef.current) {
                videoRef.current.currentTime = newSeconds;
              }
            }}
            className="relative w-full h-2 bg-zinc-800/80 hover:h-2.5 rounded-full cursor-pointer transition-all overflow-hidden"
          >
            <div
              className="absolute top-0 bottom-0 left-0 bg-accent transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between font-mono text-xs text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1.5 rounded hover:bg-white/10 text-white transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={() => {
                  setCurrentTime(0);
                  setCurrentChapterIdx(0);
                  if (hasVideoFile && videoRef.current) {
                    videoRef.current.currentTime = 0;
                  }
                }}
                className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <span className="text-[11px] text-zinc-300">
                {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
              </span>

              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#1A1D24] border border-[#30343D] text-[10px] text-zinc-400">
                Chapter: {activeChapter.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {hasVideoFile && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}

              <button
                onClick={() => setIsFullscreen(true)}
                className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title="Fullscreen Preview"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Chapter Selector Under Player */}
      <div className="p-4 sm:p-5 bg-[#1A1D24] border-t border-[#30343D]">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-dark-muted font-bold flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-accent" />
            <span>Interactive Feature Chapters</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            Click any feature to inspect in action
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CHAPTERS.map((chapter, idx) => {
            const isActive = currentChapterIdx === idx;
            return (
              <button
                key={chapter.id}
                onClick={() => handleChapterClick(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? "bg-[#111318] border-accent shadow-md shadow-accent/10"
                    : "bg-[#111318]/60 border-[#30343D] hover:border-zinc-600 hover:bg-[#111318]"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {chapter.time}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isActive
                        ? "bg-accent text-[#111318]"
                        : "bg-zinc-800/80 text-zinc-400"
                    }`}
                  >
                    {chapter.badge}
                  </span>
                </div>
                <h4 className="font-mono font-bold text-xs text-white truncate">
                  {chapter.title}
                </h4>
                <p className="text-[11px] text-dark-muted line-clamp-2 mt-1 leading-snug font-sans">
                  {chapter.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] overflow-hidden rounded-2xl border border-[#30343D] bg-[#111318] p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#30343D] px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <span className="font-mono text-sm font-bold text-white">
                  {activeChapter.title} — High-Res View
                </span>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="px-3 py-1 font-mono text-xs rounded bg-[#1A1D24] border border-[#30343D] text-white hover:border-accent"
              >
                [ESC / Close]
              </button>
            </div>

            <div className="mt-3 rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeChapter.screenshot}
                alt={activeChapter.title}
                className="w-full h-auto object-contain max-h-[75vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}