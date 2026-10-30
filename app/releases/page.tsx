import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Download, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Releases & Changelogs — NERD RIOT",
  description: "Official releases, release notes, and version history for NERD RIOT software across Stable and Beta channels.",
};

interface ReleaseAsset {
  name: string;
  platform: string;
  size: string;
  id: string;
  directUrl?: string;
}

interface ReleaseItem {
  project: string;
  version: string;
  date: string;
  channel: string;
  channelBadge: string;
  description: string;
  homebrew?: string;
  notes: string[];
  assets: ReleaseAsset[];
}

const releasesData: ReleaseItem[] = [
  {
    project: "DBNerd",
    version: "v1.2.3",
    date: "2026-10-31",
    channel: "release",
    channelBadge: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
    description: "Production update with automatic Snowflake secondary role inheritance, full schema-qualified queries across grid pagination, DDL inspection, and exact count calculation.",
    homebrew: "brew install --cask nerd-riot/tap/dbnerd",
    notes: [
      "Snowflake Secondary Roles: Automatically activates all granted roles (USE SECONDARY ROLES ALL;) on session initialization, resolving 002003 authorization errors.",
      "Dialect Schema Qualification: Automatically qualifies table queries with database and schema (\"DATABASE\".\"SCHEMA\".\"TABLE\") across grid pagination, record counts, and structure inspection.",
      "Snowflake Schema & DDL Engine: Native metadata retrieval via INFORMATION_SCHEMA.COLUMNS and GET_DDL with primary key constraint detection.",
      "Sidebar & Context Menu Actions: Fully schema-aware table context menus, query generation, and CREATE TABLE DDL copying.",
      "Updated Homebrew Tap Cask formula with direct release binary checksums.",
    ],
    assets: [
      {
        name: "DBNerd_1.2.3_aarch64.dmg",
        platform: "macOS Apple Silicon (ARM64)",
        size: "11.9 MB",
        id: "dbnerd-release-macos-arm64-v1.2.3",
        directUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.3/DBNerd_1.2.3_aarch64.dmg",
      },
      {
        name: "DBNerd_1.2.3_macOS_aarch64.zip",
        platform: "macOS ZIP Archive",
        size: "11.5 MB",
        id: "dbnerd-release-macos-zip-v1.2.3",
        directUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.3/DBNerd_1.2.3_macOS_aarch64.zip",
      },
      {
        name: "DBNerd_1.2.3_Windows_x64_Setup.exe",
        platform: "Windows x64 Setup",
        size: "9.8 MB",
        id: "dbnerd-release-windows-setup-v1.2.3",
        directUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.3/DBNerd_1.2.3_Windows_x64_Setup.exe",
      },
      {
        name: "DBNerd_1.2.3_Windows_x64_standalone.exe",
        platform: "Windows Portable Standalone",
        size: "16.1 MB",
        id: "dbnerd-release-windows-standalone-v1.2.3",
        directUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.3/DBNerd_1.2.3_Windows_x64_standalone.exe",
      },
    ],
  },
  {
    project: "DBNerd",
    version: "v1.2.2",
    date: "2026-10-31",
    channel: "release",
    channelBadge: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
    description: "Official production release with Airtame-style DMG layout, Homebrew Tap Cask formula with automated Gatekeeper bypass, and multiplatform Windows installers.",
    homebrew: "brew install --cask nerd-riot/tap/dbnerd",
    notes: [
      "Official Homebrew Tap Cask formula (brew install --cask nerd-riot/tap/dbnerd) with automated Gatekeeper quarantine stripping (xattr -cr).",
      "macOS DMG overhauled with Airtame-style clean white Retina background, custom 120px icons, and drag-to-Applications shortcut.",
      "Native Apple Silicon (ARM64) standalone DMG, ZIP archive, and ad-hoc sealed codesign integrity.",
      "Windows 64-bit NSIS Setup wizard and zero-install standalone portable executables.",
      "Native Snowflake Enterprise DW connector with Browser SSO and RSA Key-Pair authentication.",
      "5-round performance, memory leak, and panic containment hardening cycle completed.",
    ],
    assets: [
      {
        name: "DBNerd_1.2.2_aarch64.dmg",
        platform: "macOS Apple Silicon (ARM64)",
        size: "11.9 MB",
        id: "dbnerd-release-macos-arm64-v1.2.2",
        directUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.2/DBNerd_1.2.2_aarch64.dmg",
      },
      {
        name: "DBNerd_1.2.2_macOS_aarch64.zip",
        platform: "macOS ZIP Archive",
        size: "11.5 MB",
        id: "dbnerd-release-macos-zip-v1.2.2",
        directUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.2/DBNerd_1.2.2_macOS_aarch64.zip",
      },
      {
        name: "DBNerd_1.2.2_Windows_x64_Setup.exe",
        platform: "Windows x64 Setup",
        size: "9.7 MB",
        id: "dbnerd-release-windows-setup-v1.2.2",
        directUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.2/DBNerd_1.2.2_Windows_x64_Setup.exe",
      },
      {
        name: "DBNerd_1.2.2_Windows_x64_standalone.exe",
        platform: "Windows Portable Standalone",
        size: "15.9 MB",
        id: "dbnerd-release-windows-standalone-v1.2.2",
        directUrl: "https://github.com/nerd-riot/db-nerd/releases/download/v1.2.2/DBNerd_1.2.2_Windows_x64_standalone.exe",
      },
    ],
  },
  {
    project: "DBNerd",
    version: "v0.1.0-beta.2",
    date: "2026-10-30",
    channel: "beta",
    channelBadge: "bg-accent/20 border-accent/40 text-accent",
    description: "Cutting-edge channel with preview features, Snowflake connector improvements, and experimental data grid tuning.",
    notes: [
      "Added Snowflake cloud data warehouse schema tree preview.",
      "Optimized 120 FPS canvas scrolling under 200,000+ cached rows.",
      "Fine-tuned Safe Mode confirmation dialogs for DROP and TRUNCATE queries.",
      "Independent bundle identity: com.dbnerd.desktop.beta (safe to install alongside Stable).",
    ],
    assets: [
      { name: "DBNerd_Beta_0.1.0_aarch64.dmg", platform: "macOS ARM64", size: "11.7 MB", id: "dbnerd-beta-macos-arm64-v0.1.0" },
      { name: "DBNerd_Beta_0.1.0_Windows_x64_Setup.exe", platform: "Windows x64", size: "9.8 MB", id: "dbnerd-beta-windows-setup-v0.1.0" },
    ],
  },
  {
    project: "DBNerd",
    version: "v0.1.0",
    date: "2026-10-30",
    channel: "release",
    channelBadge: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
    description: "Official stable production release. Validated performance benchmarks and rock-solid database connectivity.",
    notes: [
      "Initial production release with Tauri v2 + Rust Core.",
      "PostgreSQL and MySQL native connection pooling with SSL profiles.",
      "High-density 120 FPS data grid with instant search and inline cell editing.",
      "Safe Mode for Production: destructive operations require explicit manual typing confirmation.",
      "Integrated observability HUD for real-time connection telemetry.",
      "Native Apple Silicon (ARM64) and Windows 64-bit installers.",
    ],
    assets: [
      { name: "DBNerd_0.1.0_aarch64.dmg", platform: "macOS ARM64", size: "11.6 MB", id: "dbnerd-release-macos-arm64-v0.1.0" },
      { name: "DBNerd_0.1.0_Windows_x64_Setup.exe", platform: "Windows x64", size: "9.8 MB", id: "dbnerd-release-windows-setup-v0.1.0" },
    ],
  },
];

export default function ReleasesPage() {
  return (
    <div className="pt-28 pb-20 bg-[#111318] bg-grid-dark text-dark-text min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-dark-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Release Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
            Software Releases &amp; Changelogs
          </h1>
          <p className="text-sm text-dark-muted font-sans leading-relaxed">
            All releases are verified with SHA-256 signatures and hosted directly on Cloudflare R2 with immutable storage keys across Stable and Beta channels.
          </p>
        </div>

        <div className="space-y-8">
          {releasesData.map((rel) => (
            <div
              key={`${rel.project}-${rel.version}-${rel.channel}`}
              className="p-6 sm:p-8 rounded-xl bg-[#1A1D24] border border-[#30343D] shadow-terminal space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#30343D]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg font-mono font-bold text-white">
                      {rel.project}
                    </span>
                    <span className="font-mono text-sm text-accent font-semibold">
                      {rel.version}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${rel.channelBadge}`}>
                      {rel.channel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-dark-muted mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Released on {rel.date}</span>
                  </div>
                </div>

                <Link
                  href="/download/dbnerd"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent hover:bg-accent-hover text-[#111318] font-mono text-xs font-bold transition-all self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download page</span>
                </Link>
              </div>

              {/* Release Notes */}
              <div className="space-y-2">
                <p className="text-xs text-dark-muted font-mono">
                  {rel.description}
                </p>
                <h3 className="font-mono text-xs uppercase tracking-wider text-dark-muted font-bold pt-2">
                  What&apos;s New
                </h3>
                <ul className="space-y-2">
                  {rel.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-sans text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Homebrew quick command if available */}
              {rel.homebrew && (
                <div className="p-3.5 rounded-lg bg-[#111318] border border-accent/40 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2 text-zinc-200">
                    <span className="text-accent font-bold">$</span>
                    <code>{rel.homebrew}</code>
                  </div>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded border border-accent/30">
                    Homebrew Cask
                  </span>
                </div>
              )}

              {/* Assets list */}
              <div className="pt-4 border-t border-[#30343D] space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-dark-muted font-bold">
                  Release Binaries ({rel.channel.toUpperCase()})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {rel.assets.map((asset) => (
                    <a
                      key={asset.id}
                      href={asset.directUrl || `/api/downloads/${asset.id}`}
                      className="p-3 rounded-lg bg-[#111318] border border-[#30343D] hover:border-accent transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-mono text-white group-hover:text-accent transition-colors font-medium">
                          {asset.name}
                        </div>
                        <div className="text-[11px] font-mono text-dark-muted">
                          {asset.platform} &bull; {asset.size}
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-dark-muted group-hover:text-accent transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
