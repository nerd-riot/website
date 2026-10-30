"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Check, Copy, Apple, Terminal, Shield, ArrowLeft, ExternalLink, Sparkles, CheckCircle2, Monitor } from "lucide-react";

function DownloadDBNerdPage() {
  const [channel, setChannel] = useState<"release" | "beta">("beta");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const channelData = {
    release: {
      name: "DBNerd",
      badge: "v0.1.0 (Stable)",
      badgeColor: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
      icon: "/media/app-icon-release.png",
      tagline: "Official production build. High stability, benchmarked performance.",
      bundleId: "com.dbnerd.desktop",
      armDmg: "DBNerd_0.1.0_aarch64.dmg",
      armAssetId: "dbnerd-release-macos-arm64-v0.1.0",
      armSha: "a923a30cf9451e7fdeb60ec05cd111ffd39a4088453f1b9385c0692589ced750",
      armSize: "11.6 MB",
      gdriveFolder: "https://drive.google.com/drive/folders/178UfDA2B63ZosCGT-bLjMVzH29MgjUC4?usp=drive_link",
      winSetup: "DBNerd_0.1.0_Windows_x64_Setup.exe",
      winAssetId: "dbnerd-release-windows-setup-v0.1.0",
      winSha: "dcce6c2ad22eeff5cadd93fa7ecc62d4f9f92a112e827fac8103e066198d5a06",
      winSize: "9.8 MB",
    },
    beta: {
      name: "DBNerd Beta",
      badge: "v0.1.0-beta",
      badgeColor: "bg-accent/20 border-accent/40 text-accent",
      icon: "/media/app-icon-beta.png",
      tagline: "Early-access build with cutting-edge features and rapid iteration.",
      bundleId: "com.dbnerd.desktop.beta",
      armDmg: "DBNerd_Beta_0.1.0_aarch64.dmg",
      armAssetId: "dbnerd-beta-macos-arm64-v0.1.0",
      armSha: "8b0c34f79861bc018658c548535656017623b9759e72c6fdbf0b16a7421afce6",
      armSize: "11.7 MB",
      gdriveFolder: "https://drive.google.com/drive/folders/1UyCPmcmzTasiJujR3QbRgV573UmApLeX?usp=drive_link",
      winSetup: "DBNerd_Beta_0.1.0_Windows_x64_Setup.exe",
      winAssetId: "dbnerd-beta-windows-setup-v0.1.0",
      winSha: "dcce6c2ad22eeff5cadd93fa7ecc62d4f9f92a112e827fac8103e066198d5a06",
      winSize: "9.8 MB",
    },
  };

  const current = channelData[channel];

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
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

            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs font-mono px-3 py-1.5 rounded bg-[#111318] border border-[#30343D] text-zinc-300">
                macOS 12+ &bull; Windows 10/11
              </span>
              <a
                href={current.gdriveFolder}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded bg-[#111318] hover:bg-[#242832] border border-[#30343D] hover:border-accent text-zinc-300 hover:text-white transition-all"
              >
                <span>Browse Drive Folder</span>
                <ExternalLink className="w-3 h-3 text-accent" />
              </a>
            </div>
          </div>

          <div className="border-t border-[#30343D] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* macOS Apple Silicon (ARM64) */}
            <div className="p-6 rounded-xl bg-[#111318] border border-accent/30 hover:border-accent transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-white" />
                  <h3 className="font-mono font-bold text-white text-base">
                    macOS (Apple Silicon)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-[#111318] font-bold">
                  {current.armSize}
                </span>
              </div>

              <p className="text-xs text-dark-muted">
                Native Apple Silicon binary (M1/M2/M3/M4). 120 FPS hardware acceleration.
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
                  onClick={() => handleCopy("arm", current.armSha)}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy full SHA256"
                >
                  {copiedKey === "arm" ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Windows x64 NSIS Installer */}
            <div className="p-6 rounded-xl bg-[#111318] border border-[#30343D] hover:border-dark-muted transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-zinc-300" />
                  <h3 className="font-mono font-bold text-white text-base">
                    Windows (x64)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {current.winSize}
                </span>
              </div>

              <p className="text-xs text-dark-muted">
                64-bit Windows NSIS setup installer for Windows 10 &amp; Windows 11.
              </p>

              <div className="pt-2">
                <a
                  href={`/api/downloads/${current.winAssetId}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#1A1D24] hover:bg-[#242832] text-white font-mono font-bold text-xs border border-[#30343D] hover:border-accent transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {current.winSetup}</span>
                </a>
              </div>

              {/* SHA256 Box */}
              <div className="p-2.5 rounded bg-[#1A1D24] border border-[#30343D] flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <div className="truncate pr-2">
                  <span className="text-zinc-500">SHA256: </span>
                  <span>{current.winSha.slice(0, 16)}...</span>
                </div>
                <button
                  onClick={() => handleCopy("win", current.winSha)}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy full SHA256"
                >
                  {copiedKey === "win" ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
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
                <p className="text-white font-bold">macOS Installation</p>
                <p className="text-dark-muted font-sans text-xs mt-0.5">
                  Double click <code className="text-zinc-200">{current.armDmg}</code> and drag the application icon into your <code className="text-zinc-200">/Applications</code> folder.
                </p>
                <p className="text-dark-muted font-sans text-xs mt-1">
                  If Gatekeeper prompts that the app cannot be opened:
                </p>
                <div className="mt-1.5 p-2 rounded bg-[#111318] border border-[#30343D] text-accent">
                  <code>xattr -cr &quot;/Applications/{current.name}.app&quot;</code>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#111318] border border-[#30343D] text-accent flex items-center justify-center font-bold text-[11px] shrink-0">
                2
              </span>
              <div>
                <p className="text-white font-bold">Windows Installation</p>
                <p className="text-dark-muted font-sans text-xs mt-0.5">
                  Run <code className="text-zinc-200">{current.winSetup}</code>. The NSIS installer will guide you through the setup and create Desktop &amp; Start Menu shortcuts.
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
