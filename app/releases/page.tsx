import React from "react";
import Link from "next/link";
import { ArrowLeft, Tag, Calendar, Download, CheckCircle2 } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";

export const metadata = {
  title: "Releases & Changelogs — NERD RIOT",
  description: "Official releases, release notes, and version history for NERD RIOT software.",
};

const releasesData = [
  {
    project: "DBNerd",
    version: "v0.1.0-beta",
    date: "2026-10-29",
    channel: "beta",
    notes: [
      "Initial public preview with Tauri v2 + Rust Core.",
      "PostgreSQL and MySQL native connection pooling with SSL.",
      "Snowflake cloud data warehouse connector with warehouse switcher.",
      "High-density 120 FPS data grid with instant search and inline cell editing.",
      "Safe Mode for Production: destructive DROP/TRUNCATE queries require explicit manual typing confirmation.",
      "Integrated observability HUD for real-time connection stats and query logs.",
      "macOS Apple Silicon (aarch64) and Intel (x64) builds.",
    ],
    assets: [
      { name: "DBNerd_0.1.0_aarch64.dmg", platform: "macOS ARM64", size: "14.2 MB", id: "dbnerd-macos-arm64-v0.1.0" },
      { name: "DBNerd_0.1.0_x64.dmg", platform: "macOS x64", size: "15.8 MB", id: "dbnerd-macos-x64-v0.1.0" },
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
            All releases are verified with SHA-256 signatures and hosted directly on Cloudflare R2 with immutable storage keys.
          </p>
        </div>

        <div className="space-y-8">
          {releasesData.map((rel) => (
            <div
              key={`${rel.project}-${rel.version}`}
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
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/20 border border-accent/40 text-accent uppercase font-bold">
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
                <h3 className="font-mono text-xs uppercase tracking-wider text-dark-muted font-bold">
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

              {/* Assets list */}
              <div className="pt-4 border-t border-[#30343D] space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-wider text-dark-muted font-bold">
                  Release Binaries
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {rel.assets.map((asset) => (
                    <a
                      key={asset.id}
                      href={`/api/downloads/${asset.id}`}
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
