"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Check, Copy, Apple, Terminal, Shield, ArrowLeft, ExternalLink, Sparkles, CheckCircle2, Monitor, ShieldCheck, Zap } from "lucide-react";

function DownloadDBNerdPage() {
  const [channel, setChannel] = useState<"release" | "beta">("release");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const channelData = {
    release: {
      name: "DBNerd",
      badge: "v1.2.3 (Latest Stable)",
      badgeColor: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
      icon: "/media/app-icon-release.png",
      tagline: "Official production build. High stability, 120 FPS data grid, Snowflake Enterprise SSO, zero Gatekeeper quarantine.",
      bundleId: "com.dbnerd.desktop",
      homebrewCmd: "brew install --cask nerd-riot/tap/dbnerd",
      armDmg: "DBNerd_1.2.3_aarch64.dmg",
      armUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.3/DBNerd_1.2.3_aarch64.dmg",
      armSha: "635c0be164fe7c86e43dff1a85e5efff530e008f3ecca4245ec2ef8cd6206974",
      armSize: "11.9 MB",
      armZip: "DBNerd_1.2.3_macOS_aarch64.zip",
      armZipUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.3/DBNerd_1.2.3_macOS_aarch64.zip",
      armZipSha: "bd48c4365795a61ba1bf856d0243f5473270fd0824bdb2488dbd9cb43b79cf50",
      armZipSize: "11.5 MB",
      winSetup: "DBNerd_1.2.3_Windows_x64_Setup.exe",
      winSetupUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.3/DBNerd_1.2.3_Windows_x64_Setup.exe",
      winSetupSha: "146fc07ad157ba2714ea63cdb7a145261db92dffacb816a832ef32ba0dd57150",
      winSetupSize: "9.8 MB",
      winStandalone: "DBNerd_1.2.3_Windows_x64_standalone.exe",
      winStandaloneUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.3/DBNerd_1.2.3_Windows_x64_standalone.exe",
      winStandaloneSha: "6714171fec87467b377908cad07240bd0bdd1dc9dd30626af42ee2b1cb9edd9b",
      winStandaloneSize: "16.0 MB",
      githubReleaseUrl: "https://github.com/nerd-riot/db-nerd/releases/tag/v1.2.3",
    },
    beta: {
      name: "DBNerd Beta",
      badge: "v1.2.2-beta",
      badgeColor: "bg-accent/20 border-accent/40 text-accent",
      icon: "/media/app-icon-beta.png",
      tagline: "Early-access preview channel with experimental features and rapid iteration.",
      bundleId: "com.dbnerd.desktop.beta",
      homebrewCmd: "brew install --cask nerd-riot/tap/dbnerd",
      armDmg: "DBNerd_Beta_0.1.0_aarch64.dmg",
      armUrl: "/api/downloads/dbnerd-beta-macos-arm64-v0.1.0",
      armSha: "8b0c34f79861bc018658c548535656017623b9759e72c6fdbf0b16a7421afce6",
      armSize: "11.7 MB",
      armZip: "DBNerd_Beta_0.1.0_macOS_aarch64.zip",
      armZipUrl: "/api/downloads/dbnerd-beta-macos-zip-v0.1.0",
      armZipSha: "48369758e89e063359e069cdede9bd2c5393e17c276ead57352096e6ac7fe0fe",
      armZipSize: "11.6 MB",
      winSetup: "DBNerd_Beta_0.1.0_Windows_x64_Setup.exe",
      winSetupUrl: "/api/downloads/dbnerd-beta-windows-setup-v0.1.0",
      winSetupSha: "dcce6c2ad22eeff5cadd93fa7ecc62d4f9f92a112e827fac8103e066198d5a06",
      winSetupSize: "9.8 MB",
      winStandalone: "DBNerd_Beta_0.1.0_Windows_x64_standalone.exe",
      winStandaloneUrl: "/api/downloads/dbnerd-beta-windows-standalone-v0.1.0",
      winStandaloneSha: "2b54ef45adfca1ce3942b2d1aaccc7088805f9f88d272c570fb8f3dd74f20666",
      winStandaloneSize: "16.1 MB",
      githubReleaseUrl: "https://github.com/nerd-riot/db-nerd/releases",
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
        <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1D24] border border-[#30343D] shadow-terminal space-y-8">
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
                href={current.githubReleaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded bg-[#111318] hover:bg-[#242832] border border-[#30343D] hover:border-accent text-zinc-300 hover:text-white transition-all"
              >
                <span>GitHub Releases</span>
                <ExternalLink className="w-3 h-3 text-accent" />
              </a>
            </div>
          </div>

          {/* Featured: Homebrew Cask 1-Click Terminal Command */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#141820] to-[#171b24] border border-accent/40 shadow-inner space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Homebrew Cask (Recommended for macOS)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      Zero Gatekeeper Warnings
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
                    Installs natively into <code>/Applications</code> and automatically removes macOS quarantine attributes.
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-zinc-500">
                Apple Silicon (M1/M2/M3/M4)
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0e1015] border border-[#30343D] flex items-center justify-between font-mono text-xs text-white group hover:border-accent transition-colors">
              <div className="flex items-center gap-2.5 truncate pr-3">
                <span className="text-accent font-bold select-none">$</span>
                <code className="text-zinc-100 select-all">{current.homebrewCmd}</code>
              </div>
              <button
                onClick={() => handleCopy("homebrew", current.homebrewCmd)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1A1D24] hover:bg-[#242832] text-xs font-mono font-bold text-zinc-300 hover:text-white border border-[#30343D] hover:border-accent transition-all shrink-0"
              >
                {copiedKey === "homebrew" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent" />
                    <span className="text-accent">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Direct Downloads Grid */}
          <div className="border-t border-[#30343D] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* macOS Apple Silicon (ARM64) */}
            <div className="p-6 rounded-xl bg-[#111318] border border-[#30343D] hover:border-accent transition-all space-y-4">
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
                Airtame-style installer with Retina background and Applications drag-to-install shortcut.
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href={current.armUrl}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-accent hover:bg-accent-hover text-[#111318] font-mono font-bold text-xs transition-all shadow-md hover:shadow-highlight"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {current.armDmg}</span>
                </a>

                <a
                  href={current.armZipUrl}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#1A1D24] hover:bg-[#242832] text-zinc-300 hover:text-white font-mono text-xs border border-[#30343D] hover:border-zinc-500 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Download {current.armZip} ({current.armZipSize})</span>
                </a>
              </div>

              {/* SHA256 Box */}
              <div className="p-2.5 rounded bg-[#1A1D24] border border-[#30343D] flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <div className="truncate pr-2">
                  <span className="text-zinc-500">DMG SHA256: </span>
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

            {/* Windows x64 Installers */}
            <div className="p-6 rounded-xl bg-[#111318] border border-[#30343D] hover:border-dark-muted transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-zinc-300" />
                  <h3 className="font-mono font-bold text-white text-base">
                    Windows (x64)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {current.winSetupSize}
                </span>
              </div>

              <p className="text-xs text-dark-muted">
                Choose between guided NSIS Setup wizard or standalone portable executable.
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href={current.winSetupUrl}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#1A1D24] hover:bg-[#242832] text-white font-mono font-bold text-xs border border-[#30343D] hover:border-accent transition-all"
                >
                  <Download className="w-4 h-4 text-accent" />
                  <span>Download {current.winSetup}</span>
                </a>

                <a
                  href={current.winStandaloneUrl}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#1A1D24] hover:bg-[#242832] text-zinc-300 hover:text-white font-mono text-xs border border-[#30343D] hover:border-zinc-500 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Download Portable .exe ({current.winStandaloneSize})</span>
                </a>
              </div>

              {/* SHA256 Box */}
              <div className="p-2.5 rounded bg-[#1A1D24] border border-[#30343D] flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <div className="truncate pr-2">
                  <span className="text-zinc-500">Setup SHA256: </span>
                  <span>{current.winSetupSha.slice(0, 16)}...</span>
                </div>
                <button
                  onClick={() => handleCopy("win", current.winSetupSha)}
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

          <ol className="space-y-6 font-mono text-xs text-zinc-300">
            {/* Method 1: Homebrew */}
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 text-accent flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <div className="space-y-1.5 flex-1">
                <p className="text-white font-bold flex items-center gap-2">
                  <span>Method A: Homebrew Cask (Recommended for macOS)</span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-accent/15 text-accent border border-accent/30">
                    No Security Prompts
                  </span>
                </p>
                <p className="text-dark-muted font-sans text-xs">
                  Run this command in Terminal to install DBNerd. It automatically strips macOS quarantine attributes so the app launches instantly:
                </p>
                <div className="p-2.5 rounded bg-[#111318] border border-[#30343D] text-accent flex items-center justify-between">
                  <code>{current.homebrewCmd}</code>
                  <button
                    onClick={() => handleCopy("brew-inst", current.homebrewCmd)}
                    className="p-1 hover:text-white transition-colors"
                  >
                    {copiedKey === "brew-inst" ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </li>

            {/* Method 2: Manual DMG */}
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#111318] border border-[#30343D] text-zinc-300 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <div className="space-y-1.5 flex-1">
                <p className="text-white font-bold">Method B: Manual DMG Drag-and-Drop</p>
                <p className="text-dark-muted font-sans text-xs">
                  Open <code className="text-zinc-200">{current.armDmg}</code> and drag the application icon into your <code className="text-zinc-200">/Applications</code> folder.
                </p>
                <p className="text-dark-muted font-sans text-xs">
                  If Gatekeeper displays <em>&quot;DBNerd is damaged and can&apos;t be opened&quot;</em> (due to absence of paid Apple Notarization), run once in Terminal:
                </p>
                <div className="p-2 rounded bg-[#111318] border border-[#30343D] text-accent flex items-center justify-between">
                  <code>xattr -cr &quot;/Applications/{current.name}.app&quot;</code>
                  <button
                    onClick={() => handleCopy("xattr", `xattr -cr "/Applications/${current.name}.app"`)}
                    className="p-1 hover:text-white transition-colors"
                  >
                    {copiedKey === "xattr" ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </li>

            {/* Method 3: Windows */}
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#111318] border border-[#30343D] text-zinc-300 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <div className="space-y-1.5 flex-1">
                <p className="text-white font-bold">Windows Installation</p>
                <p className="text-dark-muted font-sans text-xs">
                  Run <code className="text-zinc-200">{current.winSetup}</code>. The NSIS installer will guide you through the setup and create Desktop &amp; Start Menu shortcuts. Alternatively, run the portable standalone executable directly without installation.
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
