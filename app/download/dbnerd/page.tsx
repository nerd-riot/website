"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Check, Copy, Apple, Terminal, Shield, ArrowLeft, ExternalLink, HelpCircle } from "lucide-react";

function DownloadDBNerdPage() {
  const [copiedArm, setCopiedArm] = useState(false);
  const [copiedIntel, setCopiedIntel] = useState(false);

  const armSha = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  const intelSha = "b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c";

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

        {/* Hero Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#1A1D24] border border-[#30343D] shadow-terminal space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/media/app-icon.png"
                alt="DBNerd Logo"
                className="w-16 h-16 rounded-2xl shadow-lg border border-[#30343D]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-mono font-bold text-white tracking-tight">
                    DBNerd
                  </h1>
                  <span className="px-2 py-0.5 rounded bg-accent/20 border border-accent/40 text-accent font-mono text-xs font-bold">
                    v0.1.0-beta
                  </span>
                </div>
                <p className="font-mono text-sm text-dark-muted mt-1">
                  The ultra-fast, native-feel database studio for macOS
                </p>
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
                For M1, M2, M3, M4 MacBooks, Mac mini, Mac Studio &amp; iMacs. Native ARM64 binary.
              </p>

              <div className="pt-2">
                <a
                  href="/api/downloads/dbnerd-macos-arm64-v0.1.0"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-accent hover:bg-accent-hover text-[#111318] font-mono font-bold text-xs transition-all shadow-md hover:shadow-highlight"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .DMG (Apple Silicon)</span>
                </a>
              </div>

              {/* SHA256 Box */}
              <div className="p-2.5 rounded bg-[#1A1D24] border border-[#30343D] flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <div className="truncate pr-2">
                  <span className="text-zinc-500">SHA256: </span>
                  <span>{armSha.slice(0, 16)}...</span>
                </div>
                <button
                  onClick={() => handleCopy(armSha, "arm")}
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
                  href="/api/downloads/dbnerd-macos-x64-v0.1.0"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#1A1D24] hover:bg-[#242832] text-white font-mono font-bold text-xs border border-[#30343D] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .DMG (Intel)</span>
                </a>
              </div>

              {/* SHA256 Box */}
              <div className="p-2.5 rounded bg-[#1A1D24] border border-[#30343D] flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <div className="truncate pr-2">
                  <span className="text-zinc-500">SHA256: </span>
                  <span>{intelSha.slice(0, 16)}...</span>
                </div>
                <button
                  onClick={() => handleCopy(intelSha, "intel")}
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
                <p className="text-white font-bold">Mount the DMG &amp; Copy to Applications</p>
                <p className="text-dark-muted font-sans text-xs mt-0.5">
                  Double click the downloaded <code className="text-zinc-200">DBNerd_0.1.0_aarch64.dmg</code> file, then drag the DBNerd icon into your <code className="text-zinc-200">/Applications</code> folder.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#111318] border border-[#30343D] text-accent flex items-center justify-center font-bold text-[11px] shrink-0">
                2
              </span>
              <div>
                <p className="text-white font-bold">macOS Gatekeeper Verification Note</p>
                <p className="text-dark-muted font-sans text-xs mt-0.5">
                  If macOS shows &ldquo;DBNerd is damaged and can’t be opened&rdquo; (due to ad-hoc unsigned open source build), run this terminal command once to clear the quarantine flag:
                </p>
                <div className="mt-2 p-2.5 rounded bg-[#111318] border border-[#30343D] text-accent flex items-center justify-between">
                  <code>xattr -cr /Applications/DBNerd.app</code>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#111318] border border-[#30343D] text-accent flex items-center justify-center font-bold text-[11px] shrink-0">
                3
              </span>
              <div>
                <p className="text-white font-bold">Automatic Updates via Tauri v2</p>
                <p className="text-dark-muted font-sans text-xs mt-0.5">
                  DBNerd includes the official <code className="text-zinc-200">tauri-plugin-updater</code>. New versions are checked automatically in the background and can be installed with 1-click.
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
