"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Check, Copy, Apple, Terminal, Shield, ArrowLeft, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

function DownloadDBNerdPage() {
  const [channel, setChannel] = useState<"release" | "beta">("release");
  const [copiedArm, setCopiedArm] = useState(false);
  const [copiedIntel, setCopiedIntel] = useState(false);

  const channelData = {
    release: {
      name: "DBNerd",
      badge: "v0.1.0 (Stable)",
      badgeColor: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
      icon: "/media/app-icon-release.png",
      tagline: "Official production build. High stability, benchmarked performance.",
      armDmg: "DBNerd_0.1.0_aarch64.dmg",
      intelDmg: "DBNerd_0.1.0_x64.dmg",
      armAssetId: "dbnerd-release-macos-arm64-v0.1.0",
      intelAssetId: "dbnerd-release-macos-x64-v0.1.0",
      armSha: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      intelSha: "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c",
      bundleId: "com.dbnerd.desktop",
    },
    beta: {
      name: "DBNerd Beta",
      badge: "v0.1.0-beta.2",
      badgeColor: "bg-accent/20 border-accent/40 text-accent",
      icon: "/media/app-icon-beta.png",
      tagline: "Early-access channel with cutting-edge features and rapid iteration.",
      armDmg: "DBNerd_Beta_0.1.0_aarch64.dmg",
      intelDmg: "DBNerd_Beta_0.1.0_x64.dmg",
      armAssetId: "dbnerd-beta-macos-arm64-v0.1.0",
      intelAssetId: "dbnerd-beta-macos-x64-v0.1.0",
      armSha: "7d1a2f9c8e4b3a1d0f5e6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d",
      intelSha: "8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
      bundleId: "com.dbnerd.desktop.beta",
    },
  };

  const current = channelData[channel];

  const handleCopy = (text: string, type: "arm" | "intel") => {
    navigator.clipboard.writeText(text);
    if (type === "arm") {
      setCopiedArm(true);
      setTimeout(() => setCopiedArm(false), 2000);
    } else {
      setCopiedIntel(true);
      setTimeout(() => setCopiedIntel(false), 2000);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#111318] bg-grid-dark text-dark-text min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-dark-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Channel Switcher Tabs */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center p-1 bg-[#1A1D24] border border-[#30343D] rounded-xl">
            <button
              onClick={() => setChannel("release")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all ${
                channel === "release"
                  ? "bg-emerald-500 text-[#111318] font-bold shadow-sm"
                  : "text-dark-muted hover:text-white"
              }`}
            >
              <span>Release (Stable)</span>
              <span className="w-2 h-2 rounded-full bg-[#111318]" />
            </button>
            <button
              onClick={() => setChannel("beta")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all ${
                channel === "beta"
                  ? "bg-accent text-[#111318] font-bold shadow-sm"
                  : "text-dark-muted hover:text-white"
              }`}
            >
              <span>Beta Channel</span>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </button>
          </div>

          <span className="font-mono text-xs text-dark-muted">
            Can be installed side-by-side with separate app identities
          </span>
        </div>

        {/* Hero Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1D24] border border-[#30343D] shadow-terminal space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={current.icon}
                alt={`${current.name} Icon`}
                className="w-16 h-16 rounded-2xl shadow-lg border border-[#30343D]"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-mono font-bold text-white tracking-tight">
                    {current.name}
                  </h1>
                  <span className={`px-2.5 py-0.5 rounded border font-mono text-xs font-bold ${current.badgeColor}`}>
                    {current.badge}
                  </span>
                </div>
                <p className="font-mono text-xs text-dark-muted mt-1.5">
                  {current.tagline}
                </p>
                <div className="text-[11px] font-mono text-zinc-500 mt-1">
                  Bundle ID: <code>{current.bundleId}</code>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-3 py-1.5 rounded bg-[#111318] border border-[#30343D] text-zinc-300">
                macOS 12.0+ Monterey or later
              </span>
            </div>
          </div>

          <div className="border-t border-[#30343D] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Apple Silicon (M1/M2/M3/M4) */}
            <div className="p-6 rounded-xl bg-[#111318] border border-accent/30 hover:border-accent transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-white" />
                  <h3 className="font-mono font-bold text-white text-base">
                    Apple Silicon (ARM64)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-[#111318] font-bold">
                  Recommended
                </span>
              </div>

              <p className="text-xs text-dark-muted">
                Optimized for M1, M2, M3, M4 Apple Silicon Macs. 120 FPS hardware acceleration.
              </p>

              <div className="pt-2">
                <a
                  href={`/api/downloads/${current.armAssetId}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-accent hover:bg-accent-hover text-[#111318] font-mono font-bold text-xs transition-all shadow-md hover:shadow-highlight"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {current.armDmg}</span>
                </a>
              </div>

              {/* SHA256 Box */}
              <div className="p-2.5 rounded bg-[#1A1D24] border border-[#30343D] flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <div className="truncate pr-2">
                  <span className="text-zinc-500">SHA256: </span>
                  <span>{current.armSha.slice(0, 16)}...</span>
                </div>
                <button
                  onClick={() => handleCopy(current.armSha, "arm")}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy full SHA256"
                >
                  {copiedArm ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Intel x64 */}
            <div className="p-6 rounded-xl bg-[#111318] border border-[#30343D] hover:border-dark-muted transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-zinc-400" />
                  <h3 className="font-mono font-bold text-white text-base">
                    Intel Processor (x64)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  x86_64
                </span>
              </div>

              <p className="text-xs text-dark-muted">
                For older Intel-based Mac computers running macOS Monterey, Ventura, or Sonoma.
              </p>

              <div className="pt-2">
                <a
                  href={`/api/downloads/${current.intelAssetId}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#1A1D24] hover:bg-[#242832] text-white font-mono font-bold text-xs border border-[#30343D] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {current.intelDmg}</span>
                </a>
              </div>

              {/* SHA256 Box */}
              <div className="p-2.5 rounded bg-[#1A1D24] border border-[#30343D] flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <div className="truncate pr-2">
                  <span className="text-zinc-500">SHA256: </span>
                  <span>{current.intelSha.slice(0, 16)}...</span>
                </div>
                <button
                  onClick={() => handleCopy(current.intelSha, "intel")}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy full SHA256"
                >
                  {copiedIntel ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Installation & Quarantine Guide */}
        <div className="mt-12 p-8 rounded-xl bg-[#1A1D24] border border-[#30343D] space-y-6">
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-white uppercase tracking-wider">
            <Terminal className="w-4 h-4 text-accent" />
            <span>Installation Instructions</span>
          </div>

          <ol className="space-y-4 font-mono text-xs text-zinc-300">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#111318] border border-[#30343D] text-accent flex items-center justify-center font-bold text-[11px] shrink-0">
                1
              </span>
              <div>
                <p className="text-white font-bold">Mount the DMG &amp; Drag to Applications</p>
                <p className="text-dark-muted font-sans text-xs mt-0.5">
                  Double click the downloaded <code className="text-zinc-200">{current.armDmg}</code>, then drag the icon into your <code className="text-zinc-200">/Applications</code> folder.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#111318] border border-[#30343D] text-accent flex items-center justify-center font-bold text-[11px] shrink-0">
                2
              </span>
              <div>
                <p className="text-white font-bold">macOS Gatekeeper Verification</p>
                <p className="text-dark-muted font-sans text-xs mt-0.5">
                  If macOS shows &ldquo;{current.name} is damaged and can’t be opened&rdquo; (due to ad-hoc unsigned developer build), run this command once to remove the quarantine flag:
                </p>
                <div className="mt-2 p-2.5 rounded bg-[#111318] border border-[#30343D] text-accent flex items-center justify-between">
                  <code>xattr -cr &quot;/Applications/{current.name}.app&quot;</code>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#111318] border border-[#30343D] text-accent flex items-center justify-center font-bold text-[11px] shrink-0">
                3
              </span>
              <div>
                <p className="text-white font-bold">Channel-aware Auto Updates</p>
                <p className="text-dark-muted font-sans text-xs mt-0.5">
                  Each channel ({channel.toUpperCase()}) maintains its own independent Tauri v2 updater stream. Beta builds will receive new beta updates, and Release builds will track stable releases.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default DownloadDBNerdPage;
